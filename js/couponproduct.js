/**
 * Created by apple on 2017/6/8.
 */
(function(){

    getData();
    function getData(){
        var str = location.href;
        var obj = tools.query(str);
        var coupontitle = decodeURI(obj.coupontitle);
        var couponid = obj.couponid;
        $("#header h1").text(coupontitle+"优惠券");
        var url = Route.urlBase+"api/getcouponproduct";
        $.get(url,{couponid:couponid},function(data){
            var tplStr = template("tpl",{list:data.result});
            $(".discount ul").html(tplStr);
            $(".discount ul li").click(function(){
                $("#model").show();
                var index = $(this).index();
                $("#model div").html(data.result[index].couponProductImg)
            })
            $("#model a").click(function(){
                $("#model").hide();
            });
        },'json')
    }

})()