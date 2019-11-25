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
            <el-button type="danger" size="small" @click="pass(row)" :disabled="row.result=='pass'">通过</el-button>
            <el-button type="success" size="small" @click="reject(row)" :disabled="row.result=='reject'">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 查看弹层 -->
       <el-dialog title="贷款审批-查看详情" :visible.sync="dialogDetailVisible">
        <el-form  :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
            <el-form-item label="ID" prop="id" >
                <el-input v-model="temp.id" readonly/>
              </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="temp.name" readonly/>
              </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
              <el-input :value="temp.birthday |getDate" readonly/>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-input :value="temp.sex |getSex" readonly />
            </el-form-item>
            <el-form-item label="教育程度" prop="education">
              <el-input :value="temp.education |getEducation" readonly />
            </el-form-item>
            <el-form-item label="居住地址" prop="address1">
                <el-input v-model="temp.address1" readonly/>
              </el-form-item>
            <el-form-item label="手机号" prop="mobile_phone">
              <el-input v-model.number="temp.mobile_phone" readonly/>
            </el-form-item>
            <el-form-item label="身份证号" prop="loan_card">
              <el-input v-model="temp.identity_card" readonly/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogDetailVisible = false">
            取消
          </el-button>
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
import {approveFirstList,approveFirstDetail,approveFirstPass,approveFirstReject} from '@/api/article'

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
      temp:{
        id:'',
        name:'',//姓名
        birthday:'',//出生日期
        sex:'',//性别
        education:'',//教育程度
        address1:'',//居住地址
        mobile_phone:'',//手机号
      },
      formLabelWidth: '120px',
      dialogDetailVisible:false , //详情弹层
    }
  },
  methods:{
    getList(){
      approveFirstList(this.query).then(res=>{
        console.log(res);
        if(res.code=='20000'){
          this.lists=res.data.data.data;
          this.rows=res.data.data.rows;
          this.pages=res.data.data.pages;
        }
      })
    },
    detail(row){
      console.log(row) //{…}
      alert(row.loan_id) //112
      // approveFirstDetail({id:row.loan_id})  ===approveFirstPass(data)
      approveFirstDetail({id:row.loan_id}).then(res=>{
        this.dialogDetailVisible=true;
        console.log(res);
        // this.temp={...res.data.data}; //获取展示的数据
        if(res.code == '20000'){
          this.temp = res.data.data;  //获取展示的数据
        }
      })
    },
    pass(row){
      approveFirstPass({appId:row.id,loanId:row.loan_id}).then(res=>{
        console.log(res)
        if(res.code=='20000'){
          this.getList();
            this.$notify({
              title: '初审通过成功',
              message: '初审通过成功',
              type: 'success',
              duration: 2000
            }) 
        }
      })
    },
    reject(row){
      approveFirstReject({appId:row.id,loanId:row.loan_id}).then(res=>{
        console.log(res)
        if(res.code=='20000'){
          this.getList();
            this.$notify({
              title: '初审拒绝成功',
              message: '初审拒绝成功',
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
    getStatue(type){  //状态
      switch(type){
        case 0: return '进件';
        case 1: return '提交初审';
        case 2: return '初审通过';
        case 3: return '初审拒绝';
        case 4: return '提交终审';
        case 5: return '终审通过';
        case 6: return '终审拒绝';
        case 7: return '生成合同';
      }
    },
    getTypeStatue(type){
      switch(type){
        case 0: return 'info';
        case 1: return 'success';
        case 2: return 'success';
        case 3: return 'danger';
        case 4: return 'success';
        case 5: return 'success';
        case 6: return 'danger';
        case 7: return 'success';
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">


</style>
