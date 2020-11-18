const { model, SchemaTypes } = require('mongoose');

module.exports = model('discussTheme', {
    // 话题名称
    themeName:{
        type:String,
        require:true,
    },
    // 话题封面
    themeImage:{
        type:String,
        require:false,
    },
    // 话题描述
    themeDetail:{
        type:String,
        require:false,
    },
    // 是否推荐
    isRecommend:{
        type:String,
        default:false
    },
    // 讨论量，关联动态，待定
    // 浏览量，关联动态，待定（动态+评论人数）

})