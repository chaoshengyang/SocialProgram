// pages/topicList/topList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    fromPage: ''
  },
  goDetail(options) {
    if (this.data.fromPage == 'publish') {
      console.log(123);
      wx.navigateBack({
        url: '../write/write'
      })
    } else {
      var id = options.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/topicDetail/topicDetail?id=' + id,
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ fromPage: options.id });
    console.log(options);
    
  

    wx.request({
      url: 'http://localhost:3000/api/theme/themeList',
      method: "GET",
      success: (res) => {
        // console.log(res);

        this.setData({ list: res.data.data })
      }
    })
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
    // console.log(this);
    console.log(this.data.fromPage === 'publish');
    
    if (this.data.fromPage == 'publish') {
      console.log(123);
      
      wx.setNavigationBarTitle({
        title: "选择话题"
      })
    }else{
      wx.setNavigationBarTitle({
        title: "话题广场"
      })
    }
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