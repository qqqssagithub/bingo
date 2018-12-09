(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Game/UI/ChangeMode.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '10790LwbtZHuIz6H8iafkT+', 'ChangeMode', __filename);
// Script/Game/UI/ChangeMode.ts

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
var ChangeMode = /** @class */ (function (_super) {
    __extends(ChangeMode, _super);
    function ChangeMode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.userManager = null;
        _this.user = null;
        _this.modeButton = null;
        _this.spring0 = null;
        _this.spring1 = null;
        _this.spring2 = null;
        _this.spring3 = null;
        _this.spring4 = null;
        _this.spring5 = null;
        _this.guideNode1 = null;
        return _this;
        // update (dt) {}
    }
    ChangeMode.prototype.onLoad = function () {
        this.setMode(-1);
    };
    ChangeMode.prototype.start = function () {
    };
    ChangeMode.prototype.changeModeAction0 = function () {
        this.setMode(0);
    };
    ChangeMode.prototype.changeModeAction1 = function () {
        this.setMode(1);
    };
    ChangeMode.prototype.changeModeAction2 = function () {
        this.setMode(2);
    };
    ChangeMode.prototype.setMode = function (mode) {
        this.user = cc.instantiate(this.userManager).getComponent('UserManager');
        if (mode > -1) {
            this.user.setGameMode(mode);
        }
        var mode = this.user.getGameMode();
        if (mode == "0") {
            this.spring0.node.opacity = 0;
            this.spring1.node.opacity = 255;
            this.spring2.node.opacity = 255;
            this.spring3.node.opacity = 0;
            this.spring4.node.opacity = 255;
            this.spring5.node.opacity = 0;
            this.modeButton.node.getChildByName("Label").getComponent(cc.Label).string = "学渣";
        }
        else if (mode == "1") {
            this.spring0.node.opacity = 255;
            this.spring1.node.opacity = 0;
            this.spring2.node.opacity = 0;
            this.spring3.node.opacity = 255;
            this.spring4.node.opacity = 255;
            this.spring5.node.opacity = 0;
            this.modeButton.node.getChildByName("Label").getComponent(cc.Label).string = "学霸";
        }
        else if (mode == "2") {
            this.spring0.node.opacity = 255;
            this.spring1.node.opacity = 0;
            this.spring2.node.opacity = 255;
            this.spring3.node.opacity = 0;
            this.spring4.node.opacity = 0;
            this.spring5.node.opacity = 255;
            this.modeButton.node.getChildByName("Label").getComponent(cc.Label).string = "学神";
        }
    };
    ChangeMode.prototype.closeModeNodeAction = function (event) {
        console.log("123123123");
        this.node.setPosition(835, 480);
        if (!this.user.getIsShowGuide1()) {
            this.guideNode1.setPosition(270, 480);
        }
    };
    __decorate([
        property(cc.Prefab)
    ], ChangeMode.prototype, "userManager", void 0);
    __decorate([
        property(cc.Button)
    ], ChangeMode.prototype, "modeButton", void 0);
    __decorate([
        property(cc.Sprite)
    ], ChangeMode.prototype, "spring0", void 0);
    __decorate([
        property(cc.Sprite)
    ], ChangeMode.prototype, "spring1", void 0);
    __decorate([
        property(cc.Sprite)
    ], ChangeMode.prototype, "spring2", void 0);
    __decorate([
        property(cc.Sprite)
    ], ChangeMode.prototype, "spring3", void 0);
    __decorate([
        property(cc.Sprite)
    ], ChangeMode.prototype, "spring4", void 0);
    __decorate([
        property(cc.Sprite)
    ], ChangeMode.prototype, "spring5", void 0);
    __decorate([
        property(cc.Node)
    ], ChangeMode.prototype, "guideNode1", void 0);
    ChangeMode = __decorate([
        ccclass
    ], ChangeMode);
    return ChangeMode;
}(cc.Component));
exports.default = ChangeMode;

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
        //# sourceMappingURL=ChangeMode.js.map
        