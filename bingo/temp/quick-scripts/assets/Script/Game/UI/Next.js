(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Game/UI/Next.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2ac61L9DnRGfrTcnEd1Ic/+', 'Next', __filename);
// Script/Game/UI/Next.ts

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
var Next = /** @class */ (function (_super) {
    __extends(Next, _super);
    function Next() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.userManager = null;
        _this.user = null;
        _this.successNode = null;
        _this.failureNode = null;
        _this.scroeLabel = null;
        _this.callback = null;
        return _this;
        // update (dt) {}
    }
    Next.prototype.onLoad = function () {
        this.user = cc.instantiate(this.userManager).getComponent('UserManager');
    };
    Next.prototype.start = function () {
    };
    Next.prototype.setData = function (isSuccess) {
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
        }
        else {
            this.successNode.active = false;
            this.failureNode.active = true;
        }
    };
    Next.prototype.closeSelfAction = function (event) {
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
    };
    Next.prototype.shareAction = function (event) {
        var _this = this;
        var self = this;
        Platform_1.default.share(1, function () {
            var power = parseInt(_this.user.getPower());
            power += 2 * 2;
            _this.user.setPower(power);
            var money = parseInt(_this.user.getMoney());
            money += 100 * 2;
            _this.user.setMoney(money);
            self.successNode.active = false;
            self.failureNode.active = false;
            self.node.active = false;
            if (self.callback) {
                self.callback();
            }
        });
    };
    __decorate([
        property(cc.Prefab)
    ], Next.prototype, "userManager", void 0);
    __decorate([
        property(cc.Node)
    ], Next.prototype, "successNode", void 0);
    __decorate([
        property(cc.Node)
    ], Next.prototype, "failureNode", void 0);
    __decorate([
        property(cc.Label)
    ], Next.prototype, "scroeLabel", void 0);
    Next = __decorate([
        ccclass
    ], Next);
    return Next;
}(cc.Component));
exports.default = Next;

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
        //# sourceMappingURL=Next.js.map
        