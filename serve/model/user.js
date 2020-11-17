const { model, SchemaTypes } = require('mongoose');

module.exports = model('user', {
  openid: {
    type: String,
    require: true
  },
  nickName: {
    type: String,
    required: true,
    default:''
  },
  avatarUrl: {
    type: String,
    required: true,
    default:''
  },
  gender:{
    type:Number,
    require:false,
    default:1
  },
  //签名
  signature: {
    type: String,
    required: false,
    default:''
  },
  userLabel: {
    type: String,
    required: false,
    default:''
  },
  userProvince: {
    type: String,
    required: false
  },
  userCity: {
    type: String,
    required: false
  },
  userPhone: {
    type: String,
    required: false,
    default: 12345
  }
})