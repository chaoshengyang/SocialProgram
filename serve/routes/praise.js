const Router = require("koa-router");
const Praise = require("../model/praise");
const User = require("../model/user");

const router = new Router({ prefix: "/api/praise" });

router.post("/send_praise", async (ctx) => {
  const result = ctx.request.body;
  // console.log(result);
  // const info = await User.findOne({ openid: result.openid });

  // 判断用户是否赞赏过
  const isPraise = await Praise.findOne({ dynamic: result._id });
  console.log(isPraise);
  if (isPraise) {
    ctx.status = 200;
    ctx.body = {
      message: "已经赞过了",
    };
  } else {
    // 存放数据
    const data = await new Praise({
      publisher: result.user_id,
      dynamic: result._id,
      praiseTime: Date.now(),
    }).save();

    if (data) {
      // 响应客户端
      ctx.status = 200;
      ctx.body = {
        message: "点赞成功",
      };
    } else {
      // 响应客户端
      ctx.status = 404;
      ctx.body = {
        message: "点赞失败",
      };
    }
  }
});

//获得赞赏详细信息
router.get("/get_dynamic_praise", async (ctx) => {
  // 验证参数
  ctx.verifyParams({
    //动态id
    _id: "string",
  });
  //   console.log(ctx.query);
  const result = await Praise.find({ dynamic: ctx.query._id });
  if (result) {
    ctx.status = 200;
    if(ctx.query.detail){
      ctx.body = result;
    }else{
      ctx.body = {
        message:"请求赞赏成功",
        num:result.length
      }
    }
  }else{
    ctx.status = 200;
    ctx.body = {
      message:"暂无赞赏"
    }
  }
});

module.exports = router;
