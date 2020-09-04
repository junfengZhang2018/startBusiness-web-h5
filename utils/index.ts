const util = {
    // 判断环境
    browser: {
        versions: (function () {
            var u = navigator.userAgent;
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
                weibo: u.indexOf("Weibo") > -1 || u.indexOf("weibo") > -1, //android终端
            };
        })(),
        language: (
            navigator.browserLanguage || navigator.language
        ).toLowerCase(),
    },

    //缓存执行结果
    cachedFn(fn) {
        let cache = new Map();
        return (str) => {
            !cache.has(str) && cache.set(str, fn(str));
            return cache.get(str);
        }
    },
    
    /**
     * 获取url上的参数
     * @param field url键名
     */
    getParams(field: string): string | Object {
        let url = window.location.href,
            param = {},
            splitArray = url.split("?"),
            searchLocation =
                splitArray.length <= 1 ? "" : splitArray[1].split("#")[0],
            searchParams = searchLocation.split("&"),
            value: string,
            key: string;
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
        var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
        var dataURL = canvas.toDataURL("image/" + ext);
        return dataURL;
    },

    /**
     * 将字符串转为对象
     * @param {string} str
     */
    parseToObj(str: string): Object {
        let strArr = str.split(";");
        let obj = {};
        strArr.forEach((item) => {
            let vk = item.split("=");
            obj[vk[0]] = vk[1];
        });
        return obj;
    },

    //原生判断dom节点是否包含class
    hasClass(el, cls) {
        if (el && el.className) {
            return el.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
        }
    },
    //给dom节点添加class
    addClass(el, cls) {
        if (!this.hasClass(el, cls)) {
            el.className += " " + cls;
        }
    },
    //删除dom节点class
    removeClass(el, cls) {
        if (this.hasClass(el, cls)) {
            var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
            el.className = el.className.replace(reg, " ");
        }
    },
    //原生切换dom节点class
    toggleClass(el, cls) {
        if (this.hasClass(el, cls)) {
            this.removeClass(el, cls);
        } else {
            this.addClass(el, cls);
        }
    },

    //移动数组元素位置
    moveArray(arr, index, tindex) {
        if (index > tindex) {
            arr.splice(tindex, 0, arr[index]);
            arr.splice(index + 1, 1);
        } else {
            arr.splice(tindex + 1, 0, arr[index]);
            arr.splice(index, 1);
        }
        return arr;
    },
    //数组两个元素互换
    tradeArray(arr, index, tindex) {
        return (arr[index] = arr.splice(tindex, 1, arr[index])[0]);
    },

    //添加事件绑定 注：addEventListener()添加的匿名函数无法移除
    addHandler(element, event, handler, type = false) {
        if (element.addEventListener) {
            element.addEventListener(event, handler, type);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, handler);
        } else {
            element["on" + event] = handler; //直接赋给事件
        }
        return function () {
            if (element.removeEventListener) {
                element.removeEventListener(event, handler, type);
            } else if (element.deattachEvent) {
                //IE
                element.deattachEvent("on" + event, handler);
            } else {
                element["on" + event] = null; //直接赋给事件
            }
        };
    },

    //取消事件绑定 注：addEventListener()添加的匿名函数无法移除
    removeHandler(element, event, handler, type = false) {
        //Chrome
        if (element.removeEventListener) {
            element.removeEventListener(event, handler, type);
        } else if (element.deattachEvent) {
            //IE
            element.deattachEvent("on" + event, handler);
        } else {
            element["on" + event] = null; //直接赋给事件
        }
    },

    //生成[n,m]的随机整数
    randomNum(minNum, maxNum) {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    },

    //判断元素是否在可视区域
    isElementInViewport(el) {
        let rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight)
        );
    },

    //判断对象类型
    typeOf(obj) {
        const { toString } = Object.prototype;
        const map = {
            "[object Boolean]": "boolean",
            "[object Number]": "number",
            "[object String]": "string",
            "[object Function]": "function",
            "[object Array]": "array",
            "[object Date]": "date",
            "[object RegExp]": "regExp",
            "[object Undefined]": "undefined",
            "[object Null]": "null",
            "[object Object]": "object",
            "[object Map]": "map",
            "[object Set]": "set",
        };
        return map[toString.call(obj)];
    },

    // 本地存储
    // localStorage
    setLocal($key:string, $value:any, $expire?) {
        var object = {
            value: $value,
            timestamp:
                ($expire && parseInt($expire) + new Date().getTime()) || "0"
        };
        localStorage.setItem($key, JSON.stringify(object));
    },
    getLocal($key:string) {
        var cache = localStorage.getItem($key);
        if (cache) {
            var object = JSON.parse(localStorage.getItem($key)),
                dateString = object.timestamp,
                now = new Date().getTime().toString();
            if (dateString != "0" && now > dateString) {
                localStorage.removeItem($key);
                return null;
            }
            return object.value;
        } else return null;
    },
    removeLocal($key:string) {
        localStorage.removeItem($key);
    },
    // sessionStorage
    setSession($key:string, $value:any) {
        var object = {
            value: $value
        };
        sessionStorage.setItem($key, JSON.stringify(object));
    },
    getSession($key:string) {
        var cache = JSON.parse(sessionStorage.getItem($key));
        if (cache) {
            return cache.value;
        }else{
            return null;
        }
    },
    removeSession($key:string) {
        sessionStorage.removeItem($key);
    },
};

export default util;
