/**
 * Created by apple on 2017/6/4.
 */

(function(){

    renderPage();
    //��Ⱦҳ��
    function renderPage(){
        //��ȡ��ǰ�Ķ��ַ��
        var obj = getCurURL();
        obj.pageid = obj.pageid || 0;
        //��ȡ����   -->  �ص�����Ҫִ�кܶ� ����ֱ��ϴcreateOption
        package(obj.pageid,function(data){
        //��̬����option
            createOption(data.totalCount,data.pagesize);
        //��Ⱦģ������
            var tplStr = template("tpl",data);
            $("#display ul").html(tplStr);
            //console.log(obj.pageid);
            $("select option").eq(obj.pageid-1).attr("selected",true).siblings().attr("selected",false)
            getNext(obj,data);
            getPrev(obj);
            getSelect(obj);
        });
        //seclect��
        function getSelect(obj){
            //console.log(obj.pageid);
            $("select").change(function(){
                obj.pageid = $(this).val()*1+1;
                location.href="moneyctrl.html?pageid="+obj.pageid;
            })
        }
        //   ��һҳ��ť
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
                //����ҳ���pageid֮��Ҫ������Ⱦҳ������
                location.href="moneyctrl.html?pageid="+obj.pageid;
            })

        }
        //   ��һҳ��ť
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
    // ��ȡ��ǰ��ַ��
    function getCurURL() {
        var url = location.href;
        return tools.query(url);
    }
    // ��ȡ��ǰ�Ľӿڵ�ַ�Լ���װajax
    function package(id,callback){
        url =  Route.urlBase+'api/getmoneyctrl';
    //    ����ajax
        $.get( url,{pageid:id},function(data){
            callback && callback(data);
        },'json')
    }
    //    ��̬����option
    function createOption(totalCount,pagesize){
        var pageCount = Math.ceil(totalCount / pagesize);
        for(var i= 0;i<pageCount-1;i++){
            $("<option value="+i+">"+(i+1)+"/"+(pageCount-1)+"</option>").appendTo("select");
        }
    }

})()

