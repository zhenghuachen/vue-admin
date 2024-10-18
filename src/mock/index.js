// import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import request from '@/utils/request' // 引入上面创建的 Axios 实例

const mock = new AxiosMockAdapter(request)

// Mock GET 请求
mock.onGet('/api/data').reply(200, {
  message: 'Hello World'
})

// Mock POST 请求
mock.onPost('/api/sys/login').reply(200, {
  data: {
    token: '8fa22e88-f6ab-4a4b-930a-a5e62c4c74e8'
  },
  message: '登陆成功',
  success: true
})

export default mock
