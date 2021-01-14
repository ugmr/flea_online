import Mock from 'mockjs'
const baseURL = 'http://localhost:3000/api';
export default [
  Mock.mock(baseURL + '/admin/login', {
    data: {
      userInfo: {
        nickName: 'agumrzh'
      },
      token: 'token'
    }
  })
]