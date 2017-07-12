/**
 * Created by apple on 2017/6/8.
 */
(function(){



    getData();
    function getData(){
        var url = Route.urlBase+"api/getcoupon";
        $.get(url,function(data){
            console.log(data);
            var tplStr = template("tpl",{list:data.result});
            //console.log(tplStr);
            $("#content ul").html(tplStr);
        },'json')
    }
})()