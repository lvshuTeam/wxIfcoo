const { WeToast } = require('components/toast/toast.js');

App({
    // onLaunch: function() {
    //     // 获取用户授权信息
    //     if (wx.getSetting) {
    //         wx.getSetting({
    //             success: res => {
    //                 // 需要获取用户信息
    //                 if (!res.authSetting['scope.userInfo']) {
    //                     const getUserInfo = () => {
    //                         wx.getUserInfo({
    //                             success: res => {
    //                                 this.globalData.userInfo = res.userInfo;
    //                             },
    //                             fail: res => {
    //                                 wx.showModal({
    //                                     title: '登录失败',
    //                                     content: '小程序需要您的授权才能提供更好的服务哦~',
    //                                     showCancel: false,
    //                                     confirmText: '知道了',
    //                                     success: function(res) {
    //                                         if (res.confirm) {
    //                                             console.log('用户点击确定');
    //                                             wx.openSetting({
    //                                                 success: (res) => {
    //                                                     if (res.authSetting['scope.userInfo']) {
    //                                                         console.log('授权成功');
    //                                                     } else {
    //                                                         console.log('授权失败');
    //                                                     }
    //                                                     getUserInfo();
    //                                                 }
    //                                             });
    //                                         }
    //                                     }
    //                                 })
    //                             }
    //                         });
    //                     }

    //                     getUserInfo();
    //                 } else {
    //                     wx.getUserInfo({
    //                         success: res => {
    //                             this.globalData.userInfo = res.userInfo;
    //                         }
    //                     });
    //                 }
    //             }
    //         });
    //     } else {
    //         wx.showModal({
    //             title: '提示',
    //             content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    //         });
    //     }
    // },
    globalData: {
        userInfo: null,
        code: '',
        //host: 'https://ifcoo.ileehoo.com',
        host:' https://demo.ifcoo.com'
    },
    WeToast
});