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

import Platform from "../Game/Platform/Platform"

@ccclass
export default class UserManager extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    setDay(day) {
        cc.sys.localStorage.setItem('day', day);
    }
    getDay() {
        var day = "-1";
        let value_day = cc.sys.localStorage.getItem('day');
        if (value_day != null && value_day != undefined && value_day != "") {
            day = value_day;
        }
        return parseInt(day);
    }

    setUserInfo(info) {
        if (info.length == 2) {
            cc.sys.localStorage.setItem('nickName', info[0]);
            cc.sys.localStorage.setItem('avatarUrl', info[1]);
        }
    }
    getUserInfo() {
        var nickName = "";
        let value_nickName = cc.sys.localStorage.getItem('nickName');
        if (value_nickName != null && value_nickName != undefined && value_nickName != "") {
            nickName = value_nickName;
        }
        var avatarUrl = "";
        let value_avatarUrl = cc.sys.localStorage.getItem('avatarUrl');
        if (value_avatarUrl != null && value_avatarUrl != undefined && value_avatarUrl != "") {
            avatarUrl = value_avatarUrl;
        }
        return [nickName, avatarUrl];
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
        Platform.updateScore(totalScore);
        cc.sys.localStorage.setItem('totalScore', totalScore);
    }
    getTotalScore() {
        var totalScore = "0";
        let value = cc.sys.localStorage.getItem('totalScore');
        if (value != null && value != undefined && value != "") {
            totalScore = value;
        }
        return parseInt(totalScore);
    }

    getLv() {
        var totalScore = this.getTotalScore();
        return Math.floor(totalScore / 10);
    }
    getProgress() {
        var totalScore = this.getTotalScore();
        return totalScore % 10 / 10;
    }

    setPower(power) {
        cc.sys.localStorage.setItem('power', power);
    }
    getPower() {
        var power = "0";
        let value = cc.sys.localStorage.getItem('power');
        if (value != null && value != undefined && value != "") {
            power = value;
        }
        return parseInt(power);
    }

    setMoney(money) {
        cc.sys.localStorage.setItem('money', money);
    }
    getMoney() {
        var money = "0";
        let value = cc.sys.localStorage.getItem('money');
        if (value != null && value != undefined && value != "") {
            money = value;
        }
        return parseInt(money);
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
