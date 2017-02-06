function compile(html) {
    var fnBody="var template_array=[];\n\
                var fn = (function(data){\n\
                    var template_key = '';\n\
                    for(key in data){\n\
                        template_key += 'var ' + key + '=data[\"' + key + '\"];'\n\
                    }\n\
                    eval(template_key);\n\
                    template_array.push('" + _dealTpl(html) + "');\n\
                    template_key = null;\n\
                })(templateData);\n\
                fn = null;\n\
                return template_array.join('');";
    // 返回一个函数，参数为 templateData
    // template_array.push 在_dealTpl中为字符串，故使用new Function方式返回，而不用返回匿名函数
    return new Function('templateData', fnBody);
}
function _dealTpl(html) {
    var _left = '{{',
        _right = '}}';
    return String(html)
        .replace(/lt;/g, '<')
        .replace(/gt;/g, '>')
        .replace(/[\r\t\n]/g, '')
        .replace(new RegExp(_left+'=(.*?)'+_right, 'g'), "',typeof($1)==='undefined'?'':$1,'")
        .replace(new RegExp(_left, 'g'), "');")
        .replace(new RegExp(_right, 'g'), "template_array.push('");
}