function fun(){
    this.name = 'fn'; 
    console.log(this)
};
fun.prototype.getName = function(){
    console.log(this.name)
}
var obj = {a: 'a1', name: 'obj'}

// 使用：
// 直接调用函数
var bindFun = fun.bind(obj)();      // 返回 obj
// new调用
var newFun = new (fun.bind(obj))    // 返回 fun{name: 'fn'}
newFun.getName();                   // 返回 fn

var fixBind = function(fn, context){
    var cort = function(){}
    function bound(){
        fn.apply(this instanceof cort ? this : context || {}, arguments)
    }
    cort.prototype = fn.prototype;
    bound.prototype = new cort
    return bound
}

// 使用：
// 返回值同上。在new的使用不改变this指向，依然为fun
var fixBindFun = fixBind(fun, obj)();
var newFixFun = new (fixBind(fun, obj));  // 返回 bound{name: 'fn'}
newFixFun.getName();