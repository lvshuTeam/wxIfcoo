
const app = getApp();
const host = app.globalData.host;

module.exports = (url = '', data = {}, type = 'GET') => {
    let headers = {};

    if (type == 'GET') {
        headers['content-type'] = 'application/json';
    } else {
        headers['content-type'] = 'application/x-www-form-urlencoded';
    }

    // 判断是否需要登录
    if (data.ticket) {
        let ticket = wx.getStorageSync('ticket');
        if (ticket) {
            data.__mt = ticket;
            delete data.ticket;
        } else {
            wx.navigateTo({
                url: `/pages/login/login`
            });
            return new Promise(function(resolve, reject) {
                reject(new Error(`${url} 接口需要登录，跳去登录`));
            });
        }
    }

    return new Promise(function(resolve, reject) {
        wx.request({
            url: host + url,
            method: type,
            data: data,
            header: headers,
            success: function(res) {
                console.log(res);
                console.log(`${url} 接口请求成功，状态码${res.statusCode}`);

                if (res.statusCode == 200) {
                    if (res.data.rescode == 1011) {
                        wx.navigateTo({
                            url: `/pages/login/login`
                        });
                        reject(res.data);
                    } else {
                        resolve(res.data);
                    }
                } else {
                    reject(res.data);
                }
            },
            fail: function(res) {
                console.log(`${url} 接口请求失败`);
                reject(res);
            }
        });
    });
}