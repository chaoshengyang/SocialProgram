const {model,SchemaTypes} = require('mongoose');

module.exports = model('user', {
  openid: {
    type:String,
    require:true
  },
  // username: {
  //   type: String,
  //   required: true
  // },
  // userImage:{
  //   type: String,
  //   required: true
  // },
  // //关联用户关注列表
  // userFocus:{
  //   type:SchemaTypes.ObjectId,
  //   default:00000
  // },
  // //关联用户发布动态列表
  // userPublishList:{
  //   type:SchemaTypes.ObjectId,
  //   default:00000
  // }
})