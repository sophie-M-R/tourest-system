<template>
  <div>
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
          prop="file_path" 
          label="合同状态">
          <template slot-scope='scope'>
            <el-tag :type="scope.row.file_path | statusTypeFilter">
              {{scope.row.file_path | statusFilter}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作" >
           <template slot-scope='{row}'>   <!-- 'scope' / '{row}' -->
            <!-- row整个表格的数据对象   @input是实时变化  create(scope.row.id)/create(row.id) -->
            <el-button type="primary" size="small" @click="create(row.id)" :disabled="row.file_path">生成合同</el-button>
            <el-button type="danger" size="small" @click="download(row.id)" :disabled="!row.file_path">下载合同</el-button>
          </template>
        </el-table-column>
      </el-table>

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
import {contractList,contractCreate,contractDownload} from '@/api/article'
import { getToken} from '@/utils/cookie'

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
    }
  },
  methods:{
    getList(){
      contractList(this.query).then(res=>{
        console.log(res);
        if(res.code=='20000'){
          this.lists=res.data.data.data;
          this.rows=res.data.data.rows;
          this.pages=res.data.data.pages;
        }
      })
    },
    create(id){
      contractCreate({id}).then(res=>{
        console.log(res)
        if(res.code=='20000'){
          this.getList();
            this.$notify({
              title: '生成合同成功',
              message: '生成合同成功',
              type: 'success',
              duration: 2000
            }) 
        }
      })
    },
    download(id){
      contractDownload(id).then(res=>{
        console.log(res)
        if(res.code=='20000'){
            this.$notify({
              title: '下载合同成功',
              message: '下载合同成功',
              type: 'success',
              duration: 2000
            });
            this.downloadUrlFile(this.url+res.data.url) 
        }
      })
    },
    downloadUrlFile(url){ 
      const xhr=new XMLHttpRequest();
      xhr.open('GET',url,true);
      xhr.withCredentials=true;
      xhr.responseType='blob';
      xhr.setRequestHeader('token',getToken());
       xhr.onload = () => {
        if (xhr.status === 200) {
          // 获取图片blob数据并保存   responseURL
          var filename = xhr.responseURL.substring(xhr.responseURL.lastIndexOf("/")+1);
          this.saveAs(filename, xhr.response);
        }
      };
      xhr.send();
    },
    saveAs(name,data){
      var urlObject=window.URL;
      var export_blob=new Blob([data]);
      var save_link=document.createElement('a');
      save_link.href=urlObject.createObjectURL(export_blob)
      save_link.download=name;
      save_link.click();
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
    statusFilter(type) {  //合同状态
        if(type){
          return "已生成合同"
        }else {
          return "未生成合同"
        }
    },
    statusTypeFilter(type) {  //状态样式 
        if(type){
            return "success"
          }else {
            return "primary"
          }
    }
    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">


</style>
