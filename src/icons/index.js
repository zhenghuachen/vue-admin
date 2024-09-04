import SvgIcon from '@/components/SvgIcon'
// 1. 导入所有的svg图标
// 使用到webpack的API：https://webpack.docschina.org/guides/dependency-management/#requirecontext
const svgRequire = require.context('./svg', false, /\.svg$/)
/**
 * 此时返回了一个Require函数，这个函数可以接收一个request的参数，用于require的导入
 * 该函数提供了三个属性，可以通过svgRequire.keys()获取到所有的svg图标
 * 遍历图标，把图标作为require参数传入到svgRequire导入函数中，完成本地svg图标的导入
 */
svgRequire.keys().forEach(svgIcon => {
  svgRequire(svgIcon)
})

// 2. 完成SvgIcon的全局注册（SvgIcon可能在多个组件中使用，避免重复注册，此处全局注册）
export default app => { // 导出函数，参数app对应的就是main.js中的Vue实例
  app.component('svg-icon', SvgIcon)
}
