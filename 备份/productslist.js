/**
 * Created by apple on 2017/6/5.
 */
//function query(url){
//    var obj = {}
//
//    var str = url.split("?")[1]
//    var arr = str.split("&");
//    arr.forEach(function(value){
//        var key = value.split("=")[0];
//        var value = value.split("=")[1];
//        obj[key] = value;
//    })
//    return obj;
//}


(function(){
    var url = window.location.href;
    var obj = tools.query(url);
    var pagesize;
    var totalCount;
    var pageid = obj.pageid

//拿到了对应的id
    $.ajax({
        url:"http://127.0.0.1:9090/api/getcategorybyid",
        data:{
            categoryid :obj.categoryId
        },
        success:function(data){
            //console.log(data);
            var tplStr = template('tpl',data);
            console.log();
            $("#choose span:nth-child(1)").append(tplStr);
        }
    })

    render();

    function render(){
        //var url = window.location.href;
        //var obj = tools.query(url);
        //var pageid = obj.pageid;

        $.ajax({
            url:"http://127.0.0.1:9090/api/getproductlist",
            data:{
                categoryid :obj.categoryId,
                pageid:obj.pageid || 1
            },
            success:function(data){
                //console.log(data);
                //渲染当前页面数据
                var tplStr = template('tpl1',data);
                $("#content ul").html(tplStr);
                //获得数据总条数
                pagesize = data.pagesize;
                totalCount = data.totalCount;

                //currentid = obj.pageid
                titlePage = Math.ceil(totalCount / pagesize);
                //动态创建option
                setOption();

                $("select option").eq(pageid-1).attr("selected",true).siblings().attr("selcted",false);

                getNext();

                setSelect();

                getPrev();
            }
        })
    }

    function setOption(){

        var select = document.querySelector("select");
        for(var i = 0;i<titlePage;i++){
            var option = document.createElement("option");
            option.innerHTML = (i+1)+"|"+titlePage;
            option.value = i+1;
            select.appendChild(option);
        }
    }
//    //翻页：下一页
    function getNext() {

        $("#display .page span:nth-last-child(1)").click(function () {


            //设置当前的被选中的select option
            //var url = window.location.href;
            //var obj = tools.query(url);
            //var pageid = obj.pageid;

            if (pageid >= titlePage) {
                alert("已经是最后一页了");
                return false;
            }
            pageid++;
            //render();
            location.href="productlist.html?categoryId="+obj.categoryId+"&category="+obj.category+"&pageid="+pageid;
        })
    }
    //翻转：上一页
    function getPrev(){

        $("#display .page span:first-child").click(function(){
            //var url = window.location.href;
            //var obj = tools.query(url);
            //var pageid = obj.pageid

            //    //设置当前的被选中的select option
            if(pageid <= 1){
                alert("已经是第一页了");
                return false;
            }

            pageid--;
            //console.log(obj);
            //render();
            location.href="productlist.html?categoryId="+obj.categoryId+"&category="+obj.category+"&pageid="+pageid;

        })

    }

    ////   下拉框操作
    function setSelect() {
        //谁被选中了选中了之后找到当前的valuez值 让currendid=value然后统一了全部的变量
        //在实现getNext(currentid)

        $("select").change(function () {
            var id = $(this).val();
            window.location.href="productlist.html?categoryId=0&category=电视&pageid="+id;
        })
    }
//    实现三级页面数据传送 用localeStorage
    function getCookie(url){

    }
})()/**
 * Created by apple on 2017/6/6.
 */
