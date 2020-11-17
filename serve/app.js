const Koa = require("koa");
const error = require("koa-json-error");
const parameter = require("koa-parameter");
// const bodyparser = require("koa-bodyparser");
const auth = require("./routes/auth");

const theme = require("./routes/theme")


const dynamic = require('./routes/dynamic')


const app = new Koa();

// 处理错误
app.use(
  error({
    postFormat(error, { stack, ...rest }) {
      return rest;
    },
  })
);
//处理POST参数, 
app.use(async (ctx, next)=>{
  await new Promise((resolve,reject)=>{
      let data = '';
      ctx.req.on('data',(bf)=>{
          data += bf;
      });
      ctx.req.on('end',()=>{
       
          //传了参数才解析参数,处理JSON参数
          data&&(ctx.request.body = JSON.parse(data));
          resolve();
      });
  })
  await next(); 
})

// 解析参数
// app.use(bodyparser());




// 验证参数
parameter(app);

// 使用路由
//用户
app.use(auth.routes()).use(auth.allowedMethods());

app.use(theme.routes()).use(theme.allowedMethods())

app.use(dynamic.routes()).use(dynamic.allowedMethods());



module.exports = app;
