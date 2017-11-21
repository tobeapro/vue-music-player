const mongoose = require('mongoose') // 引入mongoose
const Schema = mongoose.Schema // 创建Schema实例
const userSchema = new Schema({
  name: {type: String},
  pwd: {type: String},
  uId: {type: Number}
})
const musicSchema = new Schema({
  id: {type: Number},
  img: {type: String},
  lyric: {type: String},
  name: {type: String},
  singer: {type: String},
  url: {type: String}
})
// 创建model，每个schema对应一个model
const Models = {
  User: mongoose.model('User', userSchema),
  Music: mongoose.model('Music', musicSchema)
}
// 创建mongodb连接
mongoose.connect('mongodb://localhost/player')
const db = mongoose.connection
db.on('error', function () {
  console.log('DataBse connection error')
})
db.once('open', function () {
  console.log('The Database has connected')
})

// 导出模块models接口
module.exports = Models
