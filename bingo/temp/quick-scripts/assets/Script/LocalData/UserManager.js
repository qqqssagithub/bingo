(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/LocalData/UserManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4c46dYlwrNJE5gIdkYoizBu', 'UserManager', __filename);
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    UserManager.prototype.start = function () {
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
    UserManager.prototype.getLv = function () {
        var totalScore = this.getTotalScore();
        return Math.floor(totalScore / 10);
    };
    UserManager.prototype.getProgress = function () {
        var totalScore = this.getTotalScore();
        return totalScore % 10 / 10;
    };
    UserManager.prototype.setPower = function (power) {
        cc.sys.localStorage.setItem('power', power);
    };
    UserManager.prototype.getPower = function () {
        var power = "10";
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=UserManager.js.map
        