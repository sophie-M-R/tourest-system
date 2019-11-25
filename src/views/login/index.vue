<template>
  <div class="login-container">
   <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="form-content">
    <el-form-item label="用户名" prop="account" class="content-item">
      <el-input v-model="form.account" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" class="content-item">
      <el-input  type="text" v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">登录</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import {setToken} from '@/utils/cookie'
import {login} from '@/api/article'
export default {
  data () {
    return {
      form: {
          account: 'admin',
          password: 'admin@123'
      },
      rules: {   //校验
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // this.$router.push('/home')
            /* this.$http.post("user/login",this.form)
            .then(res=>{
              console.log(res);
              this.$router.push('/home')
            }).catch(error=>{
              console.log(error)
            }) */
            /* login(this.form).then(res=>{
              console.log(res)
              setToken(res.data.token);
              this.$router.push('/home')
            }) */
            this.$store.dispatch('Login',this.form)
            .then(d=>{
              this.$router.push('/home')
            }).catch(()=>{

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">

$darkColor:#000;
.login-container{
  height: 570px;
  background: lighten($darkColor,80%);
}
.form-content {
  width:50%;
  margin:0px auto;
  border:1px solid lighten($darkColor,80%);
  padding:80px;
  // background: rgb(123, 180, 233);
}
.content-item{
  width:400px;
}


</style>
