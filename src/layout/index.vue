<template>
  <div>
      <el-container>
        <el-aside width="200px">
            <!-- 左侧导航 -->
            <Slidebar />
        </el-aside>
        <el-container>
            <el-header style="height:20px;margin-top:30px;">
                <!-- 面包屑 -->
                <Nav />
            </el-header>
            <el-main>
                <!-- 右侧主内容 -->
                <Main /> <!-- 二级导航  子路由 -->
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import {Slidebar,Nav,Main} from './components'
export default {
  data () {
    return {
      
    }
  },
  components:{
      Slidebar,
      Nav,
      Main
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
*{
  margin:0px;
  padding:0px;
}

</style>
