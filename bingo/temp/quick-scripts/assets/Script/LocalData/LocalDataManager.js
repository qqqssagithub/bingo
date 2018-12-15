(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/LocalData/LocalDataManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6f4c62YO5ZPu7Uy2wTSKHow', 'LocalDataManager', __filename);
// Script/LocalData/LocalDataManager.ts

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
var LocalDataManager = /** @class */ (function (_super) {
    __extends(LocalDataManager, _super);
    function LocalDataManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rankData = null;
        _this.randomCount = 0; //随机个数
        _this.spawningTime = 0; //产生时间间隔
        _this.movingTime = 0; //移动时间间隔
        _this.data_b = [];
        _this.data_i = [];
        _this.data_n = [];
        _this.data_g = [];
        _this.data_o = [];
        _this.scrollerData = null;
        _this.answerData = null;
        return _this;
        // update (dt) {}
    }
    // onLoad () {}
    LocalDataManager.prototype.start = function () {
    };
    LocalDataManager.prototype.parseRank = function (callback, target) {
        this.rankData = [];
        var self = this;
        cc.loader.loadRes('LocalData/rank', function (error, data) {
            if (error) {
                cc.error(error);
            }
            else {
                var data_temp = data.split('\n');
                data_temp.splice(0, 2);
                for (var i = 0; i < data_temp.length; i++) {
                    var element = data_temp[i];
                    self.rankData.push(element);
                }
                if (typeof (callback) == "function") {
                    callback & callback.apply(target);
                }
            }
        });
    };
    LocalDataManager.prototype.parseParameter = function (callback, target) {
        var self = this;
        cc.loader.loadRes('LocalData/parameter', function (error, data) {
            if (error) {
                cc.error(error);
            }
            else {
                var data_temp = data.split('\n');
                var randomCount_arr = data_temp[0].split(',');
                if (randomCount_arr.length >= 2) {
                    self.randomCount = parseInt(randomCount_arr[1]);
                }
                var spawningTime_arr = data_temp[1].split(',');
                if (spawningTime_arr.length >= 2) {
                    self.spawningTime = parseInt(spawningTime_arr[1]);
                }
                var movingTime_arr = data_temp[2].split(',');
                if (movingTime_arr.length >= 2) {
                    self.movingTime = parseInt(movingTime_arr[1]);
                }
                if (typeof (callback) == "function") {
                    callback & callback.apply(target);
                }
            }
        });
    };
    LocalDataManager.prototype.parseData = function (callback, target) {
        var self = this;
        cc.loader.loadRes('LocalData/bingo', function (error, data) {
            if (error) {
                cc.error(error);
            }
            else {
                var data_temp = data.split('\n');
                data_temp.splice(0, 2);
                for (var i = 0; i < data_temp.length; i++) {
                    var element = data_temp[i];
                    var element_arr = element.split(',');
                    if (element_arr.length >= 4) {
                        var tag = element_arr[3].charAt(0);
                        if (tag == 'B') {
                            self.data_b.push(element);
                        }
                        else if (tag == 'I') {
                            self.data_i.push(element);
                        }
                        else if (tag == 'N') {
                            self.data_n.push(element);
                        }
                        else if (tag == 'G') {
                            self.data_g.push(element);
                        }
                        else if (tag == 'O') {
                            self.data_o.push(element);
                        }
                    }
                }
                if (typeof (callback) == "function") {
                    callback & callback.apply(target);
                }
            }
        });
    };
    LocalDataManager.prototype.generatingData = function (randomCount, matrixRow) {
        this.scrollerData = [];
        this.answerData = [];
        if (this.data_b.length < randomCount / 5
            || this.data_b.length != this.data_i.length
            || this.data_b.length != this.data_n.length
            || this.data_b.length != this.data_g.length
            || this.data_b.length != this.data_o.length) {
            return;
        }
        var count = 0;
        var answer_count = 0;
        var scrollerData_temp = [];
        var data_b_temp = this.data_b.slice();
        var data_i_temp = this.data_i.slice();
        var data_n_temp = this.data_n.slice();
        var data_g_temp = this.data_g.slice();
        var data_o_temp = this.data_o.slice();
        while (answer_count < randomCount / 5) {
            var index = Math.floor(Math.random() * data_b_temp.length);
            if (count < matrixRow) {
                var isSame = false;
                var answer_str_b = '';
                var answer_arr_b = this.data_b[index].split(',');
                if (answer_arr_b.length >= 4) {
                    answer_str_b = answer_arr_b[1].charAt(parseInt(answer_arr_b[2]) - 1);
                }
                var answer_str_i = '';
                var answer_arr_i = this.data_i[index].split(',');
                if (answer_arr_i.length >= 4) {
                    answer_str_i = answer_arr_i[1].charAt(parseInt(answer_arr_i[2]) - 1);
                }
                var answer_str_n = '';
                var answer_arr_n = this.data_n[index].split(',');
                if (answer_arr_n.length >= 4) {
                    answer_str_n = answer_arr_n[1].charAt(parseInt(answer_arr_n[2]) - 1);
                }
                var answer_str_g = '';
                var answer_arr_g = this.data_g[index].split(',');
                if (answer_arr_g.length >= 4) {
                    answer_str_g = answer_arr_g[1].charAt(parseInt(answer_arr_g[2]) - 1);
                }
                var answer_str_o = '';
                var answer_arr_o = this.data_o[index].split(',');
                if (answer_arr_o.length >= 4) {
                    answer_str_o = answer_arr_o[1].charAt(parseInt(answer_arr_o[2]) - 1);
                }
                var str_arr_temp = [answer_str_b, answer_str_i, answer_str_n, answer_str_g, answer_str_o];
                for (var i = 0; i < this.answerData.length; i++) {
                    var element = this.answerData[i];
                    var answer_arr = element.split(',');
                    if (answer_arr.length >= 4) {
                        var answer_str = answer_arr[1].charAt(parseInt(answer_arr[2]) - 1);
                        str_arr_temp.push(answer_str);
                    }
                }
                if (this.isAnyEqual(str_arr_temp)) {
                    continue;
                }
                this.answerData.splice(count, 0, this.data_b[index]);
                this.data_b.splice(index, 1);
                this.answerData.splice(count * 2 + 1, 0, this.data_i[index]);
                this.data_i.splice(index, 1);
                this.answerData.splice(count * 3 + 2, 0, this.data_n[index]);
                this.data_n.splice(index, 1);
                this.answerData.splice(count * 4 + 3, 0, this.data_g[index]);
                this.data_g.splice(index, 1);
                this.answerData.splice(count * 5 + 4, 0, this.data_o[index]);
                this.data_o.splice(index, 1);
                count++;
            }
            scrollerData_temp.push(data_b_temp[index]);
            data_b_temp.splice(index, 1);
            scrollerData_temp.push(data_i_temp[index]);
            data_i_temp.splice(index, 1);
            scrollerData_temp.push(data_n_temp[index]);
            data_n_temp.splice(index, 1);
            scrollerData_temp.push(data_g_temp[index]);
            data_g_temp.splice(index, 1);
            scrollerData_temp.push(data_o_temp[index]);
            data_o_temp.splice(index, 1);
            answer_count++;
        }
        for (var i = 0; i < randomCount; i++) {
            var index = Math.floor(Math.random() * scrollerData_temp.length);
            this.scrollerData.push(scrollerData_temp[index]);
            scrollerData_temp.splice(index, 1);
        }
    };
    LocalDataManager.prototype.isAnyEqual = function (array) {
        var hash = {};
        for (var i in array) {
            if (hash[array[i]]) {
                return true;
            }
            hash[array[i]] = true;
        }
        return false;
    };
    LocalDataManager = __decorate([
        ccclass
    ], LocalDataManager);
    return LocalDataManager;
}(cc.Component));
exports.default = LocalDataManager;

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
        //# sourceMappingURL=LocalDataManager.js.map
        