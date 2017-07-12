/**
 * Created by apple on 2017/6/8.
 */
(function(){


    getData(Route.urlBase+"api/getgsshop","tpl",".shop");
    getData(Route.urlBase+"api/getgsshoparea","tpl1",".area");

    function getData(url,tpl,ele){
        $.ajax({
            url:url,
            dataType:'json',
            success:function(data){
                //console.log(data);
                var tplStr = template(tpl,{list:data.result});
                //console.log(tplStr);
                $(ele).html(tplStr);

                shot();
            }
        })
    }

    get2Data(Route.urlBase+"api/getgsproduct")
    function get2Data(url,shopid,areaid){
        $.ajax({
            url:url,
            dataType:'json',
            data:{
                shopid : shopid || 0,
                areaid :areaid || 0
            },
            success:function(data){
                //console.log(data);
                var tplStr = template("tpl2",{list:data.result})
                //console.log(tplStr);
                $("#display ul").html(tplStr);
            }
        })
    }


//   shop栏下拉点击事件
    shot();
    function shot(){

        $(".dropDown").on("click","span",function(){
            var $div = $(this).parent().next().children(".wrap").eq($(this).index());
            $div.toggle().siblings().hide();
            var shopid = 0,areaid = 0;

            $div.on("click","a",function(){


                $(this).parent().addClass("on").siblings().removeClass("on");

                shopid = $(this).parent().attr("shopid")?$(this).parent().attr("shopid") : shopid;
                areaid = $(this).parent().attr("areaid")?$(this).parent().attr("areaid") : areaid;


                get2Data(Route.urlBase+"api/getgsproduct",shopid,areaid);

                var index = $(this).parent().parent().index();
                var value = $(this).text();
                var val = value.split("（")[0];

                $(this).parent().parent().parent().prev().children("span").eq(index).html(val+"<i></i>");
                $(this).parent().parent().hide();
            })

        })


    }
})()