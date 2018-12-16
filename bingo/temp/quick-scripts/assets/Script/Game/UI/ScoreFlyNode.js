(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Game/UI/ScoreFlyNode.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '077daHdb3pOMIeaJcl57Ofx', 'ScoreFlyNode', __filename);
// Script/Game/UI/ScoreFlyNode.ts

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
var HeadIcon = /** @class */ (function (_super) {
    __extends(HeadIcon, _super);
    function HeadIcon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.icon = null;
        _this.icons = [];
        return _this;
        // update (dt) {}
    }
    // onLoad () {}
    HeadIcon.prototype.start = function () {
    };
    HeadIcon.prototype.initSpriteFrameWithUrl = function (url) {
        var self = this;
        cc.loader.load(url, function (error, texture) {
            self.icon.spriteFrame = new cc.SpriteFrame(texture);
        });
    };
    HeadIcon.prototype.initSpriteFrameWithIndex = function (index) {
        this.icon.spriteFrame = this.icons[index];
    };
    __decorate([
        property(cc.Sprite)
    ], HeadIcon.prototype, "icon", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], HeadIcon.prototype, "icons", void 0);
    HeadIcon = __decorate([
        ccclass
    ], HeadIcon);
    return HeadIcon;
}(cc.Component));
exports.default = HeadIcon;

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
        //# sourceMappingURL=ScoreFlyNode.js.map
        