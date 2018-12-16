// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

import Platform from "../Platform/Platform"

@ccclass
export default class PlayController extends cc.Component {
    @property(cc.Prefab)
    userManager = null;
    user = null;

    @property(cc.Label)
    lvLabel = null;
    @property(cc.ProgressBar)
    progress = null;
    @property(cc.Sprite)
    bar = null;
    @property(cc.Label)
    powerLabel = null;
    @property(cc.Label)
    moneyLabel = null;

    /******* 头像 *******/
    @property(cc.Node)
    headNode = null;
    @property(cc.Prefab)
    headIcon = null;

    /******* 引导 *******/
    @property(cc.Node)
    guideNode0 = null;
    @property(cc.Node)
    guideNode1 = null;

    /******* mode *******/
    @property(cc.Button)
    modeButton = null;
    @property(cc.Node)
    modeNode = null;

    /******* bingoItem *******/
    @property
    matrixRow: number = 0; //矩阵行列
    @property
    padding: number = 0; //和底边的距离
    pointArr = null; //坐标矩阵
    @property(cc.Node)
    bingoItemNode = null;
    @property(cc.Node)
    bingoItemMaskNode = null;
    @property(cc.Prefab)
    bingoItem = null;
    bingoItems = null;
    answerLine = null; //连成一条线的答案


    /******* scrollerItem *******/
    spawningTime = 0; //产生时间间隔
    movingTime = 0; //移动时间间隔
    @property(cc.Node)
    scrollerItemNode = null;
    @property(cc.Prefab)
    scrollerItem = null;

    @property(cc.Button)
    beginGameButton = null;
    isBeginGame = 0; //0，初始状态；1，准备就绪；2，进行中；3，bingo
    intervalNum = 0;
    gameTime = 0;
    scrollerItemCount = 0;
    scrollerItems = null;

    @property(cc.Button)
    bingoButton = null;

    @property(cc.Prefab)
    localDataManager = null;
    localData = null;
    rankData = null;
    data = null; //本地数据
    randomCount = 0; //随机个数
    randomData = null; //随机数据
    randomAnswer = null; //随机填入矩阵的答案

    /******* 代答 *******/
    @property(cc.Button)
    helpButton = null;
    @property(cc.Label)
    helpCountLabel = null;
    currentHelpCount = null;

    /******* 规则 *******/
    @property(cc.Node)
    ruleNode = null;

    /******* 当前局结束 *******/
    @property(cc.Node)
    nextNode = null;

    @property(cc.Prefab)
    flyScoreNode = null;
    intervalLine = 0;
    lineCount = 0;

    onLoad() {
        this.user = cc.instantiate(this.userManager).getComponent('UserManager');
        this.getLvAndScroe();
        this.addHeadIcon();

        var nextNodeScript = this.nextNode.getComponent("Next");
        nextNodeScript.callback = this.nextShareCallback.bind(this);

        this.scrollerItems = [];
        this.bingoItems = [];
        this.answerLine = [];
        this.buildCoordinate();

        this.resetGameState();

        this.localData = cc.instantiate(this.localDataManager).getComponent('LocalDataManager');
        // this.localData.parseRank(this.getLvAndScroe, this);
        this.localData.parseParameter(this.getParameter, this);
    }

    getLvAndScroe() {
        var lv = this.user.getLv();
        var progress = this.user.getProgress();
        var power = this.user.getPower();
        var money = this.user.getMoney();

        this.lvLabel.string = lv;
        let progressBar = this.progress.getComponent(cc.ProgressBar);
        if (progress > 0.9) {
            this.bar.type = cc.Sprite.Type.SLICED;
        } else {
            this.bar.type = cc.Sprite.Type.TILED;
        }
        progressBar.progress = progress;
        this.powerLabel.string = power;
        this.moneyLabel.string = money;
    }

    addHeadIcon() {
        var userInfo = this.user.getUserInfo();
        for (let index = 0; index < 6; index++) {
            var headIcon = cc.instantiate(this.headIcon);
            this.headNode.addChild(headIcon);
            var headIconScript = headIcon.getComponent("HeadIcon");
            if (index == 0 && userInfo[1] != "") {
                headIconScript.initSpriteFrameWithUrl(userInfo[1]);
            } else {
                headIconScript.initSpriteFrameWithIndex(index);
            }
            headIcon.setPosition(30 + index * 60, 30);
        }
    }

    getParameter() {
        this.randomCount = this.localData.randomCount;
        this.spawningTime = this.localData.spawningTime;
        this.movingTime = this.localData.movingTime;

        this.localData.parseData(this.refreshUI, this);
    }

    resetGameState() {
        this.isBeginGame = 1;
        this.beginGameButton.node.getChildByName("Label").getComponent(cc.Label).string = "准备就绪";
        this.scrollerItemCount = 0;
        //this.bingoButton.interactable = false;
        // this.modeButton.interactable = true;
        // this.helpButton.interactable = false;
        this.gameTime = 0;
        this.currentHelpCount = 0;
        this.scrollerItems.forEach(scrollerItem => {
            scrollerItem.destroy()
        });
        this.scrollerItems.splice(0, this.scrollerItems.length);
        this.answerLine.splice(0, this.answerLine.length);
        if (this.intervalNum) {
            clearInterval(this.intervalNum)
        }
        this.bingoItemMaskNode.setPosition(-240, -240);
    }

    refreshUI() {
        this.resetGameState();

        this.localData.generatingData(this.randomCount, this.matrixRow);
        this.randomData = this.localData.scrollerData;
        this.randomAnswer = this.localData.answerData;

        this.initAnswer();
    }

    initAnswer() {
        if (this.randomAnswer.length < this.matrixRow * this.matrixRow) {
            return;
        }
        if (this.bingoItems.length == this.matrixRow) { //刷新界面只需要重置bingoItem的状态就行
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
        } else { //第一次进入playScene
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
    }

    start() {

    }

    //创建坐标矩阵
    buildCoordinate() {
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
    }

    addScrollerItem() {
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
        if (this.scrollerItemCount >= this.randomCount && this.intervalNum) {
            clearInterval(this.intervalNum);
        }
    }

    beginGameAction(event) {
        if (this.guideNode1.position.x > 0) {
            this.guideNode1.setPosition(-1425, 480);
        }
        if (!this.user.getIsShowGuide1()) {
            this.user.setIsShowGuide1(true);
        }
        if (this.isBeginGame == 1) { //准备就绪
            var power = parseInt(this.user.getPower());
            power -= 2;
            this.user.setPower(power);
            this.powerLabel.string = power;

            this.bingoItemMaskNode.setPosition(-240, 526);
            this.beginGameButton.node.getChildByName("Label").getComponent(cc.Label).string = "放弃";
            this.isBeginGame = 2;
            // this.modeButton.interactable = false;
            this.addScrollerItem(); //先执行一次
            var spawningTime_temp = this.spawningTime;
            // var mode = this.user.getGameMode();
            // if (mode == "2") {
            //     this.helpButton.interactable = false;
            //     spawningTime_temp /= 2;
            // } else {
            //     this.helpButton.interactable = true;
            // }
            this.intervalNum = setInterval(this.addScrollerItem.bind(this), 1000 * spawningTime_temp);
        } else {
            this.refreshUI();
        }
    }

    flyScore(item) {
        let s0 = "+1XP";
        let s = cc.instantiate(this.flyScoreNode);
        let pos0 = item.parent.convertToWorldSpaceAR(item.position);
        let pos1 = cc.v2(126, 865);
        s.setPosition(pos0.x, pos0.y);
        s.getComponent(cc.Label).string = s0;
        this.node.addChild(s);

        var playTime = cc.pDistance(pos0, pos1) / 500.0;
        var action = cc.moveTo(playTime, pos1);
        var action1 = cc.scaleTo(playTime, 0.3);
        s.stopAllActions();

        var self = this;
        var spawn = cc.spawn(action, action1);
        s.runAction(cc.sequence(spawn, cc.callFunc(function () {
            var totalScore = self.user.getTotalScore();
            totalScore++;
            self.user.setTotalScore(totalScore);
            var lv = self.user.getLv();
            var progress = self.user.getProgress();
            self.lvLabel.string = lv;
            let progressBar = self.progress.getComponent(cc.ProgressBar);
            if (progress > 0.9) {
                self.bar.type = cc.Sprite.Type.SLICED;
            } else {
                self.bar.type = cc.Sprite.Type.TILED;
            }
            progressBar.progress = progress;
            s.destroy()
        })))
    }

    bingoItemCallback(i, j) {
        //this.bingoButton.interactable = false;
        this.flyScore(this.bingoItems[i][j]);
        this.answerLine.splice(0, this.answerLine.length);
        //横排
        for (let row = 0; row < this.matrixRow; row++) {
            var bingoItem = this.bingoItems[row][j];
            var bingoItemScript = bingoItem.getComponent("BingoItem");
            if (!bingoItemScript.getIsReply()) {
                break;
            }
            if (row == this.matrixRow - 1) {
                //this.bingoButton.interactable = true;
                this.bingo();
                for (let index = 0; index < this.matrixRow; index++) {
                    var bingoItem = this.bingoItems[index][j];
                    this.answerLine.push(bingoItem);
                }
                return;
            }
        }
        //竖排
        for (let column = 0; column < this.matrixRow; column++) {
            var bingoItem = this.bingoItems[i][column];
            var bingoItemScript = bingoItem.getComponent("BingoItem");
            if (!bingoItemScript.getIsReply()) {
                break;
            }
            if (column == this.matrixRow - 1) {
                //this.bingoButton.interactable = true;
                this.bingo();
                for (let index = 0; index < this.matrixRow; index++) {
                    var bingoItem = this.bingoItems[i][index];
                    this.answerLine.push(bingoItem);
                }
                return;
            }
        }
        //低-高斜线
        if (i == j) {
            for (let row = 0; row < this.matrixRow; row++) {
                var bingoItem = this.bingoItems[row][row];
                var bingoItemScript = bingoItem.getComponent("BingoItem");
                if (!bingoItemScript.getIsReply()) {
                    break;
                }
                if (row == this.matrixRow - 1) {
                    //this.bingoButton.interactable = true;
                    this.bingo();
                    for (let index = 0; index < this.matrixRow; index++) {
                        var bingoItem = this.bingoItems[index][index];
                        this.answerLine.push(bingoItem);
                    }
                    return;
                }
            }
        }
        //高-低斜线
        if (i + j == this.matrixRow - 1) {
            for (let row = 0; row < this.matrixRow; row++) {
                var bingoItem = this.bingoItems[row][this.matrixRow - 1 - row];
                var bingoItemScript = bingoItem.getComponent("BingoItem");
                if (!bingoItemScript.getIsReply()) {
                    break;
                }
                if (row == this.matrixRow - 1) {
                    //this.bingoButton.interactable = true;
                    this.bingo();
                    for (let index = 0; index < this.matrixRow; index++) {
                        var bingoItem = this.bingoItems[index][this.matrixRow - 1 - index];
                        this.answerLine.push(bingoItem);
                    }
                    return;
                }
            }
        }
    }

    bingo() {
        this.bingoItemMaskNode.setPosition(-240, -240);
        
        var power = parseInt(this.user.getPower());
        power += 2;
        this.user.setPower(power);
        this.powerLabel.string = power;
        var money = parseInt(this.user.getMoney());
        money += 100;
        this.user.setMoney(money);
        this.moneyLabel.string = money;

        this.nextNode.setPosition(270, 480);
        this.isBeginGame = 3;
        if (this.intervalNum) {
            clearInterval(this.intervalNum)
        }
        this.beginGameButton.node.getChildByName("Label").getComponent(cc.Label).string = "准备";
        this.lineCount = 0;
        this.intervalLine = setInterval(this.lineAni.bind(this), 80);
        // this.answerLine.forEach(element => {
        //     var bingoItemScript = element.getComponent("BingoItem");
        //     bingoItemScript.setError();
        // });
    }

    lineAni() {
        if (this.lineCount < this.answerLine.length) {
            var bingoItemScript = this.answerLine[this.lineCount].getComponent("BingoItem");
            bingoItemScript.setError();
        } else {
            this.answerLine.splice(0, this.answerLine.length);
        }
        this.lineCount++;
        if (this.lineCount >= 6 && this.intervalLine) {
            clearInterval(this.intervalLine);
            var nextNodeScript = this.nextNode.getComponent("Next");
            nextNodeScript.setData(true);
        }
    }

    bingoAction(event) {
        var isAllTrue = true;
        this.answerLine.forEach(element => {
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
        //this.bingoButton.interactable = false;
        // this.helpButton.interactable = false;
        if (this.intervalNum) {
            clearInterval(this.intervalNum)
        }
    }

    moveRuleAction() {
        if (this.ruleNode.position.x < 835) {
            this.ruleNode.setPosition(835, 1495);
        } else {
            this.ruleNode.setPosition(270, 480);
        }
    }

    update(dt) {
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
                //this.bingoAction(null);
                this.nextNode.setPosition(270, 480);
                this.isBeginGame = 3;
                if (this.intervalNum) {
                    clearInterval(this.intervalNum)
                }
                this.beginGameButton.node.getChildByName("Label").getComponent(cc.Label).string = "准备";
                var nextNodeScript = this.nextNode.getComponent("Next");
                nextNodeScript.setData(false);
            }
        }
    }

    backAction() {
        cc.director.loadScene("MenuScene");
    }

    addPowerAction() {
        this.addPower();
    }

    addPower() {
        var self = this;
        Platform.share(0, () => {
            var power = parseInt(self.user.getPower());
            power += 2;
            self.user.setPower(power);
            self.powerLabel.string = power;
        });
    }

    nextShareCallback() {
        var power = parseInt(this.user.getPower());
        power += 2;
        this.user.setPower(power);
        this.powerLabel.string = power;
    }

    changeModeAction(event) {
        if (this.guideNode0.position.x > 0) {
            this.guideNode0.setPosition(-858, 480);
        }
        if (!this.user.getIsShowGuide0()) {
            this.user.setIsShowGuide0(true);
        }
        this.modeNode.setPosition(270, 480);
    }

    helpAction(event) {
        // var helpCount = parseInt(this.user.getHelpCount());
        // if (helpCount <= 0) {
        //     return;
        // }
        // helpCount--;
        // this.user.setHelpCount(helpCount);
        // this.helpCountLabel.string = "X " + helpCount;
        // this.currentHelpCount++;
        // var mode = this.user.getGameMode();
        // if (mode == "0" && this.currentHelpCount >= 5) {
        //     this.helpButton.interactable = false;
        // } else if (mode == "1" && this.currentHelpCount >= 2) {
        //     this.helpButton.interactable = false;
        // }
    }
}
