<template>
  <div>
      <div></div>
      <el-table
        :data="lists"
        style="width: 100%">
        <el-table-column
          prop="account"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码">
        </el-table-column>
        <el-table-column
          prop="reg_time"
          label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.reg_time | getDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建者" >
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="权限分配">
          <template slot-scope="scope">
            <span>{{ scope.row.role_name | getRole }}</span>
          </template>
        </el-table-column>
      </el-table>
  </div>
  
</template>

<script>
import {permissionList} from '@/api/article'

export default {
  data () {
    return {
      lists:[],
      query:{
        account:'',
        creator:'',
        password:'',
        reg_time:'',
        role_name:''
      },
      
    }
  },
  methods:{
    getList(){
      permissionList(this.query).then(res=>{
        console.log(res);
        if(res.code=='20000'){
          this.lists=res.data;
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
    getRole(type){
      switch(type){
        case 'input':
          return '销售人员';
        case 'approve':
          return '初审人员'

      }
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">


</style>
