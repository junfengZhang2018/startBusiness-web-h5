const helper = {
    setLocal($key:string, $value:any, $expire) {
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
}

export default helper;