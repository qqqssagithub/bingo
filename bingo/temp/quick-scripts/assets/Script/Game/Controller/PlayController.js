(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Game/Controller/PlayController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd52eekK1rZGQ6w9xR3r+ygA', 'PlayController', __filename);
// Script/Game/Controller/PlayController.ts

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
var PlayController = /** @class */ (function (_super) {
    __extends(PlayController, _super);
    function PlayController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.userManager = null;
        _this.user = null;
        _this.lvLabel = null;
        _this.scoreLabel = null;
        /******* 引导 *******/
        _this.guideNode0 = null;
        _this.guideNode1 = null;
        /******* mode *******/
        _this.modeButton = null;
        _this.modeNode = null;
        /******* bingoItem *******/
        _this.matrixRow = 0; //矩阵行列
        _this.padding = 0; //和底边的距离
        _this.pointArr = null; //坐标矩阵
        _this.bingoItemNode = null;
        _this.bingoItemMaskNode = null;
        _this.bingoItem = null;
        _this.bingoItems = null;
        _this.answerLine = null; //连成一条线的答案
        /******* scrollerItem *******/
        _this.spawningTime = 0; //产生时间间隔
        _this.movingTime = 0; //移动时间间隔
        _this.scrollerItemNode = null;
        _this.scrollerItem = null;
        _this.beginGameButton = null;
        _this.isBeginGame = 0; //0，初始状态；1，准备就绪；2，进行中；3，bingo
        _this.intervalNum = 0;
        _this.gameTime = 0;
        _this.scrollerItemCount = 0;
        _this.scrollerItems = null;
        _this.bingoButton = null;
        _this.localDataManager = null;
        _this.localData = null;
        _this.rankData = null;
        _this.data = null; //本地数据
        _this.randomCount = 0; //随机个数
        _this.randomData = null; //随机数据
        _this.randomAnswer = null; //随机填入矩阵的答案
        /******* 代答 *******/
        _this.helpButton = null;
        _this.helpCountLabel = null;
        _this.currentHelpCount = null;
        _this.nextNode = null;
        return _this;
    }
    PlayController.prototype.onLoad = function () {
        this.scrollerItems = [];
        this.bingoItems = [];
        this.answerLine = [];
        this.buildCoordinate();
        this.resetGameState();
        this.localData = cc.instantiate(this.localDataManager).getComponent('LocalDataManager');
        this.localData.parseRank(this.getLvAndScroe, this);
    };
    PlayController.prototype.getLvAndScroe = function () {
        this.localData.parseParameter(this.getParameter, this);
        this.rankData = this.localData.rankData;
        this.user = cc.instantiate(this.userManager).getComponent('UserManager');
        this.user.setHelpCount("990");
        if (!this.user.getIsShowGuide0()) {
            this.guideNode0.setPosition(270, 480);
        }
        else {
            this.guideNode0.setPosition(-858, 480);
        }
        var lv = this.user.getLv();
        var score = this.user.getScore();
        var helpCount = this.user.getHelpCount();
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
        this.helpCountLabel.string = "X " + helpCount;
    };
    PlayController.prototype.getParameter = function () {
        this.randomCount = this.localData.randomCount;
        this.spawningTime = this.localData.spawningTime;
        this.movingTime = this.localData.movingTime;
        this.localData.parseData(this.refreshUI, this);
    };
    PlayController.prototype.resetGameState = function () {
        this.isBeginGame = 1;
        this.beginGameButton.node.getChildByName("Label").getComponent(cc.Label).string = "准备就绪";
        this.scrollerItemCount = 0;
        this.bingoButton.interactable = false;
        this.modeButton.interactable = true;
        this.helpButton.interactable = false;
        this.gameTime = 0;
        this.currentHelpCount = 0;
        this.scrollerItems.forEach(function (scrollerItem) {
            scrollerItem.destroy();
        });
        this.scrollerItems.splice(0, this.scrollerItems.length);
        this.answerLine.splice(0, this.answerLine.length);
        if (this.intervalNum) {
            clearInterval(this.intervalNum);
        }
        this.bingoItemMaskNode.setPosition(-240, -240);
    };
    PlayController.prototype.refreshUI = function () {
        this.resetGameState();
        this.localData.generatingData(this.randomCount, this.matrixRow);
        this.randomData = this.localData.scrollerData;
        this.randomAnswer = this.localData.answerData;
        this.initAnswer();
    };
    PlayController.prototype.initAnswer = function () {
        if (this.randomAnswer.length < this.matrixRow * this.matrixRow) {
            return;
        }
        if (this.bingoItems.length == this.matrixRow) {
            var index = 0;
            for (var i = 0; i < this.matrixRow; i++) {
                for (var j = 0; j < this.matrixRow; j++) {
                    var bingoItem = this.bingoItems[i][j];
                    var bingoItemScript = bingoItem.getComponent("BingoItem");
                    var answer = this.randomAnswer[index];
                    bingoItemScript.setAnswer(answer);
                    index++;
                }
            }
        }
        else {
            var index = 0;
            for (var i = 0; i < this.matrixRow; i++) {
                var itemArr = [];
                for (var j = 0; j < this.matrixRow; j++) {
                    var bingoItem = cc.instantiate(this.bingoItem);
                    bingoItem.setPosition(this.pointArr[i][j].x, this.pointArr[i][j].y);
                    this.bingoItemNode.addChild(bingoItem);
                    var bingoItemScript = bingoItem.getComponent("BingoItem");
                    var answer = this.randomAnswer[index];
                    bingoItemScript.setAnswer(answer);
                    bingoItemScript.contrastItems = this.scrollerItems;
                    bingoItemScript.point = cc.v2(i, j);
                    bingoItemScript.callback = this.bingoItemCallback.bind(this);
                    itemArr.push(bingoItem);
                    index++;
                }
                this.bingoItems.push(itemArr);
            }
        }
    };
    PlayController.prototype.start = function () {
    };
    //创建坐标矩阵
    PlayController.prototype.buildCoordinate = function () {
        var width = this.bingoItemNode.width / this.matrixRow;
        var beginX = width / 2;
        var beginY = this.padding + width / 2;
        this.pointArr = [];
        for (var i = 0; i < this.matrixRow; i++) {
            var arr = [];
            for (var j = 0; j < this.matrixRow; j++) {
                var position = cc.v2(beginX + i * width, beginY + j * width);
                arr.push(position);
            }
            this.pointArr.push(arr);
        }
    };
    PlayController.prototype.addScrollerItem = function () {
        if (this.randomData.length < this.randomCount) {
            return;
        }
        var scrollerItem = cc.instantiate(this.scrollerItem);
        scrollerItem.setPosition(320, 0);
        this.scrollerItemNode.addChild(scrollerItem);
        var scrollerItemScript = scrollerItem.getComponent("ScrollerItem");
        var content = this.randomData[this.scrollerItemCount];
        var movingTime_temp = this.movingTime;
        var mode = this.user.getGameMode();
        if (mode == "2") {
            movingTime_temp /= 2;
        }
        scrollerItemScript.setData(content, movingTime_temp);
        this.scrollerItemCount++;
        this.scrollerItems.push(scrollerItem);
        if (this.scrollerItemCount == this.randomCount && this.intervalNum) {
            clearInterval(this.intervalNum);
        }
    };
    PlayController.prototype.beginGameAction = function (event) {
        if (this.guideNode1.position.x > 0) {
            this.guideNode1.setPosition(-1425, 480);
        }
        if (!this.user.getIsShowGuide1()) {
            this.user.setIsShowGuide1(true);
        }
        if (this.isBeginGame == 1) { //准备就绪
            this.bingoItemMaskNode.setPosition(-240, 526);
            this.beginGameButton.node.getChildByName("Label").getComponent(cc.Label).string = "放弃";
            this.isBeginGame = 2;
            this.modeButton.interactable = false;
            this.addScrollerItem(); //先执行一次
            var spawningTime_temp = this.spawningTime;
            var mode = this.user.getGameMode();
            if (mode == "2") {
                this.helpButton.interactable = false;
                spawningTime_temp /= 2;
            }
            else {
                this.helpButton.interactable = true;
            }
            this.intervalNum = setInterval(this.addScrollerItem.bind(this), 1000 * spawningTime_temp);
        }
        else {
            this.refreshUI();
        }
    };
    PlayController.prototype.bingoItemCallback = function (i, j) {
        this.bingoButton.interactable = false;
        //横排
        for (var row = 0; row < this.matrixRow; row++) {
            var bingoItem = this.bingoItems[row][j];
            var bingoItemScript = bingoItem.getComponent("BingoItem");
            if (!bingoItemScript.getIsReply()) {
                break;
            }
            if (row == this.matrixRow - 1) {
                this.bingoButton.interactable = true;
                for (var index = 0; index < this.matrixRow; index++) {
                    var bingoItem = this.bingoItems[index][j];
                    this.answerLine.push(bingoItem);
                }
                return;
            }
        }
        //竖排
        for (var column = 0; column < this.matrixRow; column++) {
            var bingoItem = this.bingoItems[i][column];
            var bingoItemScript = bingoItem.getComponent("BingoItem");
            if (!bingoItemScript.getIsReply()) {
                break;
            }
            if (column == this.matrixRow - 1) {
                this.bingoButton.interactable = true;
                for (var index = 0; index < this.matrixRow; index++) {
                    var bingoItem = this.bingoItems[i][index];
                    this.answerLine.push(bingoItem);
                }
                return;
            }
        }
        //低-高斜线
        if (i == j) {
            for (var row = 0; row < this.matrixRow; row++) {
                var bingoItem = this.bingoItems[row][row];
                var bingoItemScript = bingoItem.getComponent("BingoItem");
                if (!bingoItemScript.getIsReply()) {
                    break;
                }
                if (row == this.matrixRow - 1) {
                    this.bingoButton.interactable = true;
                    for (var index = 0; index < this.matrixRow; index++) {
                        var bingoItem = this.bingoItems[index][index];
                        this.answerLine.push(bingoItem);
                    }
                    return;
                }
            }
        }
        //高-低斜线
        if (i + j == this.matrixRow - 1) {
            for (var row = 0; row < this.matrixRow; row++) {
                var bingoItem = this.bingoItems[row][this.matrixRow - 1 - row];
                var bingoItemScript = bingoItem.getComponent("BingoItem");
                if (!bingoItemScript.getIsReply()) {
                    break;
                }
                if (row == this.matrixRow - 1) {
                    this.bingoButton.interactable = true;
                    for (var index = 0; index < this.matrixRow; index++) {
                        var bingoItem = this.bingoItems[index][this.matrixRow - 1 - index];
                        this.answerLine.push(bingoItem);
                    }
                    return;
                }
            }
        }
    };
    PlayController.prototype.bingoAction = function (event) {
        var isAllTrue = true;
        this.answerLine.forEach(function (element) {
            var bingoItemScript = element.getComponent("BingoItem");
            if (!bingoItemScript.isTrue) {
                isAllTrue = false;
                bingoItemScript.setError();
            }
        });
        this.nextNode.setPosition(270, 480);
        var nextNodeScript = this.nextNode.getComponent("Next");
        nextNodeScript.setData(isAllTrue);
        this.isBeginGame = 3;
        this.beginGameButton.node.getChildByName("Label").getComponent(cc.Label).string = "准备";
        this.bingoButton.interactable = false;
        this.helpButton.interactable = false;
        if (this.intervalNum) {
            clearInterval(this.intervalNum);
        }
    };
    PlayController.prototype.update = function (dt) {
        if (this.isBeginGame == 2) {
            this.gameTime += dt;
            var spawningTime_temp = this.spawningTime;
            var movingTime_temp = this.movingTime;
            var mode = this.user.getGameMode();
            if (mode == "2") {
                spawningTime_temp /= 2;
                movingTime_temp /= 2;
            }
            if (this.gameTime >= spawningTime_temp * (this.randomCount - 1) + movingTime_temp) {
                this.bingoAction(null);
            }
        }
    };
    PlayController.prototype.changeModeAction = function (event) {
        if (this.guideNode0.position.x > 0) {
            this.guideNode0.setPosition(-858, 480);
        }
        if (!this.user.getIsShowGuide0()) {
            this.user.setIsShowGuide0(true);
        }
        this.modeNode.setPosition(270, 480);
    };
    PlayController.prototype.helpAction = function (event) {
        var helpCount = parseInt(this.user.getHelpCount());
        if (helpCount <= 0) {
            return;
        }
        helpCount--;
        this.user.setHelpCount(helpCount);
        this.helpCountLabel.string = "X " + helpCount;
        this.currentHelpCount++;
        var mode = this.user.getGameMode();
        if (mode == "0" && this.currentHelpCount >= 5) {
            this.helpButton.interactable = false;
        }
        else if (mode == "1" && this.currentHelpCount >= 2) {
            this.helpButton.interactable = false;
        }
    };
    __decorate([
        property(cc.Prefab)
    ], PlayController.prototype, "userManager", void 0);
    __decorate([
        property(cc.Label)
    ], PlayController.prototype, "lvLabel", void 0);
    __decorate([
        property(cc.Label)
    ], PlayController.prototype, "scoreLabel", void 0);
    __decorate([
        property(cc.Node)
    ], PlayController.prototype, "guideNode0", void 0);
    __decorate([
        property(cc.Node)
    ], PlayController.prototype, "guideNode1", void 0);
    __decorate([
        property(cc.Button)
    ], PlayController.prototype, "modeButton", void 0);
    __decorate([
        property(cc.Node)
    ], PlayController.prototype, "modeNode", void 0);
    __decorate([
        property
    ], PlayController.prototype, "matrixRow", void 0);
    __decorate([
        property
    ], PlayController.prototype, "padding", void 0);
    __decorate([
        property(cc.Node)
    ], PlayController.prototype, "bingoItemNode", void 0);
    __decorate([
        property(cc.Node)
    ], PlayController.prototype, "bingoItemMaskNode", void 0);
    __decorate([
        property(cc.Prefab)
    ], PlayController.prototype, "bingoItem", void 0);
    __decorate([
        property(cc.Node)
    ], PlayController.prototype, "scrollerItemNode", void 0);
    __decorate([
        property(cc.Prefab)
    ], PlayController.prototype, "scrollerItem", void 0);
    __decorate([
        property(cc.Button)
    ], PlayController.prototype, "beginGameButton", void 0);
    __decorate([
        property(cc.Button)
    ], PlayController.prototype, "bingoButton", void 0);
    __decorate([
        property(cc.Prefab)
    ], PlayController.prototype, "localDataManager", void 0);
    __decorate([
        property(cc.Button)
    ], PlayController.prototype, "helpButton", void 0);
    __decorate([
        property(cc.Label)
    ], PlayController.prototype, "helpCountLabel", void 0);
    __decorate([
        property(cc.Node)
    ], PlayController.prototype, "nextNode", void 0);
    PlayController = __decorate([
        ccclass
    ], PlayController);
    return PlayController;
}(cc.Component));
exports.default = PlayController;

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
        //# sourceMappingURL=PlayController.js.map
        