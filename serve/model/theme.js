const {model,SchemaTypes} = require('mongoose');

module.exports = model('theme', {
    themeName: {
        type:String,
        required:true
    },
    themeImage: {
        type:String,
        required:true
    },
    themeDetail: {
        type:String,
        required:true
    }, 
    isRecommend: {
        type:Boolean,
        default:false
    },
    discussNum: {
        type:Number,
        required:true
    },
    browseNum: {
        type:Number,
        required:true
    }
})