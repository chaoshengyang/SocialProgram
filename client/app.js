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
    userid: null
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
                        wx.setStorageSync('userid', res.data.userid)
                       
                     
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
  },

  //计算具体时间
  changeDate: function formatDate(type="Y-M-D H-M", time) {
    function addZero(num, len, str, location) {
      if (location === void 0) { location = "before"; }
      //传入位数,自动补零
      len = len - num.toString().length;
      var tmp = "";
      for (var i = 0; i < len; i++) {
          tmp += location === "before" ? str + num : num + str;
      }
      return tmp || num + "";
  }
    if (time === void 0) { time = Date.now(); }
    var date = new Date(time);
    var year = date.getFullYear();
    var month = addZero(date.getMonth() + 1);
    var day = addZero(date.getDate());
    var hour = addZero(date.getHours());
    var minute = addZero(date.getMinutes());
    var second = addZero(date.getSeconds());
    switch (type) {
        case "Y-M-D H-M":
            return (year +
                "/" +
                month +
                "/" +
                day +
                " " +' '+
                hour +
                ":" +
                minute
                
              );
       
        default:
            return "";
    }
},
  //时间戳转换为几分，小时之前
    handleDate(dateTimeStamp) {
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var result = '';
      var now = new Date().getTime();
      var diffValue = now - dateTimeStamp;
      if (diffValue < 0) {
        console.log("时间不对劲,服务器创建时间与当前时间不同步");
        return result = "刚刚";
      }
      var dayC = diffValue / day;
      var hourC = diffValue / hour;
      var minC = diffValue / minute;
      if(Math.floor(dayC) > 1) {
        result = this.changeDate(dateTimeStamp);
      }else if (Math.floor(dayC) == 1) {
        result = "昨天";
      } else if (hourC >= 1) {
        result = "" + Math.floor(hourC) + "小时前";
      } else if (minC >= 5) {
        result = "" + Math.floor(minC) + "分钟前";
      } else
        result = "刚刚";
      return result;
    },
})
