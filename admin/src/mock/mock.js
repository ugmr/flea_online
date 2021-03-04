import Mock from 'mockjs'
const baseURL = 'http://localhost:3000/api/admin/v1';

export default [
  Mock.mock(baseURL + '/hot_search', {
    status: "success",
    message: "查询成功",
    data: {
      "list|10": [{
        keyword: Mock.Random.cparagraph(1,2),
        count: Mock.Random.integer(100, 10000),
        user: Mock.Random.integer(100, 1000)
      }],
      count: Mock.Random.integer(10, 100)
    }
  }),
  Mock.mock(baseURL + '/hot_post', {
    status: "success",
    message: "查询成功",
    data: {
      "list|10": [{
        title: Mock.Random.cparagraph(1,2),
        userId: Mock.Random.cparagraph(1),
        topic: Mock.Random.cparagraph(1),
        click: Mock.Random.integer(100, 1000)
      }],
      count: 10
    }
  }),
  Mock.mock('http://localhost:3000/api/v1' + '/upload', {
    status: "success",
    message: "查询成功",
    data: {
      url: "http://testurl.com/test.png",
    }
  })
]