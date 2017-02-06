var webGLUtil = (function(){
    function getWebGLContext(canvas){
        var name = ['webgl', 'exprimental-webgl', 'webkit-3d', 'moz-webgl'];
        var context = null;
        for(var i = 0, len = name.length; i < len; i++){
            try{
                context = canvas.getContext(name[i]);
            }catch(e){}
            if(context) break;
        }
        return context;
    }
    return {
        getWebGLContext: getWebGLContext
    }
})();