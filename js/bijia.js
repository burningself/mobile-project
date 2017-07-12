/**
 * Created by apple on 2017/6/6.
 */
(function(){

    renderDate();

    function renderDate(){

        getTitleData(renderTitle);

        getProData(function(data){
            //渲染引擎
            var tplStr = template("tplPro",data.result[0]);
            $(".exhibe").html(tplStr);
         });

        getComData(function(data){
            var tplStr = template("tplCom",{list:data.result});
            $(".comment").append(tplStr);
        });
    };

    function renderTitle(data){

        var productName = data.result[0].productName.split(" ")[0];
        var category = decodeURI(localStorage.getItem("category"));
            //console.log(localStorage.getItem("url"));
        $("#choose").find("a:nth-child(2)").text(category + " >");
        $("#choose").find("a:nth-child(2)").attr("href",localStorage.getItem("url"));
        $("#choose").find("a:nth-child(3)").text(productName + " >");

    };

    function getTitleData(callback){
        var obj = getArg();
        $.ajax({
            url:"http://127.0.0.1:9090/api/getproduct",
            data:{
                productid:obj.productid
            },
            success:function(data){
                callback(data);
            }
        })

    };
    //2.通过ajax拿到数据(封ajax和url)
    function getComData(callback){

        var obj = getArg();
        $.ajax({
            url:"http://127.0.0.1:9090/api/getproductcom",
            data:{
                productid:obj.productid
            },
            success:function(data){
                //console.log(data);
                callback(data)
            }
        })
    };

    function getProData(callback){
        var obj = getArg();
        $.ajax({
            url:"http://127.0.0.1:9090/api/getproduct",
            data:{
                productid:obj.productid
            },
            success:function(data){
                //console.log(data);
                callback(data)
            }
        })
    };
    //根据url拿到参数对象
    function getArg(){
        var url = window.location.href;
        return tools.query(url);
    };


})()