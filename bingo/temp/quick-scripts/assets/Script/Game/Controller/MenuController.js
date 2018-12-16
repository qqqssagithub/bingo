(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Game/Controller/MenuController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '25579jzplZHZpLXIESwhmA/', 'MenuController', __filename);
// Script/Game/Controller/MenuController.ts

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
var Platform_1 = require("../Platform/Platform");
var MenuController = /** @class */ (function (_super) {
    __extends(MenuController, _super);
    function MenuController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.localDataManager = null;
        _this.userManager = null;
        _this.user = null;
        _this.lvLabel = null;
        _this.progress = null;
        _this.bar = null;
        _this.powerLabel = null;
        _this.moneyLabel = null;
        _this.localData = null;
        _this.rankData = null;
        return _this;
        // update (dt) {}
    }
    MenuController.prototype.onLoad = function () {
        var _this = this;
        this.user = cc.instantiate(this.userManager).getComponent('UserManager');
        Platform_1.default.getUserInfo(function (error, data) {
            if (error == null && data.userInfo != undefined) {
                var userInfo = data.userInfo;
                _this.user.setUserInfo([userInfo.nickName, userInfo.avatarUrl]);
            }
        });
        Platform_1.default.init();
        // this.localData = cc.instantiate(this.localDataManager).getComponent('LocalDataManager');
        // this.localData.parseRank(this.getLvAndScroe, this);
        this.getLvAndScroe();
    };
    MenuController.prototype.start = function () {
    };
    MenuController.prototype.getLvAndScroe = function () {
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
        var progressBar = this.progress.getComponent(cc.ProgressBar);
        if (progress > 0.9) {
            this.bar.type = cc.Sprite.Type.SLICED;
        }
        else {
            this.bar.type = cc.Sprite.Type.TILED;
        }
        progressBar.progress = progress;
        this.powerLabel.string = power;
        this.moneyLabel.string = money;
    };
    MenuController.prototype.addPowerAction = function () {
        this.addPower();
    };
    MenuController.prototype.beginAction = function () {
        cc.director.loadScene("PlayScene");
    };
    MenuController.prototype.rankAction = function () {
        cc.director.loadScene('RankScene');
    };
    MenuController.prototype.shareAction = function () {
        this.addPower();
    };
    MenuController.prototype.addPower = function () {
        var self = this;
        Platform_1.default.share(0, function () {
            var power = parseInt(self.user.getPower());
            power += 2;
            self.user.setPower(power);
            self.powerLabel.string = power;
        });
    };
    __decorate([
        property(cc.Prefab)
    ], MenuController.prototype, "localDataManager", void 0);
    __decorate([
        property(cc.Prefab)
    ], MenuController.prototype, "userManager", void 0);
    __decorate([
        property(cc.Label)
    ], MenuController.prototype, "lvLabel", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], MenuController.prototype, "progress", void 0);
    __decorate([
        property(cc.Sprite)
    ], MenuController.prototype, "bar", void 0);
    __decorate([
        property(cc.Label)
    ], MenuController.prototype, "powerLabel", void 0);
    __decorate([
        property(cc.Label)
    ], MenuController.prototype, "moneyLabel", void 0);
    MenuController = __decorate([
        ccclass
    ], MenuController);
    return MenuController;
}(cc.Component));
exports.default = MenuController;

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
        //# sourceMappingURL=MenuController.js.map
        