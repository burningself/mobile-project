/**
 * Created by apple on 2017/6/4.
 */

(function(){

    renderPage();
    //渲染页面
    function renderPage(){
        //获取当前的额地址栏
        var obj = getCurURL();
        obj.pageid = obj.pageid || 0;
        //获取数据   -->  回调函数要执行很多 不能直接洗createOption
        package(obj.pageid,function(data){
        //动态创建option
            createOption(data.totalCount,data.pagesize);
        //渲染模板引擎
            var tplStr = template("tpl",data);
            $("#display ul").html(tplStr);
            //console.log(obj.pageid);
            $("select option").eq(obj.pageid-1).attr("selected",true).siblings().attr("selected",false)
            getNext(obj,data);
            getPrev(obj);
            getSelect(obj);
        });
        //seclect框
        function getSelect(obj){
            //console.log(obj.pageid);
            $("select").change(function(){
                obj.pageid = $(this).val()*1+1;
                location.href="moneyctrl.html?pageid="+obj.pageid;
            })
        }
        //   下一页按钮
        function getNext(obj,data){
            $(".page .next").click(function(){
                obj.pageid++;
                var totalPage = Math.floor(data.totalCount/data.pagesize);
                if(obj.pageid >= Math.floor(data.totalCount/data.pagesize)){
                    obj.pageid = totalPage;
                }
                package(obj.pageid,function(data){
                    var tplStr = template("tpl",data);
                    $("#display ul").html(tplStr);
                });
                //更新页面的pageid之后要重新渲染页面数据
                location.href="moneyctrl.html?pageid="+obj.pageid;
            })

        }
        //   上一页按钮
        function getPrev(obj){
            $(".page .prev").click(function(){
                obj.pageid--;
                if(obj.pageid <= 0){
                    obj.pageid = 0;
                    return false;
                }
                package(obj.pageid,function(data){
                    var tplStr = template("tpl",data);
                    $("#display ul").html(tplStr);
                });
                location.href="moneyctrl.html?pageid="+obj.pageid;
            })

        }

    }
    // 获取当前地址栏
    function getCurURL() {
        var url = location.href;
        return tools.query(url);
    }
    // 获取当前的接口地址以及封装ajax
    function package(id,callback){
        url =  Route.urlBase+'api/getmoneyctrl';
    //    调用ajax
        $.get( url,{pageid:id},function(data){
            callback && callback(data);
        },'json')
    }
    //    动态创建option
    function createOption(totalCount,pagesize){
        var pageCount = Math.ceil(totalCount / pagesize);
        for(var i= 0;i<pageCount-1;i++){
            $("<option value="+i+">"+(i+1)+"/"+(pageCount-1)+"</option>").appendTo("select");
        }
    }

})()

