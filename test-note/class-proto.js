// 对象继承梳理

function fun(){
    this.name = 'fn'; 
    console.log(this)
};
fun.prototype.getName = function(){
    this.type = 'fun'
    console.log(this.name)
}
fun.prototype.getType = function(){
    console.log(this.type)
}

function cort(){}
cort.prototype = fun.prototype
function sub(){fun.call(this)}
sub.prototype = new cort
sub.prototype.show = function(){return true}

var s = new sub

// 等同于，返回对象结构一致。下面的方法低版本IE不支持，故用上面的方法做兼容

function fun(){
    this.name = 'fn'; 
    console.log(this)
};
fun.prototype.getName = function(){
    this.type = 'fun'
    console.log(this.name)
}
fun.prototype.getType = function(){
    console.log(this.type)
}

function sub(){fun.call(this)}
sub.prototype = {__proto__: fun.prototype}  // 或 sub.prototype = Object.create(fun.prototype)
sub.prototype.show = function(){return true}
var s = new sub

// sub {name: "fn"}
// name: "fn"
// __proto__: fun
//     show:function()
//     __proto__: Object
//         constructor:function fun()
//         getName:function()
//         getType:function()
//         __proto__:Object
// 原理：fun.call(this) 将fun构造函数中的this对象转到sub中。
// sub.prototype 添加了一层__proto__包含show
// {__proto__: fun.prototype} 或 new cort 中又添加了一层 __proto__ 包含func中的prototype属性
// 在s.getName()添加了this.type后，会将type添加到sub对象中，即sub{name: "fn", type: "fun"}

// =================================================================

function fun(){
    this.name = 'fn'; 
    console.log(this)
};
fun.prototype.getName = function(){
    this.type = 'fun'
    console.log(this.name)
}
fun.prototype.getType = function(){
    console.log(this.type)
}
function sub(){fun.call(this)}
sub.prototype = fun.prototype
sub.prototype.show = function(){return true}
var s = new $.sub();

//  sub {name: "fn"}
//  name: "fn"
//  __proto__: Object
//     constructor:function fun()
//     getName:function()
//     getType:function()
//     show:function()
//     __proto__:Object
// 原理：fun.call(this) 将fun构造函数中的this对象转到sub中。
// sub.prototype = fun.prototype，在sub.prototype中添加属性相当于在fun.prototype中添加，故显示在fun的__proto__中
// 会修改父类fun的prototype对象，故不采用

// =================================================================

function fun(){
    this.name = 'fn'; 
    console.log(this)
};
fun.prototype.getName = function(){
    this.type = 'fun'
    console.log(this.name)
}
fun.prototype.getType = function(){
    console.log(this.type)
}

function sub(){}
sub.prototype = new fun
sub.prototype.show = function(){return true}
var s = new sub

//  fun {name: "fn"}
//  name: "fn"
//  show:function()
//  __proto__: Object
//     constructor:function fun()
//     getName:function()
//     getType:function()
//     __proto__:Object

// 原理：new fun 会生成如下对象
// {
//  fun {name: "fn"}
//  name: "fn"
//  __proto__: Object
//     constructor:function fun()
//     getName:function()
//     getType:function()
//     __proto__:Object
// }
// 将这个对象赋值给sub.prototype后，对sub.prototype的操作即是对该对象的操作。故会在这个对象中直接添加show属性
// 应该是如下结构，因为sub本身没有任何属性，故直接显示fun
//  sub{}
//  __proto__:fun
//    name: "fn"
//    show:function()
//    __proto__: Object
//       constructor:function fun()
//       getName:function()
//       getType:function()
//       __proto__:Object
// 在s.getName()当前的this指向s。故添加了this.type后，会将type添加到sub对象中，即
//  sub{type: "fun"}
//  type: "fun"
//  __proto__:fun
//    name: "fn"
//    show:function()
//    __proto__: Object
//       constructor:function fun()
//       getName:function()
//       getType:function()
//       __proto__:Object

