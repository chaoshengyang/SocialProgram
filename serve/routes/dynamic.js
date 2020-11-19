const Router = require("koa-router");
const Dynamic = require('../model/dynamic');
const User = require("../model/user");
const Theme = require("../model/discussTheme")
const { Form } = require('multiparty')
const path = require('path');
const router = new Router({ prefix: "/api/dynamic" });


//需要的参数
/*
    userid,
    dynamicText,
    dynamicImage?[],
    dynamicType?
    publishTime
    用户的信息不需要存，在用户表里关联到
*/
router.post("/send_dynamic", async (ctx) => {

    // 验证参数
    ctx.verifyParams({
        //把openid发过来
        userid: "string",
        dynamicText: "string",
        dynamicImage: {
            type: "array",
            default: []
        },
        //发布时间
        publishTime: "number",
        //话题类型 不需要判断 没有话题就不传
        // dynamicType:"string" 
    });
    // console.log(ctx.request.body);

    const result = ctx.request.body;

    //添加新的动态
    var res = await new Dynamic({

        dynamicText: result.dynamicText,
        dynamicImage: result.dynamicImage,
        publishTime: result.publishTime,
        dynamicType: result.dynamicType ? result.dynamicType : '',
        // 用户的_id
        publisher: result.userid

    }).save();
    // 响应客户端

    // 登录第五步：响应登录态给客户端

    if (res) {
        ctx.status = 200;
        ctx.body = {
            message: '发布成功',
            userid: result.userid,

        };
    } else {
        ctx.status = 404;
        ctx.body = {
            message: '发布失败',
            userid: result.userid,

        };
    }


});

//拉起图片时存到服务器 上传图片的接口必须是post
router.post('/img/upload', async (ctx) => {
    // console.log(ctx.req);
    //解析formdata数据的对象
    const form = new Form({
        //传来的资源要存在哪个文件夹
        uploadDir: path.join(__dirname, "../images")
    });
    const tmpPath = await new Promise((resolve, reject) => {
        //ctx.req原生的request
        form.parse(ctx.req, (error, fields, files) => {
            if (!error) {
                const imagePath = files.images[0].path;
                // 根据参数1的地址找参数2的相对路径地址
                let result = path.relative(path.join(__dirname, "../"), imagePath);
               
                
                // 响应客户端图片地址
                resolve("/" + result);
            }
        });
    });
    if(tmpPath){
        ctx.status = 200;
        ctx.body = {
          imagePath: tmpPath,
        };
    }else{
        ctx.status = 404;
        ctx.body = {
          imagePath: tmpPath,
        };
    }
})


//获得所有的动态
router.get("/get_AllDynamic", async (ctx) => {
    //用户信息填充到动态表中
    const dynamic = await Dynamic.find().populate('publisher');

    ctx.status = 200;
    ctx.body = {
        dynamic
    };

});

//获得当前用户的动态
router.get("/get_dynamic", async (ctx) => {
    ctx.verifyParams({
        //把openid发过来
        userid: "string",
    });
    const dynamic = await Dynamic.find({ userid: ctx.request.userid }).populate('publisher');
    // 登录第五步：响应登录态给客户端
    if (dynamic) {
        ctx.status = 200;
        ctx.body = {
            dynamic

        };
    } else {
        ctx.status = 404;
        ctx.body = {
            message: 'error'
        };
    }
});

module.exports = router;
