const router = require('koa-router')()

const {nick_user} = require('../controller/user')

router.prefix('/api/users')


router.post('/register',async ctx => await nick_user.register(ctx))
router.post('/login',async ctx => await nick_user.login(ctx))

router.get('/list',async ctx => await nick_user.friendList(ctx))
router.get('/getFriend',async ctx => await nick_user.getFriend(ctx))
router.get('/addFriend',async ctx => await nick_user.addFriend(ctx))
// router.get('/getFriend',async ctx => await nick_user.getFriend(ctx))

module.exports = router
