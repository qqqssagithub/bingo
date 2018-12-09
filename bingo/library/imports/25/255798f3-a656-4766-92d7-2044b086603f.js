"use strict";
cc._RF.push(module, '25579jzplZHZpLXIESwhmA/', 'MenuController');
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
var MenuController = /** @class */ (function (_super) {
    __extends(MenuController, _super);
    function MenuController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.localDataManager = null;
        _this.userManager = null;
        _this.lvLabel = null;
        _this.scoreLabel = null;
        _this.localData = null;
        _this.rankData = null;
        return _this;
        // update (dt) {}
    }
    MenuController.prototype.onLoad = function () {
        this.localData = cc.instantiate(this.localDataManager).getComponent('LocalDataManager');
        this.localData.parseRank(this.getLvAndScroe, this);
    };
    MenuController.prototype.start = function () {
    };
    MenuController.prototype.getLvAndScroe = function () {
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
            }
            else if (60 <= score && score < 90) {
                s = "学霸";
            }
            else {
                s = "学神";
            }
            this.lvLabel.string = rank_arr[1] + "  " + s;
        }
        this.scoreLabel.string = score;
    };
    MenuController.prototype.beginAction = function () {
        cc.director.loadScene("PlayScene");
    };
    MenuController.prototype.rankAction = function () {
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
        property(cc.Label)
    ], MenuController.prototype, "scoreLabel", void 0);
    MenuController = __decorate([
        ccclass
    ], MenuController);
    return MenuController;
}(cc.Component));
exports.default = MenuController;

cc._RF.pop();