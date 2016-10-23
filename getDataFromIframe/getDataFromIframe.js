var iframeMethod = {
    createElem: function(elemName, parentNode, attrs) {
        var node = document.createElement(elemName);
        for(var key in attrs) {
            node.setAttribute(key, attrs[key]);
        }
        parentNode.appendChild(node);
        return node;
    },
    removeElem: function(elem) {
        var parent = elem.parentNode;
        parent && parent.nodeType !== 11 && parent.removeChild(elem);
    },
    dealWithUrl: function(urlList){
        var Promise = limit.promise();
        var defList = limit.map(urlList, function(a, b){
            return new Promise(function(resolve){
                var img = new Image();
                img.onload = img.onerror = function(){
                    resolve();
                    img.onload = img.onerror = null;
                };
                img.src = a;
            });
        });
        // IE下会报错，通过catch再处理
        Promise.all(defList).then(function(){
            location.href = '/portal/main/domain/index.htm';
        })['catch'](function(e){
            location.href = '/portal/main/domain/index.htm';
        });
    },
    main: function(){
        var frame = logout.createElem("iframe", window.top.document.body, {
                "src": "frame.html",
                "height": 0,
                "frameborder": "no",
                "id": "logout-iframe",
                "name": "logout-iframe",
                "style": "display:hidden;"
            }),
            win = window.frames["logout-iframe"];
        frame.onload = function() {
            var htmlStr = win.document.getElementById("back-data").innerText,
                urlList = htmlStr.split("||");
            console.log(htmlStr);
            logout.dealWithUrl(urlList), logout.removeElem(document.getElementById("logout-iframe"))
        }
    }
};
iframeMethod.main();