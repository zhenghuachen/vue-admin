import { login } from '@/api/sys'
import md5 from 'md5'

export default {
  namespaced: true, // 独立的模块，防止命名冲突
  state: () => ({}),
  mutations: {},
  actions: {
    /**
         * 登录请求动作
         * @param {*} context
         * @param {*} userInfo
         * @returns
         */
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username, password: md5(password)
        }).then(data => {
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
