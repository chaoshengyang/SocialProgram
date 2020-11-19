const {model , SchemaTypes}  = require('mongoose');

module.exports = model("praise",{

    // 关联动态表,哪条动态的点赞
    dynamic:{
        type:SchemaTypes.ObjectId,
        ref:"dynamic"
    },
    // 关联用户表，谁点赞了这条动态
    publisher:{
        type:SchemaTypes.ObjectId,
        ref:"userInfo"
    },
    // 评论时间
    praiseTime:{
        type:SchemaTypes.Date,
        require:true,
    }
})