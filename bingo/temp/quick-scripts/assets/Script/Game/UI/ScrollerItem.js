(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Game/UI/ScrollerItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '77baaGhCo9ONr99ZZiQKIFw', 'ScrollerItem', __filename);
// Script/Game/UI/ScrollerItem.ts

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
var ScrollerItem = /** @class */ (function (_super) {
    __extends(ScrollerItem, _super);
    function ScrollerItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contentLabel0 = null;
        _this.sprite0 = null;
        _this.contentLabel1 = null;
        _this.sprite1 = null;
        _this.contentLabel2 = null;
        _this.sprite2 = null;
        _this.contentLabel3 = null;
        _this.sprite3 = null;
        _this.movingTime = 0;
        _this.answer = '';
        _this.answerIndex = 0;
        _this.isStop = false;
        _this.contentLabel_arr = null;
        _this.sprite_arr = null;
        return _this;
        // update (dt) {}
    }
    ScrollerItem.prototype.onLoad = function () {
    };
    ScrollerItem.prototype.start = function () {
        var _this = this;
        this.node.runAction(cc.sequence(cc.moveTo(this.movingTime, cc.v2(-370, this.node.position.y)), cc.callFunc(function () {
            _this.isStop = true;
        }, this)));
    };
    ScrollerItem.prototype.setData = function (content, movingTime) {
        this.movingTime = movingTime;
        this.contentLabel_arr = [];
        this.contentLabel_arr.push(this.contentLabel0);
        this.contentLabel_arr.push(this.contentLabel1);
        this.contentLabel_arr.push(this.contentLabel2);
        this.contentLabel_arr.push(this.contentLabel3);
        this.sprite_arr = [];
        this.sprite_arr.push(this.sprite0);
        this.sprite_arr.push(this.sprite1);
        this.sprite_arr.push(this.sprite2);
        this.sprite_arr.push(this.sprite3);
        var content_arr = content.split(',');
        if (content_arr.length >= 4) {
            var content_str = content_arr[1];
            var index = parseInt(content_arr[2]) - 1;
            var tag = content_arr[3].charAt(0);
            var content_temp = '';
            for (var i = 0; i < content_str.length; i++) {
                var element = content_str.charAt(i);
                if (i == index) {
                    this.answerIndex = index;
                    this.answer = element;
                    if (tag == 'B') {
                        this.contentLabel_arr[i].string = 'B';
                        this.contentLabel_arr[i].node.color = cc.color(52, 192, 252);
                    }
                    else if (tag == 'I') {
                        this.contentLabel_arr[i].string = 'I';
                        this.contentLabel_arr[i].node.color = cc.color(255, 224, 35);
                    }
                    else if (tag == 'N') {
                        this.contentLabel_arr[i].string = 'N';
                        this.contentLabel_arr[i].node.color = cc.color(178, 79, 248);
                    }
                    else if (tag == 'G') {
                        this.contentLabel_arr[i].string = 'G';
                        this.contentLabel_arr[i].node.color = cc.color(0, 90, 253);
                    }
                    else if (tag == 'O') {
                        this.contentLabel_arr[i].string = 'O';
                        this.contentLabel_arr[i].node.color = cc.color(0, 203, 0);
                    }
                    this.sprite_arr[i].node.opacity = 255;
                }
                else {
                    this.contentLabel_arr[i].string = element;
                }
            }
        }
    };
    ScrollerItem.prototype.getAnswer = function () {
        return this.answer;
    };
    ScrollerItem.prototype.showAnswer = function () {
        this.contentLabel_arr[this.answerIndex].string = this.answer;
        this.contentLabel_arr[this.answerIndex].node.color = cc.color(252, 0, 0);
        this.sprite_arr[this.answerIndex].node.opacity = 0;
    };
    __decorate([
        property(cc.Label)
    ], ScrollerItem.prototype, "contentLabel0", void 0);
    __decorate([
        property(cc.Sprite)
    ], ScrollerItem.prototype, "sprite0", void 0);
    __decorate([
        property(cc.Label)
    ], ScrollerItem.prototype, "contentLabel1", void 0);
    __decorate([
        property(cc.Sprite)
    ], ScrollerItem.prototype, "sprite1", void 0);
    __decorate([
        property(cc.Label)
    ], ScrollerItem.prototype, "contentLabel2", void 0);
    __decorate([
        property(cc.Sprite)
    ], ScrollerItem.prototype, "sprite2", void 0);
    __decorate([
        property(cc.Label)
    ], ScrollerItem.prototype, "contentLabel3", void 0);
    __decorate([
        property(cc.Sprite)
    ], ScrollerItem.prototype, "sprite3", void 0);
    ScrollerItem = __decorate([
        ccclass
    ], ScrollerItem);
    return ScrollerItem;
}(cc.Component));
exports.default = ScrollerItem;

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
        //# sourceMappingURL=ScrollerItem.js.map
        