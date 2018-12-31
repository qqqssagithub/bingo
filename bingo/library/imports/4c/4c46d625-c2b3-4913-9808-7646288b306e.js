"use strict";
cc._RF.push(module, '4c46dYlwrNJE5gIdkYoizBu', 'UserManager');
// Script/LocalData/UserManager.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Platform_1 = require("../Game/Platform/Platform");
var UserManager = /** @class */ (function (_super) {
    __extends(UserManager, _super);
    function UserManager() {
        // LIFE-CYCLE CALLBACKS:
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lv = 1;
        _this.progress = 0;
        return _this;
        // update (dt) {}
    }
    // onLoad () {}
    UserManager.prototype.start = function () {
    };
    UserManager.prototype.setDay = function (day) {
        cc.sys.localStorage.setItem('day', day);
    };
    UserManager.prototype.getDay = function () {
        var day = "-1";
        var value_day = cc.sys.localStorage.getItem('day');
        if (value_day != null && value_day != undefined && value_day != "") {
            day = value_day;
        }
        return parseInt(day);
    };
    UserManager.prototype.setUserInfo = function (info) {
        if (info.length == 2) {
            cc.sys.localStorage.setItem('nickName', info[0]);
            cc.sys.localStorage.setItem('avatarUrl', info[1]);
        }
    };
    UserManager.prototype.getUserInfo = function () {
        var nickName = "";
        var value_nickName = cc.sys.localStorage.getItem('nickName');
        if (value_nickName != null && value_nickName != undefined && value_nickName != "") {
            nickName = value_nickName;
        }
        var avatarUrl = "";
        var value_avatarUrl = cc.sys.localStorage.getItem('avatarUrl');
        if (value_avatarUrl != null && value_avatarUrl != undefined && value_avatarUrl != "") {
            avatarUrl = value_avatarUrl;
        }
        return [nickName, avatarUrl];
    };
    UserManager.prototype.initGuide = function () {
        cc.sys.localStorage.removeItem('showGuide0');
        cc.sys.localStorage.removeItem('showGuide1');
    };
    UserManager.prototype.setIsShowGuide0 = function (showGuide0) {
        cc.sys.localStorage.setItem('showGuide0', showGuide0);
    };
    UserManager.prototype.setIsShowGuide1 = function (showGuide1) {
        cc.sys.localStorage.setItem('showGuide1', showGuide1);
    };
    UserManager.prototype.getIsShowGuide0 = function () {
        return cc.sys.localStorage.getItem('showGuide0');
    };
    UserManager.prototype.getIsShowGuide1 = function () {
        return cc.sys.localStorage.getItem('showGuide1');
    };
    UserManager.prototype.setTotalScore = function (totalScore) {
        Platform_1.default.updateScore(totalScore);
        cc.sys.localStorage.setItem('totalScore', totalScore);
    };
    UserManager.prototype.getTotalScore = function () {
        var totalScore = "0";
        var value = cc.sys.localStorage.getItem('totalScore');
        if (value != null && value != undefined && value != "") {
            totalScore = value;
        }
        return parseInt(totalScore);
    };
    UserManager.prototype.getLvAndProgress = function () {
        var totalScore = this.getTotalScore();
        console.log('总分：', totalScore);
        this.lv = 1;
        var isContinue = true;
        while (isContinue) {
            var l = totalScore / this.lv / 10;
            if (l > 1) {
                totalScore -= this.lv * 10;
                this.lv++;
            }
            else {
                this.progress = totalScore / this.lv / 10;
                console.log('progress: ', this.progress);
                this.lv--;
                console.log('lv: ', this.lv);
                isContinue = false;
            }
        }
    };
    UserManager.prototype.getLv = function () {
        this.getLvAndProgress();
        return this.lv;
    };
    UserManager.prototype.getProgress = function () {
        this.getLvAndProgress();
        return this.progress;
    };
    UserManager.prototype.setPower = function (power) {
        cc.sys.localStorage.setItem('power', power);
    };
    UserManager.prototype.getPower = function () {
        var power = "0";
        var value = cc.sys.localStorage.getItem('power');
        if (value != null && value != undefined && value != "") {
            power = value;
        }
        return parseInt(power);
    };
    UserManager.prototype.setMoney = function (money) {
        cc.sys.localStorage.setItem('money', money);
    };
    UserManager.prototype.getMoney = function () {
        var money = "0";
        var value = cc.sys.localStorage.getItem('money');
        if (value != null && value != undefined && value != "") {
            money = value;
        }
        return parseInt(money);
    };
    UserManager.prototype.setGameMode = function (mode) {
        cc.sys.localStorage.setItem('gameMode', mode);
    };
    UserManager.prototype.getGameMode = function () {
        var mode = "0";
        var value = cc.sys.localStorage.getItem('gameMode');
        if (value != null && value != undefined && value != "") {
            mode = value;
        }
        return mode;
    };
    UserManager = __decorate([
        ccclass
    ], UserManager);
    return UserManager;
}(cc.Component));
exports.default = UserManager;

cc._RF.pop();