<template>
  <div class="header">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="options">
        <el-breadcrumb-item v-for="(item,i) in items" :key="i">
          {{item.meta.title}}
        </el-breadcrumb-item>
    </el-breadcrumb> 
    <div class="main">
      <!-- 右侧退出下拉菜单  -->
      <el-dropdown class="right-dropdown">
        <span class="el-dropdown-link">
          退出<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <span style="display:block" @click="logout()"><el-dropdown-item>退出</el-dropdown-item></span>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>    
</template>

<script>
import {removeToken} from '@/utils/cookie.js'
import {logout} from '@/api/article'
export default {
  data () {
    return {
      items:[]
    }
  },
  methods:{
    getRouter(){
      this.items=this.$route.matched;
    },
    logout () {
        this.$store.dispatch('Logout').then(res => {
          this.$router.push('/login')
        })
      }
  },
  created(){
    this.getRouter();
  },
  watch:{
    $route(to,from){
      this.getRouter();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.header{
  width: 100%;
  padding-right: 20px;
  .options{
    padding-top: 2px;
  }
  .main{
    float: right;
  }
}
</style>
