const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = '欢迎使用node+sequelize+mysql接口'
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
      code : 1,
      message : '获取json成功',
      data : [
          {
              id: 1,
              title : 'this is json1',
              content : '这是第一个列表的内容'
          },
          {
              id : 2,
              title : 'this is json2',
              content : '这是第二个列表的内容'
          },
          {
              id : 3,
              title : 'this is json3',
              content : '这是第三个列表的内容'
          },
          {
              id : 4,
              title : 'this is json4',
              content : '这是第四个列表的内容'
          },
      ]
  }
})

module.exports = router
