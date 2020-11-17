const Router = require("koa-router");
const Dynamic = require('../model/dynamic');
const User = require("../model/user");


const router = new Router({ prefix: "/api/dynamic" });

router.post("/send_dynamic", async (ctx) => {
    // 验证参数
    ctx.verifyParams({
        //把openid发过来
        openid: "string",
        dynamicText: "string",
        dynamicImage: {
            type:"array",
            required:false,
            default:[]
        },
        publishTime: "number",
        dynamicType: {
            type:"string",
            required:false,
            default:'new'
        }
    });
    // console.log(ctx.request.body);
  
    const result = ctx.request.body;
    const info = await User.findOne({openid:result.openid})
    console.log(info);
    //添加新的动态
    await new Dynamic({
        openid: result.openid,
        dynamicText: result.dynamicText,
        dynamicImage: result.dynamicImage,
        publishTime: result.publishTime,
        dynamicType: result.dynamicType,
        username:info.nickName,
        avatarUrl:info.avatarUrl

    }).save();
    // 登录第五步：响应登录态给客户端
    ctx.status = 200;
    ctx.body = {
        message: '发布成功',
        openid: result.openid
    };


});
//获得所有的动态
router.get("/get_AllDynamic", async (ctx) => {

    const dynamic = await Dynamic.find();
    // 登录第五步：响应登录态给客户端
    ctx.status = 200;
    ctx.body = {
        dynamic

    };
});
//获得当前用户的动态
router.get("/get_dynamic", async (ctx) => {
    ctx.verifyParams({
        //把openid发过来
        username: "string",
    });
    const dynamic = await Dynamic.findOne({username:ctx.request.username});
    // 登录第五步：响应登录态给客户端
    ctx.status = 200;
    ctx.body = {
        dynamic

    };
});

module.exports = router;
