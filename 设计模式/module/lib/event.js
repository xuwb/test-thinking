F.module('lib/event', ['lib/dom'], function(dom){
    return {
        on: function(id, type, fn) {
            dom.g(id)['on' + type] = fn;
        }
    }
})