// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class HeadIcon extends cc.Component {

    @property(cc.Sprite)
    icon = null;

    @property({
        type : [cc.SpriteFrame]
    })
    icons : cc.SpriteFrame[] = [];

    // onLoad () {}

    start() {

    }
    initSpriteFrameWithUrl(url) {
        var self = this;
        cc.loader.load(url, (error, texture) => {
            self.icon.spriteFrame = new cc.SpriteFrame(texture);
        })
    }
    initSpriteFrameWithIndex(index) {
        this.icon.spriteFrame = this.icons[index];
    }
    // update (dt) {}
}
