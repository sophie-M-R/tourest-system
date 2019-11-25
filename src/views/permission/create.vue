<template>
  <div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" ></el-input>
        </el-form-item>
        <el-form-item label="权限分配" prop="type">
          <el-radio-group v-model="ruleForm.role_id">
            <el-radio label="2">销售人员</el-radio>
            <el-radio label="3">初审人员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      
  </div>
  
</template>

<script>
import {permissionCreate} from '@/api/article'

export default {
  data () {
    return {
       ruleForm: {
          account: '',
          password: '',
          checkPass: '',
          role_id:'2'
        },
        rules: {
          account: [
            {required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur' },
            { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
          ],
          checkPass: [
           {required: true, message: '请再次输入密码', trigger: 'blur' },
           { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
          ],
          role_id:[
            {required:true,message:'请选择权限',trigger:'change'}
          ]
        }
    }
  },
  methods:{
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            permissionCreate(this.ruleForm).then(res=>{
              this.$router.push('/permission/list'); //跳转到申请管理
              this.$notify({
                title: '创建成功',
                message: 'Created Successfully',
                type: 'success',
                duration: 2000
              })
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
  mounted(){
  },
  filters:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">


</style>
