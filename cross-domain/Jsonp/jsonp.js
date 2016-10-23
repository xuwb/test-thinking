var JSONP = {
    now: function() {
        return (new Date()).getTime();
    },
    getRandomStr: function() {
        return Math.random().toString().substr(3);
    },
    removeElem: function(elem) {
        var parent = elem.parentNode;
        parent && parent.nodeType !== 11 && parent.removeChild(elem);
    },
    createElem: function(elemName, parentNode, attrs) {
        var node = document.createElement(elemName);
        for(var key in attrs) {
            node.setAttribute(key, attrs[key]);
        }
        parentNode.appendChild(node);
    },
    parseData: function(data) {
        var param = '';
        if(typeof data === 'string') {
            param += data;
        }
        if(Object.prototype.toString.call(data) === '[object Object]') {
            for(var key in data) {
                param += '&' + key + '=' + data[key];
            }
        }
        param += '&' + this.now();
        return param.substr(1);
    },
    getJson: function(url, data, func) {
        var self = this;

        var callbackName = '';
        // url合并参数
        url += (url.indexOf('?') == -1 ? '?' : '&') + this.parseData(data);
        // 获取回调函数名称
        var match = /callback=(\w+)/.exec(url);
        // url已包含回调函数名
        if(match && match[1]) {
            callbackName = match[1];
        } else {
            // callback=?未包含回调函数名
            callbackName = 'jsonp_' + this.now() + '_' + this.getRandomStr();
            url.replace(/callback=(\?|%3F)/, 'callback=' + callbackName);
        }

        // 创建远程调用的回调函数
        window[callbackName] = function(data) {
            window[callbackName] = undefined;
            self.removeElem(document.getElementById('id_' + callbackName));
            func(data);
        }

        // 创建script
        this.createElem('script', document.getElementsByTagName('head')[0], {
            id: 'id_' + callbackName,
            type: 'text/javascript',
            src: url
        });
    }
}