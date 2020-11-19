const Router = require('koa-router')
const Theme = require("../model/theme")
const router = new Router({prefix:'/api/theme'})

router.get("/themeList",async(ctx)=>{
    const result = await Theme.find()
    if(result){
        ctx.status = 200
        ctx.body = {
            message:'ok',
            data:result
        }
    }else{
        ctx.status = 404
        ctx.body = {
            message:'查询数据失败',
        }
    }
})
//获得具体哪一个话题
router.post("/getThemeListDetail",async(ctx)=>{
    ctx.verifyParams({
        id:"string"
    })
    const id = ctx.request.body.id
    const result = await Theme.findOne({_id:id})
    if(result){
        ctx.status = 200
        ctx.body = {
            message:'ok',
            data:result
        }
    }else{
        ctx.status = 404
        ctx.body = {
            message:'获取详情失败',
        }
    }
})

router.post("/deleteThemeList",async(ctx)=>{
    ctx.verifyParams({
        id:"string"
    })
    const id = ctx.request.body.id
    const result = await Theme.deleteOne({_id:id})
    if(result){
        ctx.status = 200
        ctx.body = {
            message:'ok',
        }
    }else{
        ctx.status = 404
        ctx.body = {
            message:'删除失败',
        }
    }
})

router.post("/addThemeList",async(ctx)=>{
    ctx.verifyParams({
        themeName: "string",
        themeImage: "string",
        themeDetail: "string", 
        isRecommend: "boolean",
        discussNum: "number",
        browseNum: "number"
    })
    const {themeName,themeImage,themeDetail,isRecommend,discussNum,browseNum} = ctx.request.body
    const result = await new Theme({themeName,themeImage,themeDetail,isRecommend,discussNum,browseNum}).save()
    if(result){
        ctx.status = 200
        ctx.body = {
            message:'ok',
        }
    }else{
        ctx.status = 404
        ctx.body = {
            message:'添加失败',
        }
    }
})

module.exports = router;