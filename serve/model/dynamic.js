const { model, SchemaTypes } = require('mongoose');

module.exports = model('dynamic', {
  
  //动态
    dynamicText: {
        type: String,
        required: true
    },

    // 动态图片
    dynamicImage: {
        type: Array,
        required: false,
        default:[]
    },

    // 发布时间
    publishTime: {
        type: Number,
        required: true
    },
    // 关联用户，动态发布者
    publisher:{
        type:SchemaTypes.ObjectId,
        ref:"user"
    },


    
//     publishTime: {
//         type: Number,
//         require: true
//     },


    //动态分类
    dynamicType: {
        type: String,
        default: ''
    },

})