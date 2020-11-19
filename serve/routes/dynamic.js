const Router = require("koa-router");
const Dynamic = require('../model/dynamic');
const User = require("../model/user");
const Theme = require("../model/discussTheme")

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
            type:"array",
            default:[]
        },
        //发布时间
        publishTime: "number",
        //话题类型
        dynamicType: {
            type:"string",
            default:'我们大家庭'
        },   
    });
    // console.log(ctx.request.body);
  
    const result = ctx.request.body;

    // console.log(result);
    //  const publisher   = await User.find({userid:result.userid}).populate(['publisherID'])
    // if(result.dynamicType){
    //     const theme = await  Theme.findOne({themeName:result.dynamicType});
    //     console.log(theme);
    // }
    
    //添加新的动态
    var res = await new Dynamic({
    
        dynamicText: result.dynamicText,
        dynamicImage: result.dynamicImage,
        publishTime: result.publishTime,
        dynamicType: result.dynamicType?result.dynamicType:'我们大家庭',
        // 用户的_id
        publisher:result.userid
        
    }).save();
    // 响应客户端

    // 登录第五步：响应登录态给客户端

    if(res){
        ctx.status = 200;
        ctx.body = {
            message: '发布成功',
            openid: result.openid,
            
        };
    }else {
        ctx.status = 404;
        ctx.body = {
            message: '发布失败',
            openid: result.openid,
            
        };
    }


});


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
    const dynamic = await Dynamic.find({userid:ctx.request.userid}).populate('publisher');
    // 登录第五步：响应登录态给客户端
    if(dynamic){
        ctx.status = 200;
        ctx.body = {
            dynamic

        };
    }else {
        ctx.status = 404;
        ctx.body = {
            message:'error'
        };
    }
});

module.exports = router;
