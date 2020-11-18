const Router = require("koa-router");
const Dynamic = require('../model/dynamic');
const User = require("../model/user");
const Theme = require("../model/discussTheme")

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
            default:'我们大家庭'

        },
       
        themeAbout:{
            type:"string",
            required:false,
            default:"none"
        },
        discussID:{
            type:"array",
            required:false,
            default:[],
        },
        praiseID:{
            type:"array",
            required:false,
            default:[],
        },


        }
    });
    // console.log(ctx.request.body);
  
    const result = ctx.request.body;

    // console.log(result);
    const info = await User.findOne({openid:result.openid});

    const theme = await Theme.findOne({themeName:result.themeName?result.themeName:"none"});
    //添加新的动态
    await new Dynamic({
        openid: result.openid,
        dynamicText: result.dynamicText,
        dynamicImage: result.dynamicImage,
        publishTime: result.publishTime,
        dynamicType: result.dynamicType?result.dynamicType:'none',
        // 发布者的_id
        //publisher:info._id,

        // 话题的_id
        //themeAbout:theme._id,
         username:info.nickName,
        avatarUrl:info.avatarUrl
    }).save();
    // 响应客户端

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
    ctx.status = 200;
    ctx.body = {
        dynamic

    };
});

//获得当前用户的动态
router.get("/get_dynamic", async (ctx) => {
    ctx.verifyParams({
        //把openid发过来

        openid: "string",
    });
    const dynamic = await Dynamic.find({openid:ctx.request.openid});



   // const dynamic = await Dynamic.findOne({username:ctx.request.username});

    // 登录第五步：响应登录态给客户端
    ctx.status = 200;
    ctx.body = {
        dynamic

    };
});

module.exports = router;
