var Waiter = function(){
    var dfd=[],
        doneArr = [],
        failArr = [],
        slice = Array.prototype.slice,
        that = this;

    var Primise = function(){
        this.resolved = false;
        this.rejected = false;
    };

    Primise.prototype = {
        resolve: function(){
            this.resolved = true;
            if(!dfd.length) return;
            for(var i = dfd.length - 1; i >=0; i--){
                if(dfd[i] && !dfd[i].resolved || dfd[i].rejected) {
                    return;
                }
                dfd.splice(i, 1);
            }
            _exec(doneArr);
        },
        reject: function(){
            this.rejected = true;
            if(!dfd.length) return;
            dfd.splice(0);
            _exec(failArr);
        }
    }

    that.Deferred = function(){
        return new Primise();
    }

    that.when = function(){
        dfd = slice.call(arguments);
        var i = dfd.length;
        for(i--; i > 0; i--){
            if(!dfd[i] || dfd[i].resolved || dfd[i].rejected || !dfd[i] instanceof Primise){
                dfd.splice(i, 1);
            }
        }
        return that;
    }

    that.done = function(){
        doneArr = doneArr.concat(slice.call(arguments));
        return that;
    }

    that.fail = function(){
        failArr = failArr.concat(slice.call(arguments));
        return that;
    }

    function _exec(arr){
        var i = 0,
            len = arr.length;

        for(; i<len; i++){
            try{
                arr[i] && arr[i]();
            } 
            catch(e){}
        }
    }
}

var waiter = new Waiter();

var first = function(){
    var dtd = waiter.Deferred();
    var t_first = setTimeout(function(){
        console.log('first finish');
        clearTimeout(t_first);

        dtd.resolve();
    }, 1000);
    return dtd;
}();

var second = function(){
    var dtd = waiter.Deferred();
    var t_second = setTimeout(function(){
        console.log('second finish');
        clearTimeout(t_second);

        dtd.resolve();
    }, 2000);
    return dtd;
}();

waiter
    .when(first, second)
    .done(function(){
        console.log('success');
    }, function(){
        console.log('success again');
    }).done(function(){
        console.log('success third');
    })