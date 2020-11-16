const Router = require("koa-router");
const axios = require("axios");
const User = require('../model/user');


const router = new Router({ prefix: "/api/auth" });

router.post("/send_code", async (ctx) => {
  // 验证参数
  ctx.verifyParams({
    code: "string",
  });
  // 登录第三步：将code，appid，appsecret发送给微信平台
  const appid = "wx3b664f9166c37500";
  const secret = "061ca2e0aa46f0d7bf1297a8425ebe89";
  const code = ctx.request.body.code;

  const result = await axios.get(
    `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
  );

  // 登录第四步：获得openid和session_key
  if (result.status === 200) {
    // 隐藏步骤：静默注册
    const user = await User.findOne({ openid: result.data.openid });
    if (user) {
      //老用户了
      ctx.status = 200;
      ctx.body = {
        message: '已经注册过',
        openid: result.data.openid
      };
    } else {
      //新用户，需要注册
      const newUser = await new User({ openid: result.data.openid }).save();
      // 登录第五步：响应登录态给客户端
      ctx.status = 200;
      ctx.body = {
        message: '注册成功',
        openid: result.data.openid
      };
    }



  }
  else {
    console.log('换取openid失败了');
  }

});

// router.get('/check_login', async(ctx)=>{
//   ctx.verifyParams({
//     token: 'string'
//   });
//   const result = JWT.verify(ctx.request.query.token, 'hello world');
//   const user = await User.findOne({openid: result.openid});
//   if(user){
//     ctx.status = 200;
//     ctx.body = {
//       message: '登录成功'
//     }
//   }else{
//     ctx.status = 401;
//     ctx.body = {
//       message: '登录过期,请重新登录'
//     }
//   }
// })

module.exports = router;
