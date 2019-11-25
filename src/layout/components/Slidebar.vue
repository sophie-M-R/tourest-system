<template>
    <!--<el-aside width="200px">
        <el-menu router
            class="el-menu-vertical-demo"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#3a87ef">
            <el-menu-item index="/home">
                <i class="el-icon-location"></i><span slot="title">首页</span>
            </el-menu-item>
            
            <el-menu-item index="/loan-input/index">
                <i class="el-icon-menu"></i><span slot="title">贷款申请</span>
            </el-menu-item>

            <el-menu-item index="/input-manager/index">
                <i class="el-icon-setting"></i><span slot="title">申请管理</span>
            </el-menu-item>

            <el-submenu index="/loan-approve">
                <template slot="title">
                    <i class="el-icon-location"></i><span>贷款审批</span>
                </template>
                <el-menu-item index="/loan-approve/first">初审</el-menu-item>
                <el-menu-item index="/loan-approve/end">终审</el-menu-item>
            </el-submenu>

            <el-menu-item index="/contract/index">
                <i class="el-icon-setting"></i><span slot="title">标的管理</span>
            </el-menu-item>

            <el-submenu index="/permission">
                <template slot="title">
                    <i class="el-icon-location"></i><span>权限管理</span>
                </template>
                <el-menu-item index="/permission/create">创建管理员</el-menu-item>
                <el-menu-item index="/permission/list">列表展示</el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside> -->
    <div class="aside">
        <el-aside width="200px" class="el-menu-vertical-demo"> 
          <el-menu router
            class="el-menu-vertical-demo"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#3a87ef">
            <Sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
          </el-menu>
        </el-aside> 
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  data () {
    return {
    }
  },
  components: { SidebarItem },
  computed: { //扩展计算属性
    ...mapGetters([
      'permission_routes',
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.el-aside{
    height:auto;
    background-color:#304156;
} 
</style>
