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

@ccclass
export default class BingoItem extends cc.Component {

    @property(cc.Prefab)
    userManager = null;
    user = null;

    @property(cc.Label)
    itemLabel = null;
    @property(cc.Node)
    ragBg = null;
    @property(cc.Node)
    blackBg = null;

    contrastItems = null;
    point = null;
    private isTrue: boolean = false;
    private mode_2: boolean = false;

    callback: (i, j) => void = null
    // onLoad () {}

    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.onClickScreen(event);
        }, this);
    }

    setAnswer(answer) {
        this.ragBg.opacity = 0;
        this.blackBg.opacity = 0;
        this.isTrue = false;

        var answer_arr = answer.split(',');
        if (answer_arr.length >= 4) {
            const answer_str = answer_arr[1].charAt(parseInt(answer_arr[2]) - 1);
            this.itemLabel.string = answer_str;
        }
    }

    getIsTrue(): boolean {
        return this.isTrue;
    }

    getIsReply(): boolean {
        return this.ragBg.opacity == 255;
    }

    setError() {
        this.ragBg.opacity = 0;
        this.blackBg.opacity = 255;
    }

    private onClickScreen(event) {
        //测试
        // this.isTrue = true;
        // this.ragBg.opacity = 255;
        // if (this.callback && this.point) {
        //     this.callback(this.point.x, this.point.y);
        // }

        //必须正确
        if (this.ragBg.opacity == 255) {
            return;
        }
        for (let i = 0; i < this.contrastItems.length; i++) {
            const scrollerItem = this.contrastItems[i];
            var scrollerItemScript = scrollerItem.getComponent("ScrollerItem");
            if (this.itemLabel.string == scrollerItemScript.getAnswer()) {
                this.isTrue = true;
                break;
            }
        }
        if (this.isTrue) {
            this.ragBg.opacity = 255;
            if (this.callback && this.point) {
                this.callback(this.point.x, this.point.y);
            }
        }

        //不正确也可以点
        // if (this.ragBg.opacity == 255) {
        //     this.isTrue = false;
        //     this.ragBg.opacity = 0;
        //     if (this.callback && this.point) {
        //         this.callback(this.point.x, this.point.y);
        //     }
        //     return;
        // }
        // this.user = cc.instantiate(this.userManager).getComponent('UserManager');
        // for (let i = 0; i < this.contrastItems.length; i++) {
        //     const scrollerItem = this.contrastItems[i];
        //     var scrollerItemScript = scrollerItem.getComponent("ScrollerItem");
        //     if (this.user.getGameMode() == "2" && scrollerItemScript.isStop) {
        //         continue;
        //     }
        //     if (this.itemLabel.string == scrollerItemScript.getAnswer()) {
        //         this.isTrue = true;
        //         break;
        //     }
        // }
        // this.ragBg.opacity = 255;
        // if (this.callback && this.point) {
        //     this.callback(this.point.x, this.point.y);
        // }
    }

    // update (dt) {}
}
