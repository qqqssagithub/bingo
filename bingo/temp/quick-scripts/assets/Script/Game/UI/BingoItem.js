(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Game/UI/BingoItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bb396e5E9dGGr4wdePxNy2l', 'BingoItem', __filename);
// Script/Game/UI/BingoItem.ts

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
var BingoItem = /** @class */ (function (_super) {
    __extends(BingoItem, _super);
    function BingoItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.userManager = null;
        _this.user = null;
        _this.itemLabel = null;
        _this.ragBg = null;
        _this.blackBg = null;
        _this.contrastItems = null;
        _this.point = null;
        _this.isTrue = false;
        _this.mode_2 = false;
        _this.callback = null;
        return _this;
        // update (dt) {}
    }
    // onLoad () {}
    BingoItem.prototype.start = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.onClickScreen(event);
        }, this);
    };
    BingoItem.prototype.setAnswer = function (answer) {
        this.ragBg.opacity = 0;
        this.blackBg.opacity = 0;
        this.isTrue = false;
        var answer_arr = answer.split(',');
        if (answer_arr.length >= 4) {
            var answer_str = answer_arr[1].charAt(parseInt(answer_arr[2]) - 1);
            this.itemLabel.string = answer_str;
        }
    };
    BingoItem.prototype.getIsTrue = function () {
        return this.isTrue;
    };
    BingoItem.prototype.getIsReply = function () {
        return this.ragBg.opacity == 255;
    };
    BingoItem.prototype.setError = function () {
        this.ragBg.opacity = 0;
        this.blackBg.opacity = 255;
    };
    BingoItem.prototype.onClickScreen = function (event) {
        if (this.ragBg.opacity == 255) {
            this.isTrue = false;
            this.ragBg.opacity = 0;
            if (this.callback && this.point) {
                this.callback(this.point.x, this.point.y);
            }
            return;
        }
        this.user = cc.instantiate(this.userManager).getComponent('UserManager');
        for (var i = 0; i < this.contrastItems.length; i++) {
            var scrollerItem = this.contrastItems[i];
            var scrollerItemScript = scrollerItem.getComponent("ScrollerItem");
            if (this.user.getGameMode() == "2" && scrollerItemScript.isStop) {
                continue;
            }
            if (this.itemLabel.string == scrollerItemScript.getAnswer()) {
                this.isTrue = true;
                break;
            }
        }
        this.ragBg.opacity = 255;
        if (this.callback && this.point) {
            this.callback(this.point.x, this.point.y);
        }
    };
    __decorate([
        property(cc.Prefab)
    ], BingoItem.prototype, "userManager", void 0);
    __decorate([
        property(cc.Label)
    ], BingoItem.prototype, "itemLabel", void 0);
    __decorate([
        property(cc.Node)
    ], BingoItem.prototype, "ragBg", void 0);
    __decorate([
        property(cc.Node)
    ], BingoItem.prototype, "blackBg", void 0);
    BingoItem = __decorate([
        ccclass
    ], BingoItem);
    return BingoItem;
}(cc.Component));
exports.default = BingoItem;

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
        //# sourceMappingURL=BingoItem.js.map
        