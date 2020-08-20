const util = {
    // 判断环境
    browser: {
        versions: (function() {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return {
                trident: u.indexOf("Trident") > -1, //IE内核
                presto: u.indexOf("Presto") > -1, //opera内核
                webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
                gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf("Android") > -1 || u.indexOf("Adr") > -1, //android终端
                iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf("iPad") > -1, //是否iPad
                webApp: u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf("MicroMessenger") > -1, //是否微信 （2015-01-22新增）
                // qq: u.match(/\sQQ/i) == " qq", //是否QQ
                weibo: u.indexOf("Weibo") > -1 || u.indexOf("weibo") > -1 //android终端
            };
        })(),
        language: (
            navigator.browserLanguage || navigator.language
        ).toLowerCase()
    },

    /**
     * 获取url上的参数
     * @param field url键名
     */
    getParams(field:string):string|Object {
        let url = window.location.href,
            param = {},
            splitArray = url.split("?"),
            searchLocation = splitArray.length <= 1 ? "" : splitArray[1].split("#")[0],
            searchParams = searchLocation.split("&"),
            value:string,
            key:string;
        for (var i = 0, leni = searchParams.length; i < leni; i++) {
            key = searchParams[i].split("=")[0];
            value = searchParams[i].split("=")[1];
            if (!key) continue;
            param[key] = value;
        }
        return field ? param[field] : param;
    },

    // 图片转base64
    getBase64Image(img) {  
        var canvas = document.createElement("canvas");  
        canvas.width = img.width;  
        canvas.height = img.height;  
        var ctx = canvas.getContext("2d");  
        ctx.drawImage(img, 0, 0, img.width, img.height);  
        var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();  
        var dataURL = canvas.toDataURL("image/"+ext);  
        return dataURL;  
    },

    /**
     * 将字符串转为对象
     * @param {string} str 
     */
    parseToObj(str:string):Object{
        let strArr = str.split(';');
        let obj = {};
        strArr.forEach(item => {
            let vk = item.split('=');
            obj[vk[0]] = vk[1];
        })
        return obj;
    },
};

export default util;
