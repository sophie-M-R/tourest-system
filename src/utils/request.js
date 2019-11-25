import axios from 'axios'
import { Message} from 'element-ui'
import {getToken} from '@/utils/cookie.js'

const service =axios.create({
    baseURL:'http://47.96.117.121:5003/api/',
    withCredentials:true,//允许携带cookie
})

//添加请求拦截器

service.interceptors.request.use(
    config=>{
        config.headers['token']=getToken()
        return config
    },
    error=>{
        console.log(error)
        return Promise.reject(error)
    }
)

//添加响应拦截器
service.interceptors.response.use(
    response=>{
        const res=response.data
        if(res.code!=20000){
            Message({
                message:res.message || '服务器错误',
                type:'error',
                duration:2000
            })
            return Promise.reject(new Error(res.message || 'Error'))
        }else{
            return res
        }
    },
    error=>{
        console.log('err'+error)
        Message({
            message:error.message,
            type:'error',
            duration:2000
        })
        return Promise.reject(error)
    }
)
export default service