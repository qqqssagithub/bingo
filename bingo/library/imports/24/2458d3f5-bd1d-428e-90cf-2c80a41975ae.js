"use strict";
cc._RF.push(module, '2458dP1vR1CjpDPLICkGXWu', 'RankControllerJS');
// Script/Game/Controller/RankControllerJS.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
    properties: {
        rankView: cc.Sprite //显示排行榜
    },
    onLoad: function onLoad() {},
    start: function start() {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            this.tex = new cc.Texture2D();
            window.sharedCanvas.width = 540;
            window.sharedCanvas.height = 960;
            window.wx.postMessage({
                messageType: 1,
                MAIN_MENU_NUM: "x1"
            });
        }
    },

    // 刷新子域的纹理
    _updateSubDomainCanvas: function _updateSubDomainCanvas() {
        if (window.sharedCanvas != undefined) {
            this.tex.initWithElement(window.sharedCanvas);
            this.tex.handleLoadedTexture();
            this.rankView.spriteFrame = new cc.SpriteFrame(this.tex);
        }
    },
    update: function update() {
        this._updateSubDomainCanvas();
    },
    backAction: function backAction() {
        cc.director.loadScene('MenuScene');
    }
});

cc._RF.pop();