"use strict";
cc._RF.push(module, '14c93yd40tBoZh6/TGW8nPX', 'Platform');
// Script/Game/Platform/Platform.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var PlatformWX = require("./js/platformWX");
var Platform = /** @class */ (function () {
    function Platform() {
    }
    /**
    * 获取wx用户信息
    */
    Platform.getUserInfo = function (cb) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            PlatformWX.getUserInfo(cb);
        }
    };
    /**
    * wx信息初始化
    */
    Platform.init = function () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            PlatformWX.init();
        }
    };
    /**
    * 游戏内主动分享
    * @param type //type == 0默认分享，type == 1分享截屏
    * @param cb //error 分享回调
    */
    Platform.share = function (type, cb) {
        //PlatformApi.PlatformJS().share(shaerData);
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if (type == 1) {
                PlatformWX.shareShortCutImage(cb);
            }
            else {
                PlatformWX.share(cb);
            }
        }
    };
    /**
    * rank
    */
    Platform.rank = function () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            PlatformWX.rank();
        }
    };
    /**
    * updateScore
    */
    Platform.updateScore = function (score) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            PlatformWX.updateScore(score);
        }
    };
    return Platform;
}());
exports.default = Platform;

cc._RF.pop();