const Router = require("koa-router");
const axios = require("axios");
const User = require("../model/user");


const router = new Router({ prefix: "/api/auth" });


router.post("/send_code", async (ctx) => {
  // 验证参数
  ctx.verifyParams({
    code: "string",
    nickName:"string",
    avatarUrl:"string"
  });
  // 登录第三步：将code，appid，appsecret发送给微信平台
  const appid = "wx3b664f9166c37500";
  const secret = "061ca2e0aa46f0d7bf1297a8425ebe89";
  const code = ctx.request.body.code;
  const body = ctx.request.body;
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
        message: "已经注册过",
        userid:user._id
      };
    } else {
      //新用户，需要注册
      const newUser = await new User({
         openid: result.data.openid,
         avatarUrl: body.avatarUrl,
         gender: body.gender,
         nickName: body.nickName,
         signature: body.signature,
         userLabel: body.userLabel,
         userProvince: body.userProvince,
         userCity: body.userCity,
         userPhone: body.userPhone,
         }).save();
        
      // 登录第五步：响应登录态给客户端
      ctx.status = 200;
      ctx.body = {
        message: "注册成功",
        userid:newUser._id
      };
    }
  } else {
    console.log("换取openid失败了");
  }
});

// 更新数据到数据库
router.post("/post_user_info", async (ctx) => {
  const userInfo = ctx.request.body;
  // 查询数据库
  const result = await User.findOne({ openid: userInfo.openid });
  // 数据库没有该用户信息
  if (!result) {
    const newUser = await new User({
      openid: userInfo.openid,
      avatarUrl: userInfo.avatarUrl,
      gender: userInfo.gender,
      nickName: userInfo.nickName,
      signature: userInfo.signature,
      userLabel: userInfo.userLabel,
      userProvince: userInfo.userProvince,
      userCity: userInfo.userCity,
    }).save();
    // 响应登录态给客户端注册成功
    ctx.status = 200;
    ctx.body = {
      message: "注册成功",
    };
  } else {
    // 数据库已经存在这条信息
    const updateUser = await User.updateOne(
      { openid: userInfo.openid },
      {
        avatarUrl: userInfo.avatarUrl ? userInfo.avatarUrl : result.avatarUrl,
        gender: userInfo.gender ? userInfo.gender : result.gender,
        nickName: userInfo.nickName ? userInfo.nickName : result.nickName,
        signature: userInfo.signature ? userInfo.signature : result.signature,
        userLabel: userInfo.userLabel ? userInfo.userLabel : result.userLabel,
        userProvince: userInfo.userProvince
          ? userInfo.userProvince
          : result.userProvince,
        userCity: userInfo.userCity ? userInfo.userCity : result.userCity,
        userPhone: userInfo.userPhone ? userInfo.userPhone : result.userPhone,
      }
    );
    ctx.status = 200;
    ctx.body = {
      message: "更新成功",
    };
  }
});

// 请求用户个人信息
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
