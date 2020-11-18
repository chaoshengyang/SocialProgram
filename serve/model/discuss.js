const {model , SchemaTypes}  = require('mongoose');

module.exports = module("discuss",{

    // 关联动态表,哪条动态的评论
    dynamic:{
        type:SchemaTypes.ObjectId,
        ref:"dynamic"
    },
    // 关联用户表，谁发布的这条评论
    publisher:[{
        type:SchemaTypes.ObjectId,
        ref:"userInfo"
    }],
    // 评论内容
    discussMsg:{
        type:String,
        require:true
    },
    // 评论时间
    discussTime:{
        type:SchemaTypes.Date,
        require:true,
    }
})