//区分手机系统
export const mobileSyatem = () => {
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        return "IOS";
    } else if (/android/.test(ua)) {
        return "Android";
    }
}

/**
 * 解析URL传参  vue路由设置为hash模式的时候，window.location.search是取不到值的。要用window.location.hash
 * @param {string} key
*/
export const getQueryString = (key) => {
    var after = window.location.hash.split("?")[1];
    if(after) {
        var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
        var r = after.match(reg);
        if(r != null) {
            return  decodeURIComponent(r[2]);
        } else {
            return null;
        }
    }
}