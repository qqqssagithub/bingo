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
export default class ScrollerItem extends cc.Component {

    @property(cc.Label)
    contentLabel0 = null;
    @property(cc.Sprite)
    sprite0 = null;
    @property(cc.Label)
    contentLabel1 = null;
    @property(cc.Sprite)
    sprite1 = null;
    @property(cc.Label)
    contentLabel2 = null;
    @property(cc.Sprite)
    sprite2 = null;
    @property(cc.Label)
    contentLabel3 = null;
    @property(cc.Sprite)
    sprite3 = null;

    movingTime = 0;
    answer = '';
    answerIndex = 0;
    isStop = false;

    contentLabel_arr = null;
    sprite_arr = null;

    onLoad() {

    }

    start() {
        this.node.runAction(cc.sequence(cc.moveTo(this.movingTime, cc.v2(-370, this.node.position.y)), cc.callFunc(() => {
            this.isStop = true;
        }, this)));
    }

    setData(content, movingTime) {
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
            for (let i = 0; i < content_str.length; i++) {
                const element = content_str.charAt(i);
                if (i == index) {
                    this.answerIndex = index;
                    this.answer = element;
                    if (tag == 'B') {
                        this.contentLabel_arr[i].string = 'B';
                        this.contentLabel_arr[i].node.color = cc.color(52, 192, 252);
                    } else if (tag == 'I') {
                        this.contentLabel_arr[i].string = 'I';
                        this.contentLabel_arr[i].node.color = cc.color(255, 224, 35);
                    } else if (tag == 'N') {
                        this.contentLabel_arr[i].string = 'N';
                        this.contentLabel_arr[i].node.color = cc.color(178, 79, 248);
                    } else if (tag == 'G') {
                        this.contentLabel_arr[i].string = 'G';
                        this.contentLabel_arr[i].node.color = cc.color(0, 90, 253);
                    } else if (tag == 'O') {
                        this.contentLabel_arr[i].string = 'O';
                        this.contentLabel_arr[i].node.color = cc.color(0, 203, 0);
                    }
                    this.sprite_arr[i].node.opacity = 255;
                } else {
                    this.contentLabel_arr[i].string = element;
                }
            }
        }
    }

    getAnswer(): string {
        return this.answer;
    }

    showAnswer() {
        this.contentLabel_arr[this.answerIndex].string = this.answer;
        this.contentLabel_arr[this.answerIndex].node.color = cc.color(252, 0, 0);
        this.sprite_arr[this.answerIndex].node.opacity = 0;
    }
    // update (dt) {}
}
