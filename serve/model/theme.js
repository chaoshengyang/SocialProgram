const {model,SchemaTypes} = require('mongoose');

module.exports = model('theme', {
    themeName: {
        type:String,
        require:true
    },
    themeImage: {
        type:String,
        require:true
    },
    themeDetail: {
        type:String,
        require:true
    }, 
    isRecommend: {
        type:Boolean,
        default:false
    },
    discussNum: {
        type:Number,
        require:true
    },
    browseNum: {
        type:Number,
        require:true
    }
})