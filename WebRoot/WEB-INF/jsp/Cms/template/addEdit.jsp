<%@ page pageEncoding="UTF-8"%>
<editwindow ng-if='editWindow'>
    <cms-edit cmstext='{{cmsText}}' cmswidth='{{cmsWidth}}' cmsheight='{{cmsHeight}}' cmsfontfamily='{{cmsFontFamily}}' cmsfontsize='{{cmsFontsize}}' cmsfontcolor='{{cmsFontColor}}' cmsicons='cmsIcons' cmsstyle='cmsStyle'></cms-edit>
    <tips></tips>
    <p style='color:red'>{{cmsTips}}</p>
    <p>情报板长</p>
    <input type="text" ng-model='cmsWidth' ng-blur='changeStyle()'>
    <br>
    <p>情报板宽</p>
    <input type="text" ng-model='cmsHeight' ng-blur='changeStyle()'>
    <br>
    <p>文字</p>
    <textarea ng-model='cmsText' nIndex='-1' nRow='0'></textarea>
    <br>
    <p>字体</p>
    <select ng-model='cmsFontFamily' ng-change='changeFz()'>
        <option value='' selected hidden>--请选择--</option>
        <option value='SimSun'>宋体</option>
        <option value='KaiTi'>楷体</option>
        <option value='SimHei'>黑体</option>
    </select>
    <br>
    <p>字体大小</p>
    <select ng-model='cmsFontSize' ng-change='changeFz()'> 
        <option value='' selected hidden>--请选择--</option>
        <option value='auto'>auto</option>
        <option value='16'>16</option>
        <option value='24'>24</option>
        <option value='32'>32</option>
        <option value='48'>48</option>
        <option value='64'>64</option>
    </select>
    <br>
    <p>颜色</p>
    <select ng-model='cmsFontColor' ng-change='changeFz()'>
        <option value='' selected hidden>--请选择--</option>
        <option value='#00FF00'>绿色</option>
        <option value='#FF0000'>红色</option>
        <option value='#FFFF00'>黄色</option>
        <!-- <option value='black'>无色</option> -->
    </select>
    <br>
    <p>选择图片</p>
    <select ng-model='cmsIcon' ng-change='addIcon(cmsIcon)'>
        <option value='' selected hidden>--请选择--</option>
        <option value='null'>无</option>
        <option value='01'>A01</option>
        <option value='02'>A02</option>
        <option value='03'>A03</option>
        <option value='04'>A04</option>
        <option value='05'>A05</option>
        <option value='06'>A06</option>
        <option value='07'>A07</option>
    </select>
    <br>
    <p>切换时间</p>
    <input type="text" ng-model='cmsTimeDelay'>
    <br>
    <p>出字速度</p>
    <input type="text" ng-model='cmsParam'>
    <br>
    <p>播放方式</p>
    <select ng-model='cmsTransition'>
        <option value='' selected hidden>--请选择--</option>
        <option value='0'>清屏</option>
        <option value='1'>立即显示</option>
        <option>右侧</option>
        <option>顶部</option>
        <option>底部</option>
        <option>横百叶窗</option>
        <option>竖百叶窗</option>
        <option>马赛克</option>
        <option>渐变</option>
    </select>
    <br>
    <button ng-click='savePreview(cmsText)'>保存</button>
</editwindow>


