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
export default class UserManager extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    initGuide() {
        cc.sys.localStorage.removeItem('showGuide0')
        cc.sys.localStorage.removeItem('showGuide1')
    }
    setIsShowGuide0(showGuide0) {
        cc.sys.localStorage.setItem('showGuide0', showGuide0);
    }
    setIsShowGuide1(showGuide1) {
        cc.sys.localStorage.setItem('showGuide1', showGuide1);
    }
    getIsShowGuide0() {
        return cc.sys.localStorage.getItem('showGuide0');
    }
    getIsShowGuide1() {
        return cc.sys.localStorage.getItem('showGuide1');
    }

    setTotalScore(totalScore) {
        cc.sys.localStorage.setItem('totalScore', totalScore);
    }
    getTotalScore() {
        var totalScore = "0";
        let value = cc.sys.localStorage.getItem('totalScore');
        if (value != null && value != undefined && value != "") {
            totalScore = value;
        }
        //return "193";
        return parseInt(totalScore);
    }

    getLv() {
        var totalScore = this.getTotalScore();
        return Math.floor(totalScore / 100);
    }
    getScore() {
        var totalScore = this.getTotalScore();
        return totalScore % 100;
    }

    setHelpCount(count) {
        cc.sys.localStorage.setItem('helpCount', count);
    }
    getHelpCount() {
        var count = "0";
        let value = cc.sys.localStorage.getItem('helpCount');
        if (value != null && value != undefined && value != "") {
            count = value;
        }
        return count;
    }

    setGameMode(mode) {
        cc.sys.localStorage.setItem('gameMode', mode);
    }
    getGameMode() {
        var mode = "0";
        let value = cc.sys.localStorage.getItem('gameMode');
        if (value != null && value != undefined && value != "") {
            mode = value;
        }
        return mode;
    }
    // update (dt) {}
}
