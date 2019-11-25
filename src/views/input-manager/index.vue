<template>
  <div class="applay">
      <div class="serach">
        <el-input v-model="query.name" placeholder="请输入用户名" clearable class="tab"  size="small" @input="getList"></el-input>
        <el-button type="primary" size="small" @click="getList">查询</el-button>
      </div>
      <div class="content">
        <el-table
          :data="lists"
          style="width: 100%">
          <el-table-column
            prop="name"
            fixed
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="birthday"
            label="出生日期"
            width="100">
            <template slot-scope='scope'>
              <span>{{scope.row.birthday | getDate}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别">
            <template slot-scope='scope'>
              <span>{{scope.row.sex | getSex}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="education"
            label="教育程度"
            width="100">
            <template slot-scope='scope'>
              <span>{{scope.row.education | getEducation}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address1"
            label="居住地址">
          </el-table-column>
          <el-table-column
            prop="mobile_phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="status"
            label="申请状态" width='100'>
            <template slot-scope='scope'>
              <el-tag :type="scope.row.status | getTypeStatue">
                {{scope.row.status | getStatue}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作" width='300'>
            <template slot-scope='{row}'>
              <!-- row整个表格的数据对象   @input是实时变化 -->
              <el-button type="primary" size="small" @click="edit(row)" :disabled="row.status!=0&&row.status!=3&&row.status!=6">编辑</el-button>
              <el-button type="danger" size="small" @click="del(row)" :disabled="row.status!=0&&row.status!=3&&row.status!=6">删除</el-button>
              <el-button type="success" size="small" @click="submitToApprove(row)">提交审核</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 编辑弹层 -->
      <el-dialog title="申请管理--编辑" :visible.sync="dialogEditVisible">
        <el-form :model="form">
          <el-form-item label="id" :label-width="formLabelWidth" v-show="false">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option v-for="item in sexOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="update()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 删除弹层 -->
      <el-dialog title="申请管理-删除" :visible.sync="dialogDelVisible">
        <span>确定删除？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogDelVisible = false">取 消</el-button>
          <el-button type="primary" @click="delData()">确 定</el-button>
        </span>
      </el-dialog>
      <div class="demonstration">
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
  </div>
  
</template>

<script>
import {loanList,loanUpdate,loanDelete,loanSubmitToApprove} from '@/api/article'
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
      dialogEditVisible:false , //编辑弹层
      dialogDelVisible:false, //删除弹层
    }
  },
  methods:{
    getList(){
      loanList(this.query).then(res=>{
        console.log(res);
        if(res.code=='20000'){
          this.lists=res.data.data.data;
          this.rows=res.data.data.rows;
          this.pages=res.data.data.pages;
        }
      })
    },
    edit(row){
      this.dialogEditVisible=true;//弹层显示
      this.form=Object.assign({},row);
    },
    update(){ //编辑提交的数据
      loanUpdate(this.form).then(res=>{
        console.log(res);
        if(res.code=='20000'){
          this.getList();//重新调用查询接口
            this.dialogEditVisible = false; //弹层隐藏
            this.$notify({
              title: '编辑成功',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            }) 
        }
      })
    },
    del(row){
      this.dialogDelVisible=true;
      this.form=Object.assign({},row);
    },
    delData(){
      console.log(this.form.id);
      loanDelete({id:this.form.id}).then(res=>{  //注意接口传参
        console.log(res);
        if(res.code=='20000'){
          this.getList();//重新调用查询接口
            this.dialogDelVisible = false; //弹层隐藏
            this.$notify({
              title: '删除成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            }) 
        }
      })
    },
    submitToApprove(row){
      loanSubmitToApprove({id:row.id}).then(res=>{
        console.log(res);
        if(res.code=='20000'){
          this.getList();//重新调用查询接口
            this.$notify({
              title: '提交审核成功',
              message: '提交审核成功',
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
        case 0: return '进件';//
        case 1: return '提交初审';
        case 2: return '初审通过';
        case 3: return '初审拒绝';//
        case 4: return '提交终审';
        case 5: return '终审通过';
        case 6: return '终审拒绝';//
        case 7: return '生成合同';
      }
    },
    getTypeStatue(type){
      switch(type){
        case 0: return 'info';
        case 1: return 'warning';
        case 2: return 'success';
        case 3: return 'danger';
        case 4: return 'warning';
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
.applay{
  width:100%;
  padding: 5px 18px;
  .serach{
    .tab{
      width:600px;
    }
  }
  .content{
    margin: 30px 0;
  }
  .dialog-footer{
    text-align: 30px;
  }
  .demonstration{
    text-align: center;
    margin-bottom: 30px;
  }
}

</style>
