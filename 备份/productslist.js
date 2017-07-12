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

//�õ��˶�Ӧ��id
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
                //��Ⱦ��ǰҳ������
                var tplStr = template('tpl1',data);
                $("#content ul").html(tplStr);
                //�������������
                pagesize = data.pagesize;
                totalCount = data.totalCount;

                //currentid = obj.pageid
                titlePage = Math.ceil(totalCount / pagesize);
                //��̬����option
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
//    //��ҳ����һҳ
    function getNext() {

        $("#display .page span:nth-last-child(1)").click(function () {


            //���õ�ǰ�ı�ѡ�е�select option
            //var url = window.location.href;
            //var obj = tools.query(url);
            //var pageid = obj.pageid;

            if (pageid >= titlePage) {
                alert("�Ѿ������һҳ��");
                return false;
            }
            pageid++;
            //render();
            location.href="productlist.html?categoryId="+obj.categoryId+"&category="+obj.category+"&pageid="+pageid;
        })
    }
    //��ת����һҳ
    function getPrev(){

        $("#display .page span:first-child").click(function(){
            //var url = window.location.href;
            //var obj = tools.query(url);
            //var pageid = obj.pageid

            //    //���õ�ǰ�ı�ѡ�е�select option
            if(pageid <= 1){
                alert("�Ѿ��ǵ�һҳ��");
                return false;
            }

            pageid--;
            //console.log(obj);
            //render();
            location.href="productlist.html?categoryId="+obj.categoryId+"&category="+obj.category+"&pageid="+pageid;

        })

    }

    ////   ���������
    function setSelect() {
        //˭��ѡ����ѡ����֮���ҵ���ǰ��valuezֵ ��currendid=valueȻ��ͳһ��ȫ���ı���
        //��ʵ��getNext(currentid)

        $("select").change(function () {
            var id = $(this).val();
            window.location.href="productlist.html?categoryId=0&category=����&pageid="+id;
        })
    }
//    ʵ������ҳ�����ݴ��� ��localeStorage
    function getCookie(url){

    }
})()/**
 * Created by apple on 2017/6/6.
 */
