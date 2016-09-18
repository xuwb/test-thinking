var Cookie = {
	setItem: function(key, value, exdays) {
		var d = new Date();
		// d.setTime(d.getTime() + exdays*24*60*60*1000)
		d.setDate(d.getDate() + (exdays || 365) );
		document.cookie = key + '=' +escape(value) + (exdays == null ? '' : ';expire=' + d.toGMTString());
	},
	getItem: function(key) {
		var reg = new RegExp('(^|;\\s*)'+key+'=([^;]*?)(?=;|$)'),
			value = null;
		if(match = document.cookie.match(reg)) {
			value = match[2]; 
		}
		return value;
	},
	// 通过设置同名cookie，过期时间改为已过期的方法删除
	removeItem: function(key) {
		// this.setItem(key, '', -1);
		var val, exp = new Date();
		exp.setTime(exp.getTime() - 1);
		if(val = this.getItem(key)) {
			document.cookie = key + '=' + val + ';expire=' + exp;
		}
	},
	clear: function() {
		var reg = /[^;=]+(?=\=)/g;
		if(keys = document.cookie.match(reg)){
			for(var i = 0, len = keys.length; i < len; i++) {
				this.setItem(keys[i], '', -1)
			}
		}
	}
}
var storage = window.localStorage || Cookie;
// return storage;