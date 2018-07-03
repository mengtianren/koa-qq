const Sequelize = require('sequelize')

const db = require('./db')

const Friend = db.define('friend',{
   // user_id :{
   //     type : Sequelize.STRING,
   //     allowNull : false
   // },
   //  friend_id : {
   //     type : Sequelize.STRING,
   //      allowNull: false
   //  }
},{
    timestamps : true,  //时间更新
    freezeTableName: true, //不加s
})

module.exports = {
    Friend
}
