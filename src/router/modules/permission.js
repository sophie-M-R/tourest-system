import Layout from '@/layout/index'

const permissionRouter = {
    path: '/permission', //权限管理
    name: 'Layout',
    component: Layout,
    redirect:'/permission/create',
    meta:{
      title:'权限管理'
    },
    children:[{ 
      path:'create',
      name:'create',
      component:()=>import('@/views/permission/create'),
      meta:{
        title:'创建管理员'
      }
    },
    { 
      path:'list',
      name:'list',
      component:()=>import('@/views/permission/list'),
      meta:{
        title:'列表展示'
      }
    }
  ]
  }
  export default permissionRouter

