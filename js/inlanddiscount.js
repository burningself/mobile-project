/**
 * Created by apple on 2017/6/6.
 */
(function(){
    getData();
    function getData(){
        $.ajax({
            url:Route.urlBase+'api/getinlanddiscount',
            dataType:'json',
            type:'get',
            success:function(data){
                //console.log(data.result);
                var arr = [];
                var brr = [];
                for(var i = 0;i<data.result.length;i++){
                    //console.log(i);
                    if(i<data.result.length-4){
                        arr.push(data.result[i])
                    }else{
                        brr.push(data.result[i])
                    }
                }
                //callback(data);
                var tplStr = template("tpl",{list:arr});
                $(".content").html(tplStr);
                //console.log(document.body.clientHeight);
                var flag = true;
                $(document).scroll(function(){

                    var LisH = document.body.clientHeight;
                    var screenH = window.screen.height;
                    var scrollTop = $(this).scrollTop();

                    //ÁÙ½çÌõ¼þ
                    if(scrollTop > LisH - screenH  && flag) {
                        flag=false;
                        var tplStr = template("tpl",{list:brr});
                        $(".content").append(tplStr);
                    }
                })
            }
        })
    }
})()