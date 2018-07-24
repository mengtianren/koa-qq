const { User} = require('./user')
const { Friend} = require('./friend')

User.hasMany(Friend)         //用户关联文章 User.find( include : {model : Blog})
Friend.belongsTo(User,{as:'uid'})   // 别名uid

// User.sync({force:false})
// Friend.sync({force:false})
module.exports = {
    User,Friend
}
