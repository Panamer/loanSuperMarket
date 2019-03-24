//区分手机系统
export const mobileSyatem = () => {
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        return "IOS";
    } else if (/android/.test(ua)) {
        return "Android";
    }
}