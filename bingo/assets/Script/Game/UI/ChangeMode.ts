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
export default class ChangeMode extends cc.Component {

    @property(cc.Prefab)
    userManager = null;
    user = null;

    @property(cc.Button)
    modeButton = null;

    @property(cc.Sprite)
    spring0 = null;
    @property(cc.Sprite)
    spring1 = null;
    @property(cc.Sprite)
    spring2 = null;
    @property(cc.Sprite)
    spring3 = null;
    @property(cc.Sprite)
    spring4 = null;
    @property(cc.Sprite)
    spring5 = null;

    @property(cc.Node)
    guideNode1 = null;

    onLoad() {
        this.setMode(-1);
    }

    start() {

    }

    changeModeAction0() {
        this.setMode(0);
    }

    changeModeAction1() {
        this.setMode(1);
    }

    changeModeAction2() {
        this.setMode(2);
    }

    setMode(mode) {
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
            //this.modeButton.node.getChildByName("Label").getComponent(cc.Label).string = "学渣";
        } else if (mode == "1") {
            this.spring0.node.opacity = 255;
            this.spring1.node.opacity = 0;
            this.spring2.node.opacity = 0;
            this.spring3.node.opacity = 255;
            this.spring4.node.opacity = 255;
            this.spring5.node.opacity = 0;
            //this.modeButton.node.getChildByName("Label").getComponent(cc.Label).string = "学霸";
        } else if (mode == "2") {
            this.spring0.node.opacity = 255;
            this.spring1.node.opacity = 0;
            this.spring2.node.opacity = 255;
            this.spring3.node.opacity = 0;
            this.spring4.node.opacity = 0;
            this.spring5.node.opacity = 255;
            //this.modeButton.node.getChildByName("Label").getComponent(cc.Label).string = "学神";
        }
    }

    closeModeNodeAction(event) {
        console.log("123123123");
        
        this.node.setPosition(835, 480);
        if (!this.user.getIsShowGuide1()) {
            this.guideNode1.setPosition(270, 480);
        }
    }

    // update (dt) {}
}
