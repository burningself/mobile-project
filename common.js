/* 公共函数库 */

(function() {

    /* 解析url 转换成 对象键值对 */
    function query( url ) {
        var obj = {};
        // 解析字符串 进行拼接 成 对象
        var str = url.split('?')[1];
        if(!str){
            return {};
        }
        // 在进行切割
        var arr = str.split('&');
        arr.forEach( function( value ) {
            var arrObj = value.split( "=" );
            var key = arrObj[ 0 ];
            var value = arrObj[ 1 ];
            // 将对象的键值对 添加到对象中
            obj[ key ] = value;
        })
        return obj;
    }

    var Route = {
        urlBase : "http://127.0.0.1:9090/"
    }


    function getCurURL() {
        var url = window.location.href;
        return tools.query(url);
    }


    window.tools = {
        query : query
    };
    window.Route = Route;

    window.getCurURL = getCurURL;

})();
