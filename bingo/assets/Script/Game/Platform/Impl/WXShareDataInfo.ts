// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


export default class WXShareDataInfo  {
    /** 标题 */
   title:string;
   /** 图片 */
   imageUrl: string;
   /** 参数 
    * 格式"key0=value0&keyn=valuen"
   */
   query: string;

   /** 参数 
    * 成功回调
   */
  _callback : (err:string , serverData : any) => void;

  /**
    * 分享成功调函数
    * @param res 整个结构
    * @param shareId 分享id
    * @param isGroupShare 是否群转发（false 转发个人)
    */
   public success(res, shareId, isGroupShare) : void {

   }
}
