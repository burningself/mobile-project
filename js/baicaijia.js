/**
 * Created by apple on 2017/6/7.
 */
;(function(){

    getData();
    function getData(){
        var url = location.href;
        var obj = tools.query(url);
        var titleid = obj.titleId ||0;
        $.get(Route.urlBase+"api/getbaicaijiatitle",function(data){

            var tplStr = template("tplTitle",data);
            $(".title-l ul").html(tplStr);
            $(".title-l ul li").eq(titleid).addClass("active");
            var $ul = $(".title-l ul");
            $ul[0].style.transition="transform .5s";
            setulW()
            moveUl($ul);
            var moveX = 0;
            for(var i=0;i<titleid;i++){
                moveX += $ul.children("li").width();
            }
            clickTitle(titleid);
            $ul[0].style.transform="translateX("+(-1/2*moveX)+"px)";

        },'json')
    }
    function setulW(){
        var lisW = 0;
        $(".title-l ul li").each(function(){
             lisW += $(this).width();
        })
        $(".title-l ul").css("width",lisW+$(".title-r").width());
    }
    function clickTitle(titleid){
        $(".title-l ul li").on("click",function(){
            titleid  = $(this).index();
            location.href = "baicaijia.html?titleId="+titleid;
        })
    }
    function moveUl($ul){
        var startX = 0;
        var centerX = 0
        $ul.on("touchstart",function(e){
            startX = e.originalEvent.changedTouches[0].clientX;
        });
        $ul.on("touchmove",function(e){
            var dy = e.originalEvent.changedTouches[0].clientX - startX ;
            var tempX = dy+centerX;
            this.style.transform="translateX("+tempX+"px)";
            //this.style.transition="transform .5s";

        });
        $ul.on("touchend",function(e){
            var dy = e.originalEvent.changedTouches[0].clientX - startX;
            centerX += dy;
        //    结束的时候判断他是否弹回去

            if(centerX > 20){
                centerX = 0;
                this.style.transform="translateX(0)";
                this.style.transition="transform .5s";
            }

            var endX = $(this).parent().width()-$(this).width()
            if(centerX < endX){
                centerX = endX;
                this.style.transform="translateX("+endX+"px)";
                this.style.transition="transform .5s";
            }

        })
    }
    get2Data();
    function get2Data(){
        var url = location.href;
        var obj = tools.query(url);
        var titleid = obj.titleId || 0;
        $.ajax({
            url:Route.urlBase+"api/getbaicaijiaproduct",
            dataType:'json',
            data:{
                titleid:titleid
            },
            success:function(data){
                var tplStr = template("tplContent",{list:data.result})
                $("#content ul").append(tplStr);
                $("#content").css("height",$("#content ul").height())
            }
        })
    }

})()


