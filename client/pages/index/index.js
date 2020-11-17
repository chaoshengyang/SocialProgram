// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    username: '',
    picUrl: '',
    msgList: [],
    tabCur: 1, //默认选中
    tabs: [{
      name: '精华',
      id: 0
    },
    {
      name: '最新',
      id: 1
    },
    {
      name: '关注',
      id: 2
    },


    ]
  },
  //切换顶部导航
  tabSelect(e) {
    this.setData({
      tabCur: e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'username',
      success: (res) => {
        this.setData({ username: res.data })
      }
    })
    wx.getStorage({
      key: 'picUrl',
      success: (res) => {
        this.setData({ picUrl: res.data })
      }
    })
    wx.getStorage({
      key: 'openid',
      success: (res) => {
        this.setData({ openid: res.data })
      }
    })
    this.requestData()
  },
  //返回首页再请求一次
  onShow:function(){
    this.requestData()
  },
  requestData() {
    wx.request({
      url: 'http://localhost:3000/api/dynamic/get_AllDynamic',
      method: "GET",
      success(res) {
        console.log(res);
      }
    })
  }

})

