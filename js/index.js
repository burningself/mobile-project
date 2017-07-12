/**
 * Created by apple on 2017/6/4.
 */
(function(){
    $.ajax({
        url:"http://127.0.0.1:9090/api/getindexmenu",
        dataType:"jsonp",
        success:function(data){
            var tplStr = template("tpl1",{list:data.result});
//            console.log(tplStr);
//            console.log(data);
            $("#nav ul").html(tplStr);
            $("#nav li").eq(7).click(function(){
                $(this).nextAll().toggle();
            })
        }
    });
    $.ajax({
        url:"http://127.0.0.1:9090/api/getmoneyctrl",
        dataType:"jsonp",

        success:function(data){
            var tplStr = template("tpl2", {list: data.result});
            $("#display ul").html(tplStr);
        }
    })
})()
