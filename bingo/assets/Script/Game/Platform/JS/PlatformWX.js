// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

module.exports = {
    getUserInfo(cb) {
        wx.getUserInfo({
            success: function (res) {
                console.log('获取玩家信息成功');
                console.log(res)
                cb(null, res);
            },
            fail: function () {
                console.log('获取玩家信息出错');
                cb("wx:getUserInfo_fail", null);
            }
        })
    },
    init() {
        var self = this;
        wx.showShareMenu();
        //获取微信授权
        wx.getSetting({
            success: (res) => {
                console.log("获取微信授权：", res);
                if (res.authSetting["scope.userInfo"] == false) {
                    wx.openSetting({

                    })
                }
            }
        });
        /** 点击左上角-》转发 分享出去的内容 回调函数*/
        wx.onShareAppMessage(() => {
            //let shareData = gameApiCallback.shareButtonInfo();

            return {
                title: '猫鼠大战一触即发，谁是最终王者！',
                imageUrl: 'images/share.png',
                success: (res) => {
                    
                }
            };

        });

        //onshow 也可能点击分享消息进入游戏
        wx.onShow(res => {
            var query = res.query;
            console.log("wx.onShow:", res);
            if (query != undefined && query['inviterId'] != undefined) {
                console.log("点击分享进入");
            }
            else {
                let entryGameSourceOnShow = {};
                entryGameSourceOnShow['res'] = res; //所有数据
                console.log("自己进入");
            }
        });
    },
    share(cb) {
        var self = this;
        wx.shareAppMessage({
            // title: shareData.title,
            // imageUrl: shareData.imageUrl,
            // query: shareData.query,
            title: '猫鼠大战一触即发，谁是最终王者！',
            imageUrl: 'images/share.png',
            success: (res) => {
                if (cb) {
                    cb();
                }
            }
        });
    },
    shareShortCutImage(cb) {
        //截屏图片
        var canvas = cc.game.canvas;
        var width = cc.winSize.width;
        var height = cc.winSize.height;
        var self = this;
        canvas.toTempFilePath({
            x: 0,
            y: height * 0.25,
            width: width,
            height: width * 4 / 5,
            destWidth: width,
            destHeight: width * 4 / 5,
            success(res) {
                console.log(res)
                wx.shareAppMessage({
                    title: '好学生就是我，成语量超过了80%的微信好友。',
                    imageUrl: res.tempFilePath,
                    success: (res) => {
                        if (cb) {
                            cb();
                        }
                    }
                })
            }
        })
    },
    rank() {

    },
    updateScore(score) {
        window.wx.postMessage({
            messageType: 3,
            MAIN_MENU_NUM: "x1",
            score: score,
        });
    },
}
