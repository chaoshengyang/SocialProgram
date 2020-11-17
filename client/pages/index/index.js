// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList:[],
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
     
  },

  
})

