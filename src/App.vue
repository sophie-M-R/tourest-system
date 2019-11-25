<template>
  <div id="app">
    <!-- 一进来我们展示的是路由，因为所有的都是动态的 -->
    <!-- 跟上一次写的vue笔记 不一样 那是左侧是固定的，右侧是动态的路由显示 -->
    <router-view/>  <!-- 一级导航  主路由-->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
