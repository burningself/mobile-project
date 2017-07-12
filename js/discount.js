/**
 * Created by apple on 2017/6/7.
 */
(function(){

    getData();
    function getData(){
        var url = location.href;
        var obj = tools.query(url);
        var productid = obj.productid;
        $.ajax({
                url:Route.urlBase+"api/getdiscountproduct",
                datatype:'json',
                data:{
                    productid:productid
                },
                success:function(data){
                    console.log(data);
                    var tplStr = template("tpl",data.result[0]);
                    //console.log(tplStr);
                    $("#des").html(tplStr)
                }
            }
        )
    }
})()