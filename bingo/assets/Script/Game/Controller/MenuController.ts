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
export default class MenuController extends cc.Component {

    @property(cc.Prefab)
    localDataManager = null;
    @property(cc.Prefab)
    userManager = null;
    user = null;

    @property(cc.Label)
    lvLabel = null;
    @property(cc.ProgressBar)
    progress = null;
    @property(cc.Sprite)
    bar = null;
    @property(cc.Label)
    powerLabel = null;
    @property(cc.Label)
    moneyLabel = null;

    localData = null;
    rankData = null;

    onLoad() {
        this.user = cc.instantiate(this.userManager).getComponent('UserManager');

        Platform.getUserInfo((error, data) => {
            if (error == null && data.userInfo != undefined) {
                const userInfo = data.userInfo;
                this.user.setUserInfo([userInfo.nickName, userInfo.avatarUrl]);
            }
        })
        Platform.init();
        // this.localData = cc.instantiate(this.localDataManager).getComponent('LocalDataManager');
        // this.localData.parseRank(this.getLvAndScroe, this);
        this.getLvAndScroe();
    }

    start() {

    }

    getLvAndScroe() {
        // this.rankData = this.localData.rankData;

        var lv = this.user.getLv();
        var progress = this.user.getProgress();
        var power = this.user.getPower();
        var money = this.user.getMoney();

        //初始化新手引导，
        //两步必须都完成，否则重置到最初阶段
        // if (!this.user.getIsShowGuide0() || !this.user.getIsShowGuide1()) {
        //     this.user.initGuide();
        // }

        // var rank = this.rankData[lv];
        // var rank_arr = rank.split(',');
        // if (rank_arr.length >= 2) {
        //     var s = "";
        //     if (score < 60) {
        //         s = "学渣";
        //     } else if (60 <= score && score < 90) {
        //         s = "学霸";
        //     } else {
        //         s = "学神";
        //     }
        //     this.lvLabel.string = rank_arr[1] + "  " + s;
        // }
        // this.scoreLabel.string = score;
        // this.scoreLabel.active = false;

        this.lvLabel.string = lv;
        let progressBar = this.progress.getComponent(cc.ProgressBar);
        if (progress > 0.9) {
            this.bar.type = cc.Sprite.Type.SLICED;
        } else {
            this.bar.type = cc.Sprite.Type.TILED;
        }
        progressBar.progress = progress;
        this.powerLabel.string = power;
        this.moneyLabel.string = money;
    }

    addPowerAction() {
        this.addPower();
    }

    beginAction() {
        cc.director.loadScene("PlayScene");
    }

    rankAction() {
        cc.director.loadScene('RankScene');
    }

    shareAction() {
        this.addPower();
    }

    addPower() {
        var self = this;
        Platform.share(0, () => {
            var power = parseInt(self.user.getPower());
            power += 2;
            self.user.setPower(power);
            self.powerLabel.string = power;
        });
    }
    // update (dt) {}
}
