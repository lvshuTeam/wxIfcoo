/**
 * WeToast by kiinlam
 * WeApp Toast add-ons
 * 微信小程序toast增强插件
 * Github: https://github.com/kiinlam/wetoast
 * LICENSE: MIT
 */
function WeToastClass() {

    // 构造函数
    function WeToast() {
        let pages = getCurrentPages();
        let curPage = pages[pages.length - 1];

        this.__page = curPage;
        this.__timeout = null;

        // 附加到page上，方便访问
        curPage.wetoast = this;

        return this;
    }

    // 切换显示/隐藏
    WeToast.prototype.toast = function(data) {
        try {
            if (!data) {
                this.hide();
            } else {
                this.show(data);
            }
        } catch (err) {
            // console.log('错误了');
            // console.error(err);

            // fail callback
            data && typeof data.fail === 'function' && data.fail(data);
        } finally {
            // complete callback
            data && typeof data.complete === 'function' && data.complete(data);
        }
    }

    // 显示
    WeToast.prototype.show = function(data) {
        // console.log(this);
        let page = this.__page;

        clearTimeout(this.__timeout);

        // display需要先设置为block之后，才能执行动画
        page.setData({
            '__wetoast__.reveal': true
        });

        setTimeout(() => {
            let animation = wx.createAnimation({
                timingFunction: 'ease',
                duration: 300
            });
            animation.opacity(1).translateY(-25).step();
            data.animationData = animation.export();
            data.reveal = true;
            page.setData({
                __wetoast__: data
            });
        }, 30);

        if (data.duration === 0) {
            // success callback after toast showed
            setTimeout(() => {
                typeof data.success === 'function' && data.success(data)
            }, 330)
        } else {
            this.__timeout = setTimeout(() => {
                // console.log('执行toast方法')
                this.toast()

                // success callback
                typeof data.success === 'function' && data.success(data)
            }, (data.duration || 1500) + 300)
        }

    }

    // 隐藏
    WeToast.prototype.hide = function() {
        // console.log('执行隐藏');
        let page = this.__page;

        clearTimeout(this.__timeout);
        // console.log(page.data.__wetoast__.reveal);

        if (!page.data.__wetoast__.reveal) {
            return;
        }

        let animation = wx.createAnimation({
            timingFunction: 'ease'
        });
        animation.opacity(0).step();
        page.setData({
            '__wetoast__.animationData': animation.export()
        });

        setTimeout(() => {
            page.setData({
                __wetoast__: {}
            })
        }, 400);
    }

    return new WeToast();
}

module.exports.WeToast = WeToastClass;