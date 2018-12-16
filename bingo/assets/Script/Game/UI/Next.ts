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

import Platform from "../Platform/Platform"

@ccclass
export default class Next extends cc.Component {

    @property(cc.Prefab)
    userManager = null;
    user = null;

    @property(cc.Node)
    successNode = null;
    @property(cc.Node)
    failureNode = null;
    @property(cc.Label)
    scroeLabel = null;

    callback: () => void = null

    // onLoad () {}

    start() {

    }

    setData(isSuccess) {
        if (isSuccess) {
            this.successNode.opacity = 255;
            this.failureNode.opacity = 0;
            // this.user = cc.instantiate(this.userManager).getComponent('UserManager');
            // var mode = this.user.getGameMode();
            // var totalScore = this.user.getTotalScore();
            // var scroe = 0;
            // if (mode == "0") {
            //     scroe = 10;
            //     this.scroeLabel.string = "获得：" + scroe + "学分";
            // } else if (mode == "1") {
            //     scroe = 25;
            //     this.scroeLabel.string = "获得：" + scroe + "学分";
            // } else if (mode == "2") {
            //     scroe = 50;
            //     this.scroeLabel.string = "获得：" + scroe + "学分";
            // }
            // totalScore += scroe;
            // this.user.setTotalScore(totalScore);
        } else {
            this.successNode.opacity = 0;
            this.failureNode.opacity = 255;
        }
    }

    closeSelfAction(event) {
        this.successNode.opacity = 0;
        this.failureNode.opacity = 0;
        this.node.setPosition(1407, 480);
    }

    shareAction(event) {
        var self = this;
        Platform.share(1, () => {
            if (self.callback) {
                self.callback();
            }
            self.successNode.opacity = 0;
            self.failureNode.opacity = 0;
            self.node.setPosition(1407, 480);
        });
    }
    // update (dt) {}
}
