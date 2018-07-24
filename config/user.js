const Sequelize = require('sequelize')
// const Op = Sequelize.Op

const db = require('./db')

const User = db.define('user',{
    nick_name : {
        type : Sequelize.STRING,
        allowNull : false,
        defaultValue : '暂无昵称',
        comment : '这是昵称'
    },
    nick_icon : {
        type : Sequelize.STRING,
        defaultValue: 'https://sfault-avatar.b0.upaiyun.com/355/703/3557037817-575d49e236f70_big64',
        comment : '这是用户头像',
        validate : {
            isUrl : true
        }
    },
    nick_pass : {
        type : Sequelize.STRING,
        allowNull : false,
        comment : '这是用户密码',
    },
    nick_mobile : {
        unique : true,
        type : Sequelize.STRING,
        allowNull : false,
        validate : {
            isNumeric: true, //判断是否为数字
            is : /^[1][3,4,5,7,8][0-9]{9}$/  //判断正则是否为十一位
        },
        comment : '这是用户手机号'
    },
    nick_graph : {
        type : Sequelize.STRING(50),
        defaultValue : '别辜负了自己的努力~~~'

    }
},{
    timestamps : true,  //时间更新
    freezeTableName: true, //不加s
})

module.exports = {
    User
}
