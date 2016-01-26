/**
 * Created by Administrator on 2016/1/22.
 */
var ws;
var SocketCreated = false;
var isUserloggedout = false;
var lastMessageType;
var countS;

var emojiData="  <ul class='pagination emt_list sys_emt_list clearfix'><li title='微笑' _id='_sys_0001_' _tag=':)' _text='[s微笑]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/1.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/1.gif'></li><li title='开怀笑' _id='_sys_0002_' _tag=':D' _text='[s开怀笑]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/2.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/2.gif'></li><li title='眨眼' _id='_sys_0003_' _tag=';)' _text='[s眨眼]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/3.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/3.gif'></li><li title='惊讶' _id='_sys_0004_' _tag=':O' _text='[s惊讶]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/4.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/4.gif'></li><li title='吐舌笑脸' _id='_sys_0005_' _tag=':P' _text='[s吐舌笑脸]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/5.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/5.gif'></li><li title='得意的笑' _id='_sys_0006_' _tag=':}' _text='[s得意的笑]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/6.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/6.gif'></li><li title='生气' _id='_sys_0007_' _tag=':@' _text='[s生气]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/7.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/7.gif'></li><li title='怕怕' _id='_sys_0008_' _tag=':S' _text='[s怕怕]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/8.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/8.gif'></li><li title='尴尬' _id='_sys_0009_' _tag=':$' _text='[s尴尬]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/9.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/9.gif'></li><li title='难过' _id='_sys_0010_' _tag=':(' _text='[s难过]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/10.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/10.gif'></li><li title='哭泣' _id='_sys_0011_' _tag=':'(' _text='[s哭泣]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/11.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/11.gif'></li><li title='失望' _id='_sys_0012_' _tag=':|' _text='[s失望]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/12.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/12.gif'></li><li title='困了' _id='_sys_0013_' _tag='(Z)' _text='[s困了]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/13.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/13.gif'></li><li title='好好笑' _id='_sys_0014_' _tag=':B' _text='[s好好笑]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/14.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/14.gif'></li><li title='啵' _id='_sys_0015_' _tag='(BO)' _text='[s啵]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/15.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/15.gif'></li><li title='电到了' _id='_sys_0016_' _tag='(R)' _text='[s电到了]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/16.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/16.gif'></li><li title='汗' _id='_sys_0017_' _tag=':Q' _text='[s汗]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/17.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/17.gif'></li><li title='流口水了' _id='_sys_0018_' _tag='(!)' _text='[s流口水了]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/18.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/18.gif'></li><li title='真困啊' _id='_sys_0019_' _tag='(S)' _text='[s真困啊]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/19.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/19.gif'></li><li title='我吐' _id='_sys_0020_' _tag='(V)' _text='[s我吐]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/20.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/20.gif'></li><li title='???' _id='_sys_0021_' _tag='(?)' _text='[s???]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/21.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/21.gif'></li><li title='嘘...' _id='_sys_0022_' _tag='(X)' _text='[s嘘...]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/22.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/22.gif'></li><li title='砸死你' _id='_sys_0023_' _tag='(P)' _text='[s砸死你]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/23.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/23.gif'></li><li title='不说' _id='_sys_0024_' _tag='(-)' _text='[s不说]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/24.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/24.gif'></li><li title='坏' _id='_sys_0025_' _tag=':;' _text='[s坏]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/25.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/25.gif'></li><li title='色迷迷' _id='_sys_0026_' _tag='(SS)' _text='[s色迷迷]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/26.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/26.gif'></li><li title='教训' _id='_sys_0027_' _tag='(@)' _text='[s教训]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/27.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/27.gif'></li><li title='可爱' _id='_sys_0028_' _tag='(##)' _text='[s可爱]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/28.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/28.gif'></li><li title='YEAH' _id='_sys_0029_' _tag='(YY)' _text='[sYEAH]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/29.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/29.gif'></li><li title='崩溃' _id='_sys_0030_' _tag='(><)' _text='[s崩溃]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/30.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/30.gif'></li><li title='鄙视你' _id='_sys_0031_' _tag='(-.-)' _text='[s鄙视你]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/31.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/31.gif'></li><li title='开心' _id='_sys_0032_' _tag='(~~)' _text='[s开心]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/32.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/32.gif'></li><li title='仰慕你' _id='_sys_0033_' _tag='(**)' _text='[s仰慕你]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/33.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/33.gif'></li><li title='晕' _id='_sys_0034_' _tag='(@@)' _text='[s晕]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/34.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/34.gif'></li><li title='挖鼻孔' _id='_sys_0035_' _tag='(``)' _text='[s挖鼻孔]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/35.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/35.gif'></li><li title='撒娇' _id='_sys_0036_' _tag='(%%)' _text='[s撒娇]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/36.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/36.gif'></li><li title='鼓掌' _id='_sys_0037_' _tag='(AA)' _text='[s鼓掌]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/37.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/37.gif'></li><li title='害羞' _id='_sys_0038_' _tag='(sy)' _text='[s害羞]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/38.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/38.gif'></li><li title='老大' _id='_sys_0039_' _tag='(smo)' _text='[s老大]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/39.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/39.gif'></li><li title='欠揍' _id='_sys_0040_' _tag='(hit' _text='[s欠揍]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/40.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/40.gif'></li><li title='飞吻' _id='_sys_0041_' _tag='(kiss' _text='[s飞吻]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/41.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/41.gif'></li><li title='工作忙' _id='_sys_0042_' _tag='(busy' _text='[s工作忙]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/42.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/42.gif'></li><li title='大哭' _id='_sys_0043_' _tag='(cry' _text='[s大哭]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/43.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/43.gif'></li><li title='偷偷笑' _id='_sys_0044_' _tag='(DD)' _text='[s偷偷笑]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/44.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/44.gif'></li><li title='送花给你' _id='_sys_0045_' _tag='(i$)' _text='[s送花给你]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/45.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/45.gif'></li><li title='来，亲一个' _id='_sys_0046_' _tag='(GK)' _text='[s来，亲一个]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/46.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/46.gif'></li><li title='拍桌子' _id='_sys_0047_' _tag='(desk' _text='[s拍桌子]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/47.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/47.gif'></li><li title='拜拜' _id='_sys_0048_' _tag='(bye' _text='[s拜拜]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/48.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/48.gif'></li><li title='玫瑰' _id='_sys_0060_' _tag='(F)' _text='[s玫瑰]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/60.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/60.gif'></li><li title='好爱你' _id='_sys_0061_' _tag='(L)' _text='[s好爱你]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/61.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/61.gif'></li><li title='心碎了' _id='_sys_0062_' _tag='(U)' _text='[s心碎了]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/62.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/62.gif'></li><li title='YES' _id='_sys_0065_' _tag='(Y)' _text='[sYES]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/65.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/65.gif'></li><li title='NO' _id='_sys_0064_' _tag='(N)' _text='[sNO]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/64.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/64.gif'></li><li title='握个手' _id='_sys_0066_' _tag='(H)' _text='[s握个手]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/66.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/66.gif'></li><li title='睫毛弯弯' _id='_sys_0098_' _tag='(88)' _text='[s睫毛弯弯]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/98.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/98.gif'></li><li title='嗷嗷嗷' _id='_sys_0055_' _tag='(oo)' _text='[s嗷嗷嗷]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/55.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/55.gif'></li><li title='秀一下' _id='_sys_0050_' _tag='(xx)' _text='[s秀一下]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/50.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/50.gif'></li><li title='扭捏' _id='_sys_0054_' _tag='(--)' _text='[s扭捏]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/54.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/54.gif'></li><li title='阿弥陀佛' _id='_sys_0051_' _tag='(fo)' _text='[s阿弥陀佛]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/51.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/51.gif'></li><li title='摸摸' _id='_sys_0097_' _tag='(mo)' _text='[s摸摸]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/97.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/97.gif'></li><li title='抓狂' _id='_sys_0053_' _tag='(o.o)' _text='[s抓狂]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/53.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/53.gif'></li><li title='啾啾' _id='_sys_0095_' _tag='(`3`)' _text='[s啾啾]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/95.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/95.gif'></li><li title='耍酷' _id='_sys_0096_' _tag='(vo)' _text='[s耍酷]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/96.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/96.gif'></li><li title='叹气' _id='_sys_0094_' _tag='(sigh' _text='[s叹气]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/94.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/94.gif'></li><li title='飘阿飘' _id='_sys_0049_' _tag='(ii)' _text='[s飘阿飘]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/49.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/49.gif'></li><li title='气呼呼' _id='_sys_0056_' _tag='(/)' _text='[s气呼呼]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/56.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/56.gif'></li><li title='很得意' _id='_sys_0057_' _tag='(,)' _text='[s很得意]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/57.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/57.gif'></li><li title='无辜' _id='_sys_0052_' _tag='(^^)' _text='[s无辜]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/52.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/52.gif'></li><li title='亲亲' _id='_sys_0063_' _tag='(K)' _text='[s亲亲]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/63.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/63.gif'></li><li title='我是男生' _id='_sys_0058_' _tag='(G)' _text='[s我是男生]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/58.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/58.gif'></li><li title='我是女生' _id='_sys_0059_' _tag='(M)' _text='[s我是女生]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/59.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/59.gif'></li><li title='到点了' _id='_sys_0067_' _tag='(O)' _text='[s到点了]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/67.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/67.gif'></li><li title='音乐' _id='_sys_0068_' _tag='(music' _text='[s音乐]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/68.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/68.gif'></li><li title='CALL我' _id='_sys_0069_' _tag='(T)' _text='[sCALL我]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/69.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/69.gif'></li><li title='带血的刀' _id='_sys_0070_' _tag='(kill' _text='[s带血的刀]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/70.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/70.gif'></li><li title='炸弹' _id='_sys_0071_' _tag='(O')' _text='[s炸弹]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/71.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/71.gif'></li><li title='有了' _id='_sys_0072_' _tag='(I)' _text='[s有了]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/72.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/72.gif'></li><li title='好晚了' _id='_sys_0073_' _tag='(E)' _text='[s好晚了]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/73.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/73.gif'></li><li title='吸血蝙蝠' _id='_sys_0074_' _tag=':[' _text='[s吸血蝙蝠]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/74.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/74.gif'></li><li title='便便' _id='_sys_0075_' _tag='(BB)' _text='[s便便]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/75.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/75.gif'></li><li title='干一杯' _id='_sys_0076_' _tag='(D)' _text='[s干一杯]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/76.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/76.gif'></li><li title='抽烟' _id='_sys_0077_' _tag='(SK)' _text='[s抽烟]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/77.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/77.gif'></li><li title='打电话' _id='_sys_0078_' _tag='(tel' _text='[s打电话]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/78.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/78.gif'></li><li title='家' _id='_sys_0079_' _tag='(home' _text='[s家]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/79.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/79.gif'></li><li title='车子' _id='_sys_0080_' _tag='(car' _text='[s车子]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/80.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/80.gif'></li><li title='礼物' _id='_sys_0081_' _tag='(gift' _text='[s礼物]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/81.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/81.gif'></li><li title='金钱' _id='_sys_0082_' _tag='($)' _text='[s金钱]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/82.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/82.gif'></li><li title='太阳' _id='_sys_0083_' _tag='(sun' _text='[s太阳]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/83.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/83.gif'></li><li title='下雨' _id='_sys_0084_' _tag='(rain' _text='[s下雨]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/84.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/84.gif'></li><li title='猪猪' _id='_sys_0085_' _tag='(W)' _text='[s猪猪]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/85.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/85.gif'></li><li title='小猫' _id='_sys_0086_' _tag='(cat' _text='[s小猫]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/86.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/86.gif'></li><li title='小狗' _id='_sys_0087_' _tag='(dog' _text='[s小狗]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/87.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/87.gif'></li><li title='骨头' _id='_sys_0088_' _tag='(8)' _text='[s骨头]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/88.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/88.gif'></li><li title='喝水' _id='_sys_0089_' _tag='(C)' _text='[s喝水]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/89.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/89.gif'></li><li title='汉堡' _id='_sys_0090_' _tag='(HB)' _text='[s汉堡]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/90.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/90.gif'></li><li title='包子' _id='_sys_0091_' _tag='(BZ)' _text='[s包子]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/91.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/91.gif'></li><li title='西瓜' _id='_sys_0092_' _tag='(XG)' _text='[s西瓜]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/92.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/92.gif'></li><li title='约会' _id='_sys_0093_' _tag='(YI)' _text='[s约会]'><img src='http://res.cc.netease.com/webcc/static/images/emotions/sys/93.gif' _src='http://res.cc.netease.com/webcc/static/images/emotions/sys/93.gif'></li></ul>"

function lockOn(str)
{
    var lock = document.getElementById('skm_LockPane');
    if (lock)
        lock.className = 'LockOn';
    lock.innerHTML = str;
}

function lockOff()
{
    var lock = document.getElementById('skm_LockPane');
    lock.className = 'LockOff';
}
/* 统计在线数量
function changeOnlineNum(num){
    $("#onlineNum").html(num);
}

function countMessage(event) {
    changeOnlineNum(event.data);
};
*/

/*获取在线列表*/
function updateList(str){
    var number;
    if(str.data == "error" || str.data == undefined){
        number = 0;
    }else{
        var strs = str.data.substr(0,str.data.length-1);
        var array = strs.split("|");
        number = array.length
    }
    var html="<li class='list-group-item'><span class='badge' id='onlineNum'>"+number+"</span>在线人数</li>"
    for(var i=0;i<number;i++){
        if(i<11){
            html += " <li class='list-group-item'><a href='#'>"+array[i]+"</a></li>"
        }else if(i == 11){
            html+=" <li class='list-group-item'><a href='#'>"+"..."+"</a></li>"
        }
    }
    $("#onlineList").html(html);
}

/*链接WebSocket*/
function ToggleConnectionClicked() {
    if (SocketCreated && (ws.readyState == 0 || ws.readyState == 1)) {
        lockOn("离开聊天室...");
        SocketCreated = false;
        isUserloggedout = true;
        ws.close();
    } else {
        lockOn("进入聊天室...");
        Log("准备连接到聊天服务器 ...","WARNING");
        try {
            if ("WebSocket" in window) {
                ws = new WebSocket("ws://" + document.getElementById("Connection").value);
            }
            else if("MozWebSocket" in window) {
                ws = new MozWebSocket("ws://" + document.getElementById("Connection").value);
            }

            SocketCreated = true;
            isUserloggedout = false;
        } catch (ex) {
            Log(ex, "ERROR");
            return;
        }
        document.getElementById("txtName").setAttribute("readonly","readonly");
        document.getElementById("ToggleConnection").innerHTML = "断 开";
        document.getElementById("ToggleConnection").className = "btn btn-danger";
        ws.onopen = WSonOpen;
        ws.onmessage = WSonMessage;
        ws.onclose = WSonClose;
        ws.onerror = WSonError;
    }
};

function WSonOpen() {
    lockOff();
    Log("连接已经建立。", "OK");
    $("#SendDataContainer").show();
    ws.send("【" + document.getElementById("txtName").value + "】进入了聊天室！");
};

function WSonMessage(event) {
    if (event.data.indexOf("进入了聊天室") != -1) Log(event.data,"WARNING");
    else Log(event.data);
};

function WSonClose() {
    lockOff();
    if (isUserloggedout)
        Log("【"+document.getElementById("txtName").value+"】离开了聊天室！","WARNING");
    document.getElementById("txtName").removeAttribute("readonly");
    document.getElementById("ToggleConnection").innerHTML = "连 接";
    document.getElementById("ToggleConnection").className = "btn btn-success";
    $("#SendDataContainer").hide();
};

function WSonError(event) {
    lockOff();
    Log("远程连接中断。", "ERROR");
};

/*发送消息*/
function SendDataClicked() {
    if (document.getElementById("DataToSend").value.trim() != "") {
        ws.send("<div class='alert alert-info col-md-2'  style='     padding: 5px;    text-align: center;  margin-bottom:10px;' role='alert'><strong>"+document.getElementById("txtName").value  +"</strong></div>"+"<div class='alert alert-info col-md-10'  style='    padding: 5px;  margin-bottom:10px;' role='alert'>"+ document.getElementById("DataToSend").value + "</div>");
        document.getElementById("DataToSend").value = "";
    }
};

/*输出到文本框*/
function Log(Text, MessageType) {
    if (MessageType == "OK") {Text = "<div class='alert alert-success' style='  margin-bottom:10px;' role='alert'>" + Text +"</div>";}
    else if (MessageType == "ERROR"){ Text = "<div class='alert alert-danger'  style='  margin-bottom:10px;' role='alert'>" + Text +"</div>";}
    else if (MessageType == "WARNING"){ Text = "<div class='alert alert-warning '  style='  margin-bottom:10px;' role='alert'>" + Text +"</div>";}
    else{
        Text = "<span class='bubble col-md-12'>"+Text+"</span></br>"
    }
    document.getElementById("LogContainer").innerHTML = document.getElementById("LogContainer").innerHTML + Text;
    var LogContainer = document.getElementById("LogContainer");
    LogContainer.scrollTop = LogContainer.scrollHeight;
    lastMessageType = MessageType;
};

function emojiShow(){
    $("#emoji").popover('show')
    $('.emt_list li').attr('onclick', 'a()');alert(1);
}



$(document).ready(function () {
    $("#SendDataContainer").hide();  //隐藏发送消息框


    /*验证浏览器是否支持WebSocket*/
    var WebSocketsExist = true;
    try {
        var dummy = new WebSocket("ws://localhost:8088/WebSocketChat/test");
        dummy.close();
    } catch (ex) {
        try
        {
            var webSocket = new MozWebSocket("ws://localhost:8088/WebSocketChat/test")
            webSocket.close();
        }
        catch(ex)
        {
            WebSocketsExist = false;
        }
    }

    if (WebSocketsExist) {
        Log("您的浏览器支持WebSocket. 您可以尝试连接到聊天服务器!", "OK");
        document.getElementById("Connection").value = "localhost:8088/WebSocketChat/chat";  //设置服务器默认参数
        countS = new WebSocket("ws://localhost:8088/WebSocketChat/counter");  //获取在线人数
        countS.onopen = updateList;
        countS.onmessage = updateList;
        countS.onclose = updateList;
        countS.onerror = updateList;
    } else {
        Log("您的浏览器不支持WebSocket。请选择其他的浏览器再尝试连接服务器。", "ERROR");
        document.getElementById("ToggleConnection").disabled = true;
    }

    /*回车键发送消息*/
    $("#DataToSend").keypress(function(evt)
    {
        if (evt.keyCode == 13)
        {
            $("#SendData").click();
            evt.preventDefault();
        }
    })
    //表情加载
    var tyle = "<div style='border: 1px solid #ddd;width: 450px;list-style: none;'>"
    emojiData = tyle +emojiData+"</div>"
   console.log($("#emoji").attr('data-template',emojiData)) ;

   // var js = "alert(this); return false;";
   // var newclick = eval("(function(){"+js+"});");

    setTimeout("", 2000);
});

function a(){
   console.log(this)
}
