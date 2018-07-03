const {User, Friend,} = require('../config/config')

const md5=require('md5-node');

class nick_user {

    async register(ctx){
        console.log(ctx)
        let query = ctx.request.query
        if(query.nick_mobile||query.nick_pass){
          try{
              await User.create({
                  nick_mobile : query.nick_mobile,
                  nick_pass : md5(query.nick_pass),
                  nick_icon : query.nick_icon,
                  nick_name : query.nick_name
              })
              console.log(query)
              ctx.body = {
                  code : 1,
                  message : '用户创建成功',
                  data : {}
              }
          }catch (e) {
              console.log(e.message)
              ctx.body = {
                  code : 0,
                  message : '系统错误',
                  data : {}
              }
          }

        }else{
             ctx.body = {
                 code : 0,
                 message : '参数不存在',
                 data : {}
             }
        }

    }
    async login(ctx){
        let query =ctx.request.body|| ctx.request.query
        if(!query.nick_mobile||!query.nick_pass){
            ctx.body = {
                code : 0,
                message :' 用户信息不完善',
                data : {}
            }
            return
        }
        console.log(query.nick_mobile,md5(query.nick_pass))
        try {
            let user = await User.find({
                where: {
                    nick_mobile : query.nick_mobile,
                    nick_pass : md5(query.nick_pass)
                },
                attributes:{
                    exclude : ['nick_pass']
                }
            })
            console.log(user,'===========')
            if(user){
                ctx.session.user = user
                ctx.body = {
                    code : 1,
                    message :'登录成功',
                    data :ctx.session.user
                }
            }else{
                ctx.body = {
                    code : 0,
                    message :'用户不存在',
                    data :{}
                }
            }

        }catch (e) {
            ctx.body = {
                code : 0,
                message :'系统错误',
                data :{}
            }
        }


    }
    async friendList(ctx){

        let session = ctx.session.user
        if(!session){
            ctx.body = {
                code : 0,
                message : '用户未登录',
                data : {}
            }
            return
        }
        try {
            let friends = await Friend.findAll({where:{'user_id':session.id},include:{
                    model : User,
                    as:'uid'
                }})
            ctx.body = {
                code : 1,
                message : '获取好友列表成功',
                data : friends
            }
        }catch (e) {
            ctx.body = {
                code : 0,
                message : '系统错误',
                data : {}
            }
        }



        // let user_id = await Friend.findAll({where:{'user_id':1},attributes:['uid_id']})
        // let arr = []
        // user_id.map(value =>{
        //     arr.push(value.uid_id)
        // })
        // console.log(arr)
        // ctx.body = await User.findAll({where:{'id':arr}})
    }
    async getFriend(ctx){
        let query = ctx.request.query
        try {
            let user_id = await User.find({
                where:{
                    nick_mobile:query.nick_mobile
                },
                exclude:['nick_pass']
            })
            console.log(user_id)
            if(user_id){
                ctx.body = {
                    code : 1,
                    message :'user_id',
                    data : user_id
                }
            }else{
                ctx.body = {
                    code : 0,
                    message :'用户不存在',
                    data : {}
                }
            }
        }catch (e) {
            ctx.body = {
                code : 0,
                message :'用户不存在111',
                data : {}
            }
        }


    }
    async addFriend(ctx){
        let query = ctx.request.query
        let session = ctx.session.user
        if(!session){
            ctx.body = {
                code : 0,
                message :'用户未登录',
                data : {}
            }
            return
        }

        let frien = await Friend.findAll({where:{'user_id':session.id,'uid_id':query.uid_id}})
        if(frien.length>0){
            ctx.body = {
                code : 0,
                message : '用户已经是您好友,请勿重复添加',
                data : {}
            }
            return
        }
        let qu = await Friend.create({'user_id':session.id,'uid_id':query.uid_id})
        await Friend.create({'user_id':query.uid_id,'uid_id':session.id})
            ctx.body = {
                code :1,
                message :'添加好友成功',
                data : qu
            }
    }
}

module.exports.nick_user = new nick_user()
