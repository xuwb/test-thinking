$(function(){
    $('body').on('click', 'button', function(){
        console.log(JSON.stringify(serialize('body')));
    })

    var REX = /^(.+)\.(.+)/,
        K = function(a){return a};

    function serialize(form, factory) {
        form = $(form);
        var i = 0,
            obj,
            name,
            parseArr = [],
            formList, exclude,
            json = {};
        factory = factory || K;
        //获取序列化list
        formList = form.find('[data-serialize-name]');
        //排除list
        exclude = form.find('.JS-serialize-exclude');
        //获取所有的表单，但是排除序列化list内的表单
        form = form.find('input,select,textarea,button')
                   .not(exclude.find('input,select,textarea,button'))
                   .not(formList.find('input,select,textarea,button'));
        for (; obj = form[i]; i++) {
            if ((name = obj.name) && (obj.disabled === false)) {
                switch(obj.type){
                    //对radio的处理
                    case 'radio':
                        if(!obj.checked){
                            continue;
                        }
                    break;
                    //对于checkbox的特殊处理
                    case 'checkbox':
                        if(obj.checked){
                            if(!json[name]){
                                json[name] = [];
                                parseArr.push(name);
                            }
                            json[name].push($.trim(obj.value));
                        }
                        continue;
                    break;
                    // case 'textarea':
                    //  json[name] = form.eq(i).val();
                    //  continue;
                    // break;
                }
                //用JQ的val方法可以对IE下textarea的回车\r\n做处理
                json[name] = $.trim(form.eq(i).val());
            }
        };
        //对checkbox的解析 [1,2,3] => 1,2,3
        breakEachArr(parseArr, function(item){
            json[item] = json[item].join(',');
        });
        //对一层对象的解析 {"a.b": "c"} => {"a": {"b": "c"}}
        breakEachObj(json, function(val, key, obj){
            if(REX.test(key)){
                var tempObj = obj[RegExp.$1] || (obj[RegExp.$1] = {});
                tempObj[RegExp.$2] = val;
                delete obj[key];
            }
        });
        //对formList的解析
        formList.each(function(){
            var node = $(this),
                serializeName = node.data('serializeName'),
                list,
                obj;
            if( !(list = json[serializeName]) ){
                list = json[serializeName] = [];
            };
            obj = serialize(node);
            !isEmpty(obj) && list.push(obj);
        });
        return factory(json);
    }
    function isEmpty(o) {
        if(o === null) return true;
        var count = 0;
        for(var key in o) {
            count++;
        }
        if(count == 0) return true;
        return false;
    }
    //遍历数组
    function breakEachArr(arr, callback, context){
        var index = 0,
            length = arr.length;
        for(; index < length; index++){
            if(callback.call(context, arr[index], index, arr)){
                break;
            }
        }
    }
    function breakEachObj(obj, callback, context){
        for(var i in obj){
            if(obj.hasOwnProperty(i)){
                if(callback.call(context, obj[i], i, obj)){
                    break;  
                }
            }
        }
    }
})
