
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

                getCookie();
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


            if (pageid >= titlePage) {
                alert("已经是最后一页了");
                return false;
            }
            pageid++;
            location.href="productlist.html?categoryId="+obj.categoryId+"&category="+obj.category+"&pageid="+pageid;
        })
    }
    //翻转：上一页
    function getPrev(){

        $("#display .page span:first-child").click(function(){

        //    //设置当前的被选中的select option
            if(pageid <= 1){
                alert("已经是第一页了");
                return false;
            }

            pageid--;
            location.href="productlist.html?categoryId="+obj.categoryId+"&category="+obj.category+"&pageid="+pageid;

        })

    }

    ////   下拉框操作
    function setSelect() {

        $("select").change(function () {
            var id = $(this).val();
            window.location.href="productlist.html?categoryId=0&category=电视&pageid="+id;
        })
    }

//    实现三级页面数据传送 用localeStorage
    function getCookie(){
        //console.log(url);
       localStorage.setItem("category",obj.category);
       localStorage.setItem("url",url);

    }
})()