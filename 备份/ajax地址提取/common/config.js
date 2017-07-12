(function() {

    var Route = {
        baseUrl : "http://192.168.16.63:8888/"
    };


    /**
     * 获取首页上面的菜单栏数据
     * 方法名：getindexmenu
     * 请求方式：get
     * 传参:无
     * 返回数据样例：
     *     {
                "result": [{
                    "indexmenuId": “菜单的id”,
                    "name": "菜单的名称",
                    "img": "菜单的图片",
                    "titlehref": "菜单的链接地址"
                }]
            }
     */

    // getindexmenu( function( res ) {
    //     console.log( res );
    // })




    // 获取数据的 ajax 请求
    function getindexmenu(callback) {
        var url = Route.baseUrl + '/api/getindexmenu';
        $.get( url, function( res ) {
            callback && callback( res );
        }, 'json');
    }


    window.Route = Route;

})();