var PubSub = {
    // 订阅(subscribe)，即trigger时都可以触发订阅了eventName的函数
    on: function(eventName, callback){
        this._callEvent || (this._callEvent = {});
        var calls = (this._callEvent[eventName] || (this._callEvent[eventName] = []));
        calls.push(callback);
        return this;
    },
    // 发布(publish)
    trigger: function(){
        var args = [].slice.call(arguments),
            eventName = args.shift(), list;

        if(!this._callEvent) return this;
        list = this._callEvent[eventName] || [];

        for(var i = 0, len = list.length; i < len; i++){
            // 在执行时将this指向触发的对象，当前为PubSub。
            // 用于在$.extend(obj, PubSub)时，this会自动转向obj
            // 即 obj.trigger()时，this指向obj
            list[i].apply(this, args);
        }
        return this;
    }
}
// 使用
// PubSub.on('aa', function(key){console.log(key, this)});
// PubSub.trigger('aa', 'trigger_aa');

// // 如果on当中是个构造函数
// function cort(key){
//     cort.showKey(key);
// }
// cort.showKey = function(key){
//     console.log(key, this);
// }
// PubSub.on('cort', cort);
// PubSub.trigger('cort', 'cort_key');


// 将PubSub放入sub的原型
function sub(key){
    this.key = key;
}
for(var val in PubSub){
    if(!PubSub.hasOwnProperty(val)) continue;
    sub.prototype[val] = PubSub[val];
}
var s = new sub('new_key');
s.on('new', function(){
    console.log(this.key, this);
});
s.trigger('new');