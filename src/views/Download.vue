<template>
  <div class="box">
      <div class="qihangdai_xiazai">
		<h3>启航贷</h3>
		<p class="qihangdai_xiazai_p1">
            <span>
                <a id="downloadAndroid" style="color:white;text-decoration: none!important" 
                    href="https://qihangdai.oss-cn-zhangjiakou.aliyuncs.com/qihangdai.v1.0.1.apk">安卓手机下载
                </a>
            </span>
        </p>
        <p class="qihangdai_xiazai_p2">
            <span>
                <a id="downloadios" style="color:white ;text-decoration: none!important" 
                    href="itms-services://?action=download-manifest&amp;url=https://xingyundai.oss-cn-zhangjiakou.aliyuncs.com/qihangdai.plist">苹果手机下载
                </a>
            </span>
        </p>
    </div>
    <div class="main_zhezhaoceng" id="modelId" style="display: none;">
    <div class="main_zhezhaoceng_ceng"></div>
    <img src="../assets/images/zhezhaoceng.png" class="main_zhezhaoceng_img">
    <img src="../assets/images/xiazai1.png" class="qihangdai_xiazai_img1">
    <img src="../assets/images/qihangdai_xiazai2.png" class="qihangdai_xiazai_img2">
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return{
        }
    },
  created() {
    	var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var winHeight = typeof window.innerHeight != 'undefined' ? window.innerHeight : document.documentElement.clientHeight;
		if(this.isWeixin&&isAndroid){
			loadHtml();
			loadStyleText(cssText);
		}
  },
  methods: {
    is_weixin() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    loadHtml(){
        var div = document.createElement('div');
        div.id = 'weixin-tip';
        div.innerHTML = '<p><img src="live_weixin.png" style="width: 70%; height: 70%;" alt="微信打开"/></p>';
        document.body.appendChild(div);
    },
    loadStyleText(cssText) {
        var style = document.createElement('style');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        try {
            style.appendChild(document.createTextNode(cssText));
        } catch (e) {
            style.styleSheet.cssText = cssText; //ie9以下
        }
        var head=document.getElementsByTagName("head")[0]; //head标签之间加上style样式
        head.appendChild(style); 
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../assets/css/download.css";
    #weixin-tip{
        position: fixed;
        left:0; top:0;
        background: rgba(0,0,0,0.8);
        filter:alpha(opacity=80);
        width: 100%;
        height:100%;
        z-index: 100;
    }
    #weixin-tip p{
        text-align: center;
        margin-top: 10%;
        padding:0 5%;
    }
</style>
