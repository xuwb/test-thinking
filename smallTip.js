// for in 循环在IE8下的兼容问题
// 在IE8下会遍历新添加的属性，输出a1,b1,c1。其他浏览器不会遍历新属性只会输出a1,b1
// 用jquery的each做兼容，或自己写兼容函数
var aa = {0:'a1', 1:'b1'}
// for(var i in aa){
//     aa.c = 'c1'; 
//     console.log(aa[i])
// }

// each 兼容函数
var each = function(obj, callback){
    var keys = [];
    if(Object.keys) {
        keys = Object.keys(obj)
    } else {
        for(var key in obj){
            keys.push(key);
        }
    }
    for(var i = 0; i < keys.length; i++){
        callback.call(obj, obj[keys[i]], keys[i], obj);
    }
}

each(aa, function(val, key){
    aa.c = 'c1';
    console.log(val, this);
})

// 返回 a1 Object {0: "a1", 1: "b1", c: "c1"}
//      b1 Object {0: "a1", 1: "b1", c: "c1"}