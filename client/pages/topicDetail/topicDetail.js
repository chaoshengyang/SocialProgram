// pages/topicDetail/topicDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topicObj:{},
    topicList:[
      {
        userName:"zhangsan",
        userImage:"",
        date:"2小时前",
        main:"道可道，非常道，名可名，非常名。道可道，非常道，名可名，非常名。道可道，非常道，名可名，非常名。",
        thumbsCount:34,
        commentCount:34,
        sharCount:34
      },
      {
        userName:"zhangsan",
        userImage:"",
        date:"2小时前",
        main:"道可道，非常道，名可名，非常名。道可道，非常道，名可名，非常名。道可道，非常道，名可名，非常名。",
        thumbsCount:34,
        commentCount:34,
        sharCount:34
      },
      {
        userName:"zhangsan",
        userImage:"",
        date:"2小时前",
        main:"道可道，非常道，名可名，非常名。道可道，非常道，名可名，非常名。道可道，非常道，名可名，非常名。",
        thumbsCount:34,
        commentCount:34,
        sharCount:34
      },
      {
        userName:"zhangsan",
        userImage:"",
        date:"2小时前",
        main:"道可道，非常道，名可名，非常名。道可道，非常道，名可名，非常名。道可道，非常道，名可名，非常名。",
        thumbsCount:34,
        commentCount:34,
        sharCount:34
      }
    ]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (id) {
    wx.request({
      url: 'http://localhost:3000/api/theme/getThemeListDetail',
      data:id,
      method:'POST',
      success:(res)=>{
        this.setData({topicObj:res.data.data})
        wx.setNavigationBarTitle({
          title: "#"+this.data.topicObj.themeName + "#"
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})