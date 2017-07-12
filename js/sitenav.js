/**
 * Created by apple on 2017/6/8.
 */
(function(){

    getData();
    function getData(){
        $.ajax({
            url:Route.urlBase+"api/getsitenav",
            dataType:'json',
            success:function(data){
                var tplStr = template("tpl",{list:data.result});
                $("#navshow ul").html(tplStr);
            }
        })
    }
})()