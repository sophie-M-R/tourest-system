import { asyncRoutes, constantRoutes } from '@/router'

 function filterAsyncRoutes(routes, v) {
  const res = []
  routes.forEach(route => {
    //判断是否有角色属性，以及属性中是否有角色值
    var bool = route.meta && route.meta.roles && v.some(
        role => route.meta.roles.includes(role)
    );
    if (bool){
      res.push(route)
    }
  });
  return res
}

const state = {
  routes: [] //角色侧边栏数组
}
const getters = { //计算属性
  permission_routes: state => state.routes,  //权限路由
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  GenerateRoutes({ commit }, roles) {//角色侧边栏数组['']
    return new Promise(resolve => {
      let accessedRoutes; //要展示的侧边栏
      if (roles.includes("administrator")) {  //通过角色过滤路由
        accessedRoutes = asyncRoutes ;
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles) //不是管理员，跟据meta过滤数据
      }
      commit('SET_ROUTES', accessedRoutes);
      resolve(accessedRoutes);
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
