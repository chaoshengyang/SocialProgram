// miniprogram/pages/write/wtite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: null,
    noteMaxLen: 70,//备注最多字数
    info: "",
    noteNowLen: 0,//备注当前字数,
    //临时的图片地址
    imgList: [],
    //后台换取的真实的路径
    filePath: [],

    //话题那个元素的宽度
    themeWidth: null
  },

  //字数改变触发事件 
  bindTextAreaChange: function (e) {

    var that = this;
    var value = e.detail.value, len = parseInt(value.length);
    if (len > that.data.noteMaxLen) return;
    that.setData({ info: value, noteNowLen: len })
  },
  //提交数据 
  bindSubmit: function () {
    if (this.data.info === '') {
      wx.showToast({
        title: '请输入内容',
      })
      return;
    } else {
      wx.request({
        url: 'http://localhost:3000/api/dynamic/send_dynamic',
        data: {
          userid: this.data.userid,
          dynamicText: this.data.info,
          dynamicImage: this.data.filePath,
          publishTime: new Date().getTime(),
          dynamicType: this.data.theme ? this.data.theme.title : ''
        },
        method: "POST",
        success(res) {
          console.log(res);
          wx.showToast({
            title: '发布成功',
            duration: 2000,
            mask: true,

            success() {
              setTimeout(() => {
                wx.switchTab({
                  url: '../index/index',
                })
              }, 2000);

            }

          })

        }
      })
    }

  },
  //选择话题
  chooseTheme() {
    wx.navigateTo({
      url: "/pages/topicList/topicList?id=publish"
    })

  },
  //拉起图片
  addImgAction() {
    // 选择图片
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'], //指定压缩图或者原图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    })
      .then(result => {
          console.log(result);
        if (result.errMsg === "chooseImage:ok") {
          console.log(123);
          this.setData({ imgList: result.tempFilePaths });
          // 上传照片到服务器
         const imgs =  this.uploadImages('http://localhost:3000/api/dynamic/img/upload', result.tempFilePaths)
          imgs.then(res=>{
            const result = res.map(item => ( item.replace("\\","\/")))
            console.log(result);
            // http://localhost:3000/images/DVroaBwdQZDH12AWLLa_9OW6.jpg
            this.setData({
               imgList: result.map(item => ('http://localhost:3000' + item)),
               filePath:result
            })
            
          })
         
        }  
      })
  },
  //上传图片到服务器
  async uploadImages(url, filePaths = []) {
    //小程序只能一张一张图片传，所以用promise.all等所有图片都执行完返回
    
    const result = await Promise.all(
      filePaths.map(filePath => {
        return new Promise((resolve, reject) => {
          wx.uploadFile({
            filePath: filePath,
            name: 'images',
            url: url,
            success(res) {
              const {
                imagePath
              } = JSON.parse(res.data);
              resolve(imagePath);
            }
          })
        })
      })
    );
    return result;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ userid: options.userid })


  },
  onShow: function () {
    if (this.data.theme) {
      let query = wx.createSelectorQuery();
      query.select('.theme').boundingClientRect(rect => {
        let width = rect.width;
        this.setData({ themeWidth: Math.floor(width) })
      }).exec();
    }



  }

})

