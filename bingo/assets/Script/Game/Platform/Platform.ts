// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import * as PlatformWX from "./js/platformWX"

export default class Platform {
    /**
    * 获取wx用户信息
    */
    static getUserInfo(cb): void {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            PlatformWX.getUserInfo(cb);
        }
    }
    /**
    * wx信息初始化
    */
    static init(): void {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            PlatformWX.init();
        }
    }
    /**
    * 游戏内主动分享
    * @param type //type == 0默认分享，type == 1分享截屏
    * @param cb //error 分享回调
    */
    static share(type, cb): void {
        //PlatformApi.PlatformJS().share(shaerData);
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if (type == 1) {
                PlatformWX.shareShortCutImage(cb);
            } else {
                PlatformWX.share(cb);
            }
        }
    }
    /**
    * rank
    */
    static rank() {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            PlatformWX.rank();
        }
    }
    /**
    * updateScore
    */
   static updateScore(score) {
    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        PlatformWX.updateScore(score);
    }
}
}
