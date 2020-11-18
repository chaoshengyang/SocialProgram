const {model , SchemaTypes}  = require('mongoose');

module.exports = module("userInfo",{
    openid:{
        type:SchemaTypes.String,
        require:true,
    },
    // 关联动态表,用户的多条动态
    dynamic:[{
        type:SchemaTypes.ObjectId,
        ref:"dynamic"
    }],
    // 用户的关注,关联用户列表,多个用户
    userFocus:[{
        type:SchemaTypes.ObjectId,
        ref:"userInfo"
    }],
    // 用户收藏的动态，关联多个动态
    myCollection:[{
        type:SchemaTypes.ObjectId,
        ref:"dynamic"
    }]
})