// pages/topicList/topList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      // {
      //   img:"../../img/touxiang.jpg",
      //   title:"#我们大家庭#",
      //   content:"升学的老师们，你们辛苦了升学的老师们，你们辛苦了",
      //   isRecommend: true,
      //   discussion:100258,
      //   browse:100258
      // },
      // {
      //   img:"../../img/touxiang.jpg",
      //   title:"#我们大家庭#",
      //   content:"升学的老师们，你们辛苦了升学的老师们，你们辛苦了",
      //   isRecommend: false,
      //   discussion:100258,
      //   browse:100258
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://localhost:3000/api/theme/themeList',
      method:"GET",
      success: (res)=>{
        console.log(res.data.data)
        this.setData({list:res.data.data})
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