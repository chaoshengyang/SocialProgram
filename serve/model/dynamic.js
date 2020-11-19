const { model, SchemaTypes } = require('mongoose');

module.exports = model('dynamic', {
    // 用户openid
    openid: {
        type: String,
        require: true
    },
    // 用户名
    username:{
        type:String,
        require:true
    },
  //用户头像
    avatarUrl:{
        type:String,
        require:true
    },
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
        type: SchemaTypes.Date,
        require: true
    },
    // 关联用户，动态发布者
    publisherID:{
        type:SchemaTypes.ObjectId,
        ref:"userInfo"
    },
    // 关联评论
    discussID:[{
        type:SchemaTypes.ObjectId,
        ref:"discuss"
    }],
    // 关联用户，点赞者
    praiseID:[{
        type:SchemaTypes.ObjectId,
        ref:"userInfo"
    }],
    // 关联话题，获取话题详情
    themeAboutID:{
        type:SchemaTypes.ObjectId,
        ref:"discussTheme"
    },
//     publishTime: {
//         type: Number,
//         require: true
//     },
    //动态分类
    dynamicType: {
        type: String,
        default: '我们大家庭'
    },

})