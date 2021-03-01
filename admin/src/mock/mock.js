import Mock from 'mockjs'
const baseURL = 'http://localhost:3000/api';
export default [
  Mock.mock(baseURL + '/admin/login', {
    status: "success",
    message: "登陆成功",
    data: {
      userInfo: {
        nickName: 'agumrzh'
      },
      token: 'token'
    }
  }),

]