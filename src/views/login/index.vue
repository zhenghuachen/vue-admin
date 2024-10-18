<template>
  <div class="login-container">
    <el-form class="login-form" ref="loginFormRef" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!-- username -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input placeholder="username" name="username" type="text" v-model="loginForm.username"></el-input>
      </el-form-item>

      <!-- password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <el-icon>
            <svg-icon icon="password"></svg-icon>
          </el-icon>
        </span>
        <el-input placeholder="password" name="password"  :type="passwordType" v-model="loginForm.password"></el-input>
        <span class="show-pwd">
          <span class="svg-container"  @click="onChangePwdType">
            <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'"></svg-icon>
          </span>
        </span>
      </el-form-item>

      <!-- 登录按钮-->
      <el-button type="primary" style="width: 100%; margin-bottom: 30px" :loading="loading" @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// vue3 setup语法中导入的组件可以直接使用，不需要再通过Component注册了
import { validatePassword } from './rules'
import { useStore } from 'vuex' // 按需导入useStore方法

// 数据源
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
// 验证规则
const loginRules = ref({
  username: [
    {
      required: true,
      message: '用户名为必填项',
      trigger: 'blur'
    }
  ],
  password: [
    {
      requireed: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})

// 密码框显示隐藏
const passwordType = ref('password')
// template中绑定的方法，直接声明即可
const onChangePwdType = () => {
  // 当passwordType为password时，点击后变为text，反之亦然
  // 使用ref声明的数据，在script中使用时，需要加value来获取具体的值，但是在template中不需要加value
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

// 登陆动作处理
const loading = ref(false) // 使用ref声明的数据默认值false
const loginFormRef = ref(null) // 使用ref声明的数据默认值null,用于获取组件实例
const store = useStore()
const handleLogin = () => {
  // 1.进行表单校验
  loginFormRef.value.validate((valid) => { // vue3的compsition API中没有this.refs
    if (!valid) return
    // 2.触发登陆动作
    loading.value = true
    store
      .dispatch('user/login', loginForm.value)
      .then((res) => {
        console.log(res)
        loading.value = false
        // 3. TODO:进行登陆后处理
      })
      .catch((err) => {
        console.log(err)
        loading.value = false
      })
  })
}

</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        height: 47px;
        background: transparent;
        border: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        caret-color: $cursor;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
