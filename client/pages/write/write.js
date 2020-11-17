// miniprogram/pages/write/wtite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteMaxLen: 70,//备注最多字数
    info: "",
    noteNowLen: 0,//备注当前字数,
    //临时的图片地址
    imgList: [],
    //fileID数组
    fileIdList:[],
    //id换取的真实的路径
    filePath:[]
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
        title: '请输入内容(200字以内)...',
      })
      return;
    } else {
 
    }

  },
  //拉起图片
  addImgAction() {
    // 选择图片
    // wx.chooseImage({
    //   count: 3,
    //   sizeType: ['original', 'compressed'], //指定压缩图或者原图
    //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    // })
    //   .then(data => {
    //     console.log(data.tempFilePaths);
    //     this.setData({ imgList: data.tempFilePaths })
    //   })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


})
