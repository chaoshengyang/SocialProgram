const Router = require("koa-router");
const Discuss = require("../model/discuss");
const Dynamic = require('../model/dynamic')
const User = require("../model/user");
const Theme = require("../model/discussTheme");

const router = new Router({ prefix: "/api/discuss" });

router.post("/send_discuss", async (ctx) => {
  // 验证参数
  // console.log(ctx.request.body);

  const result = ctx.request.body;
  // console.log(result);
//   const info = await User.findOne({ openid: result.openid });

  // 存放数据
  const data = await new Discuss({
    publisher: result.user_id,
    dynamic: result._id,
    discussMsg: result.discussText,
    discussTime:Date.now(),
  }).save();

  if(data){
      // 响应客户端
    ctx.status = 200;
    ctx.body = {
        message: "评论成功",
    };
  }else{
      // 响应客户端
    ctx.status = 404;
    ctx.body = {
        message: "评论失败",
    };
  }
});

//获得动态所有评论
router.get("/get_dynamic_discuss", async (ctx) => {
    // 验证参数
  ctx.verifyParams({
    //动态id
    _id: "string",

  });

//   console.log(ctx.query);
  const result = await Discuss.find({dynamic:ctx.query._id});
  if(result){
      ctx.status = 200;
      ctx.body = result;
  }
});



module.exports = router;
