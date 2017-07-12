/**
 * Created by apple on 2017/6/8.
 */
(function(){

    getData();
    function getData(){
        var url = Route.urlBase+"api/getbrandtitle";
        $.get(url,function(data){
                console.log(data);
                //data.brandtitle = data
                var tplStr =  template("tpl",{list:data.result});
                 $(".category-list").html(tplStr);
               store();
        },'json')
    }

     function store(){
         var brr = {};
         $(".category-list li").each(function(){
             var categoryid =$(this).attr("categoryid")
             var brandtitle = $(this).attr("brandTitle");
             brr[categoryid] = brandtitle;
         })
         console.log(brr);

         localStorage.setItem('category',JSON.stringify(brr))

         //console.log(brr);
         //console.dir(localStorage.getItem());
     }



    //var obj = { name : 123 };
    //localStorage.setItem('person', JSON.stringify( obj ) );
    //
    //
    //
    //var newPerson = localStorage.getItem('person');
    //var newPersonObj = JSON.parse(newPerson);

})()