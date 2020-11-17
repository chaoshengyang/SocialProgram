const { model, SchemaTypes } = require('mongoose');

module.exports = model('dynamic', {
    openid: {
        type: String,
        require: true
    },
    dynamicText: {
        type: String,
        required: true
    },
    dynamicImage: {
        type: Array,
        required: false,
        default:[]
    },
    publishTime: {
        type: Number,
        require: true
    },
    //动态分类
    dynamicType: {
        type: String,
        default: 'new'
    },


})