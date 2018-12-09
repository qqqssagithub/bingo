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
export default class MenuController extends cc.Component {

    @property(cc.Prefab)
    localDataManager = null;
    @property(cc.Prefab)
    userManager = null;

    @property(cc.Label)
    lvLabel = null;
    @property(cc.Label)
    scoreLabel = null;

    localData = null;
    rankData = null;

    onLoad() {
        this.localData = cc.instantiate(this.localDataManager).getComponent('LocalDataManager');
        this.localData.parseRank(this.getLvAndScroe, this);
    }

    start() {

    }

    getLvAndScroe() {
        this.rankData = this.localData.rankData;
        var user = cc.instantiate(this.userManager).getComponent('UserManager');
        var lv = user.getLv();
        var score = user.getScore();

        //初始化新手引导，
        //两步必须都完成，否则重置到最初阶段
        if (!user.getIsShowGuide0() || !user.getIsShowGuide1()) {
            user.initGuide();
        }

        var rank = this.rankData[lv];
        var rank_arr = rank.split(',');
        if (rank_arr.length >= 2) {
            var s = "";
            if (score < 60) {
                s = "学渣";
            } else if (60 <= score && score < 90) {
                s = "学霸";
            } else {
                s = "学神";
            }
            this.lvLabel.string = rank_arr[1] + "  " + s;
        }
        this.scoreLabel.string = score;
    }

    beginAction() {
        cc.director.loadScene("PlayScene");
    }

    rankAction() {

    }

    // update (dt) {}
}
