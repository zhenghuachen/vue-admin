<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
// 1.vscode默认一个tab等于4个空格，而ESLint期望是2个；
// 2.如果vscode安装了多个代码格式化工具，可以右键选中『使用...格式化文档』配置默认的格式化程序
// 3.ESLint和prettier之间冲突：space-before-function-paren;
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Homepage',
  components: {
    HelloWorld
  },
  created() {
    console.log('create')
  }
}
</script>
