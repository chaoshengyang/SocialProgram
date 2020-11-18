// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isLogin:false,
      nickName:'',
      picUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkRight()
  },
  checkRight() {
    wx.getSetting({
      success :(res)=> {
        //已授权
        if(res.authSetting["scope.userInfo"]){
          console.log(res); 
          this.setData({isLogin:true});
          //检查是否注册过
          this.checkRegist()
        }
       
      }
    })
  
  },
  checkRegist(){
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://localhost:3000/api/auth/send_code',
            data: {
              code: res.code
            },
            method: "POST",
            success(res) {
              console.log(res);

            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  //点击授权按钮
  registerAction(res) {
    //检查是否授权
    console.log(res);
    
    //点击授权
   if(res.detail.errMsg=="getUserInfo:ok"){
     this.setData({isLogin:true});

    //  宝平补充代码
    // 提交数据库
    
   }
  }

})