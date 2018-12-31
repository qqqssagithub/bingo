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

    onLoad() {
        this.user = cc.instantiate(this.userManager).getComponent('UserManager');
    }

    start() {

    }

    setData(isSuccess) {
        if (isSuccess) {
            this.successNode.active = true;
            this.failureNode.active = false;
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
            this.successNode.active = false;
            this.failureNode.active = true;
        }
    }

    closeSelfAction(event) {
        var power = parseInt(this.user.getPower());
        power += 2;
        this.user.setPower(power);
        var money = parseInt(this.user.getMoney());
        money += 100;
        this.user.setMoney(money);

        this.successNode.active = false;
        this.failureNode.active = false;
        this.node.active = false;
        if (this.callback) {
            this.callback();
        }
    }

    shareAction(event) {
        var self = this;
        Platform.share(1, () => {
            var power = parseInt(this.user.getPower());
            power += 2 * 2;
            this.user.setPower(power);
            var money = parseInt(this.user.getMoney());
            money += 100 * 2;
            this.user.setMoney(money);

            self.successNode.active = false;
            self.failureNode.active = false;
            self.node.active = false;
            if (self.callback) {
                self.callback();
            }
        });
    }
    // update (dt) {}
}
