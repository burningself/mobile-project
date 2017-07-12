/**
 * Created by apple on 2017/6/4.
 */
(function(){
    var obj = tools.query(location.href);
    var productid = obj.productid;

    renderDate();
    function renderDate(){
        //获取当前的api接口地址
        getDate(function(data){
            //console.log(data);
            var tplStr = template("tpl",data.result[0]);
            $("#des").html(tplStr)
            //console.log(tplStr);
        });

    }
//      ajax获取数据
    function getDate(callback){
        var url = Route.urlBase+"api/getmoneyctrlproduct";
        $.ajax({
            url:url,
            datatype:'json',
            data:{
                productid:productid
            },
            success:function(data){
                callback(data);
            }
        })
    }


})()