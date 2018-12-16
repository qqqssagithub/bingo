(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Game/Platform/Impl/WXShareDataInfo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4c09bpmlb1OVL8JAUmP10iO', 'WXShareDataInfo', __filename);
// Script/Game/Platform/Impl/WXShareDataInfo.ts

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
var WXShareDataInfo = /** @class */ (function () {
    function WXShareDataInfo() {
    }
    /**
      * 分享成功调函数
      * @param res 整个结构
      * @param shareId 分享id
      * @param isGroupShare 是否群转发（false 转发个人)
      */
    WXShareDataInfo.prototype.success = function (res, shareId, isGroupShare) {
    };
    return WXShareDataInfo;
}());
exports.default = WXShareDataInfo;

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
        //# sourceMappingURL=WXShareDataInfo.js.map
        