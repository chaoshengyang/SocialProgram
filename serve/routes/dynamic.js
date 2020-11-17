const Router = require("koa-router");
const Dynamic = require('../model/dynamic');


const router = new Router({ prefix: "/api/dynamic" });

router.post("/send_dynamic", async (ctx) => {
    // 验证参数
    ctx.verifyParams({
        //把openid发过来
        username: "string",
        dynamicText: "string",
        dynamicImage: "array",
        publishTime: "number",
        dynamicType: "string"
    });

    //添加新的动态
    await new User({
        username: result.data.username,
        dynamicText: result.data.dynamicText,
        dynamicImage: result.data.dynamicImage,
        publishTime: result.data.publishTime,
        dynamicType: result.data.dynamicType,

    }).save();
    // 登录第五步：响应登录态给客户端
    ctx.status = 200;
    ctx.body = {
        message: '发布成功',
        openid: result.data.openid
    };


});
//获得所有的动态
router.post("/get_AllDynamic", async (ctx) => {

    const dynamic = await Dynamic.find();
    // 登录第五步：响应登录态给客户端
    ctx.status = 200;
    ctx.body = {
        dynamic

    };
});
//获得当前用户的动态
router.post("/get_dynamic", async (ctx) => {
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
