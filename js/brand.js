/**
 * Created by apple on 2017/6/8.
 */
(function(){


    var str = localStorage.getItem('category');
    var category = JSON.parse(str);


   getData();
    function getData(){
        var url = Route.urlBase+"api/getbrand";
        var obj=tools.query(location.href);
        var brandtitleid = obj.brandtitleid;
        $.get(url,{brandtitleid:brandtitleid},function(data){
            var tplStr = template("tplBrand",{list:data.result});
            $("#content .goods ul").html(tplStr);
            $("#content .goods ul li").eq(0).find("span").addClass("first");
            $("#content .goods ul li").eq(1).find("span").addClass("second");
            $("#content .goods ul li").eq(2).find("span").addClass("third");
        },'json')
    }

    getRankData();
    function getRankData(){
        var url = Route.urlBase+"api/getbrandproductlist";
        var obj=tools.query(location.href);
        var brandtitleid = obj.brandtitleid;
        //console.log(brandtitleid);
        $.get(url,{brandtitleid:brandtitleid,pagesize :4},function(data){
            console.log(data);
            var tplStr = template("tplRank",{list:data.result})
            //console.log(tplStr);
            $("#content .sales ul").html(tplStr);
            getCommentData(data.result);

        },'json')
    }

    function getCommentData(data){
        //console.log(data);
        //console.log(data["result"]);
            var  img   = data[0].productImg;
            //console.log(img);
            var productid = data[0].productId;
            var title = data[0].productName;

            var url = Route.urlBase+"api/getproductcom";
            $.get(url,{productid:productid},function(data){

            var tplStr = template("tplComments",data);
            $("#content .comments").html(tplStr);
            $(".message .pic .left").html(img);
            $(".message .pic h3").html(title);
            //console.log($(".message").html());
        },'json')
    }

})()