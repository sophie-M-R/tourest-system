<template>
  <div>
      <div></div>
      <el-table
        :data="lists"
        style="width: 100%">
        <el-table-column
          prop="loan_name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="loan_card"
          label="身份证号码">
        </el-table-column>
        <el-table-column
          label="操作" >
          <template slot-scope='{row}'>
            <!-- row整个表格的数据对象   @input是实时变化 -->
            <el-button type="primary" size="small" @click="detail(row)">查看</el-button>
            <el-button type="danger" size="small" @click="pass(row)"  :disabled="row.result=='pass'">通过</el-button>
            <el-button type="success" size="small" @click="reject(row)" :disabled="row.result=='reject'">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 查看弹层 -->
      <el-dialog title="贷款审批--终审--查看" :visible.sync="dialogDetailVisible">
        <el-form :model="form">
          <el-form-item label="id" :label-width="formLabelWidth" v-show="false">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" readonly></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="form.sex"  readonly placeholder="请选择性别">
              <el-option v-for="item in sexOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogDetailVisible = false">关 闭</el-button>
        </div>
      </el-dialog>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.pageNo"
        :page-sizes="[5,10, 20, 30, 40]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="rows">
      </el-pagination>
  </div>
  
</template>

<script>
import {approveEndList,approveEndDetail,approveEndPass,approveEndReject} from '@/api/article'
const sexOptions=[
  { key: 'man', display_name: '男' },
  { key: 'woman', display_name: '女' }
];
export default {
  data () {
    return {
      lists:[],
      rows:1, //总数量
      pages:1, //总页数
      query:{
        pageNo:1, //页码
        pageSize:10, //条数
        name:'' //查询
      },
      form: {
          id:'',
          name: '',
          sex:''
        },
      formLabelWidth: '120px',
      sexOptions,
      dialogDetailVisible:false , //详情弹层
    }
  },
  methods:{
    getList(){
      approveEndList(this.query).then(res=>{
        console.log(res);
        if(res.code=='20000'){
          this.lists=res.data.data.data;
          this.rows=res.data.data.rows;
          this.pages=res.data.data.pages;
        }
      })
    },
    detail(row){
      alert(row.loan_id) //112
      approveEndDetail({id:row.loan_id}).then(res=>{
        this.dialogDetailVisible=true;
        console.log(res);
        this.form={...res.data.data};
      })
    },
    pass(row){
      approveEndPass({appId:row.id,loanId:row.loan_id}).then(res=>{
        console.log(res)
        if(res.code=='20000'){
          this.getList();
            this.$notify({
              title: '终审通过成功',
              message: '终审通过成功',
              type: 'success',
              duration: 2000
            }) 
        }
      })
    },
    reject(row){
      approveEndReject({appId:row.id,loanId:row.loan_id}).then(res=>{
        console.log(res)
        if(res.code=='20000'){
          this.getList();
            this.$notify({
              title: '终审拒绝成功',
              message: '终审拒绝成功',
              type: 'success',
              duration: 2000
            }) 
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.query.pageSize=val || this.query.pageSize;
      this.getList();//重新调用查询接口
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}页`);
      this.query.pageNo=val || this.query.pageNo;
      this.getList();//重新调用查询接口
    }
  },
  mounted(){
    this.getList();
  },
  filters:{
    getDate(time){ //出生日期
      var d=new Date(time);
      var dates=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
      return dates;
    },
    getSex(type){ //性别
      switch(type){
        case 'man':return '男';
        case 'woman':return '女';
      }
    },
    getEducation(type){ //教育程度
      switch(type){
        case 'highschool':return '高中';
        case 'college':return '大学';
        default:
          return type;
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">


</style>
