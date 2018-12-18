"use strict";
cc._RF.push(module, '77baaGhCo9ONr99ZZiQKIFw', 'ScrollerItem');
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
        _this.isStop = false;
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
        var contentLabel_arr = [];
        contentLabel_arr.push(this.contentLabel0);
        contentLabel_arr.push(this.contentLabel1);
        contentLabel_arr.push(this.contentLabel2);
        contentLabel_arr.push(this.contentLabel3);
        var sprite_arr = [];
        sprite_arr.push(this.sprite0);
        sprite_arr.push(this.sprite1);
        sprite_arr.push(this.sprite2);
        sprite_arr.push(this.sprite3);
        var content_arr = content.split(',');
        if (content_arr.length >= 4) {
            var content_str = content_arr[1];
            var index = parseInt(content_arr[2]) - 1;
            var tag = content_arr[3].charAt(0);
            var content_temp = '';
            for (var i = 0; i < content_str.length; i++) {
                var element = content_str.charAt(i);
                if (i == index) {
                    this.answer = element;
                    if (tag == 'B') {
                        contentLabel_arr[i].string = 'B';
                        contentLabel_arr[i].node.color = cc.color(52, 192, 252);
                    }
                    else if (tag == 'I') {
                        contentLabel_arr[i].string = 'I';
                        contentLabel_arr[i].node.color = cc.color(255, 224, 35);
                    }
                    else if (tag == 'N') {
                        contentLabel_arr[i].string = 'N';
                        contentLabel_arr[i].node.color = cc.color(178, 79, 248);
                    }
                    else if (tag == 'G') {
                        contentLabel_arr[i].string = 'G';
                        contentLabel_arr[i].node.color = cc.color(0, 90, 253);
                    }
                    else if (tag == 'O') {
                        contentLabel_arr[i].string = 'O';
                        contentLabel_arr[i].node.color = cc.color(0, 203, 0);
                    }
                    sprite_arr[i].node.opacity = 255;
                }
                else {
                    contentLabel_arr[i].string = element;
                }
            }
        }
    };
    ScrollerItem.prototype.getAnswer = function () {
        return this.answer;
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