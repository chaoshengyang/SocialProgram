const {model,SchemaTypes} = require('mongoose');

module.exports = model('user', {
  openid: {
    type:String,
    require:true
  },
  avatarUrl:{
    type: String,
    required: false
  },
  gender:{
    type:SchemaTypes.String,
  },
  nickName:{
    type:SchemaTypes.String,
  },
  signature:{
    type:SchemaTypes.String,
  },
  userLabel:{
    type:SchemaTypes.String,
  },
  userProvince:{
    type:SchemaTypes.String,
  },
  userCity:{
    type:SchemaTypes.String,
  },
  userPhone:{
    type:SchemaTypes.Number,
  }
  
})