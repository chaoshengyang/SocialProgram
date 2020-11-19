// pages/dynamicDetails/dynamicDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dynamic:{},
    comment:[
      {
        avatarUrl:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=640059019,2904917246&fm=26&gp=0.jpg",
        username:"可可爱爱",
        replyContent:'道可道，非常道；名可名，非常名。无名，天地之始，有名，万物之母。',
        publishTime:'2019/04/16',
        praiseNum:34,
        replyNum:34
      },
      {
        avatarUrl:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=640059019,2904917246&fm=26&gp=0.jpg",
        username:"可可爱爱",
        replyContent:'道可道，非常道；名可名，非常名。无名，天地之始，有名，万物之母。',
        publishTime:'2019/04/16',
        praiseNum:34,
        replyNum:34
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (id) {
    wx.request({
      url: 'http://localhost:3000/api/dynamic/getDynamicDetail',
      data:id,
      method:'POST',
      success:(res)=>{
        this.setData({dynamic:res.data.dynamic})
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