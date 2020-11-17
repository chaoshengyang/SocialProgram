App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */

  onLaunch: function () {
      this.requestData()
  },
  globalData: {
    username: null,
    picUrl: null,
    openid: null
  },
  requestData() {
    wx.getSetting({
      success: (res) => {
        //已授权
        if (res.authSetting["scope.userInfo"]) {
          console.log('已授权');
          wx.getUserInfo({
            lang: "zh_CN",
            success: (result) => {
              wx.setStorageSync('username', result.userInfo.nickName)
              wx.setStorageSync('picUrl', result.userInfo.avatarUrl)
              wx.login({
                success: (res) => {
                  if (res.code) {
                    //发起网络请求
                    wx.request({
                      url: 'http://localhost:3000/api/auth/send_code',
                      data: {
                        code: res.code,
                        nickName:result.userInfo.nickName,
                        avatarUrl:result.userInfo.avatarUrl
                      },
                      method: "POST",
                      success: (res) => {
                        wx.setStorageSync('openid', res.data.openid)
                       
                     
                      }
                    })
                  }
                }
              })
            }
          })
      

        }
      }
    })
  }
})
