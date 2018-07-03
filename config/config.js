const { User} = require('./user')
const { Friend} = require('./friend')
const Sequelize = require('sequelize')

User.hasMany(Friend)         //用户关联文章 User.find( include : {model : Blog})
Friend.belongsTo(User,{as:'uid'})

User.sync({force:false})
Friend.sync({force:false})
module.exports = {
    User,Friend
}
