import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index'   //布局

Vue.use(Router)
import permissionRouter from './modules/permission'

export const constantRoutes = [   //常规配置
  {
    path: '/login',
    name: 'login',
    component: ()=>import('@/views/login/index')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '首页'
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: '首页',
        meta: {
          title: '首页'
        }
      }
    ]
  },
]

export const asyncRoutes = [   //异步路由
  {
    path: '/loan-input',   //loan-input  贷款申请 
    component: Layout,
    redirect: '/loan-input/index',
    meta: {
      title: '贷款申请', 
      roles: ['input']   //角色销售人员
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/loan-input/index'),
        name: '贷款申请',
        meta: {
          title: '贷款申请'
        }
      }
    ]
  },
  {
    path: '/input-manager',  //input-manager申请管理
    redirect: '/input-manager/index',
    component: Layout,
    meta: {
      title: '申请管理',
      roles: ['input']   //角色销售人员
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/input-manager/index'),
        name: '申请管理',
        meta: {
          title: '申请管理',
          icon: 'el-icon-setting'
        }
      }
    ]
  },

  {
    path: '/loan-approve',  //loan-approve 贷款审批
    component: Layout,
    redirect: '/loan-approve/first',
    name: '贷款审批',
    meta: {
      title: '贷款审批',
      roles: ['approve']  //角色审核人员
    },
    children: [
      {
        path: 'first',  //first 初审
        component: () => import('@/views/loan-approve/first'),
        name: '初审',
        meta: {
          title: '初审'
        }
      },
      {
        path: 'end',  //end  终审
        component: () => import('@/views/loan-approve/end'),
        name: '终审',
        meta: {
          title: '终审', 
          icon: 'list'
        }
      }
    ]
  },

  {
    path: '/contract',  //contract 标的管理
    component: Layout,
    redirect: '/contract/index',
    meta: {
      title: '标的管理'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/contract/index'),
        name: '标的管理',
        meta: {
          title: '标的管理'
        }
      }
    ]
  },
  permissionRouter,
  { path: '*', redirect: '/login' }
]

export default new Router({
  routes: constantRoutes
})