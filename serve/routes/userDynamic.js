const Router = require("koa-router");
const axios = require("axios");
const User = require('../model/user');


const router = new Router({ prefix: "/api/auth" });

// 请求用户动态信息
router.get("/get_user_info",async (ctx)=>{
    // 验证参数
    ctx.verifyParams({
      openid: "string",
    });

    // console.log(ctx.query);
    const openid = ctx.query.openid
    // 查询数据库
    const result = await User.findOne({openid})
    if(!result){
      ctx.status = 409;
      ctx.body = {
        message:'没有该用户信息，请先注册'
      }
    }
    ctx.status = 200;
    ctx.body = result;
})

module.exports = router;
