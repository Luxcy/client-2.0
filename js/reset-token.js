$(document).ready(function(){
    function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }
    var token=getUrlParam('token');
    //window.location.href='reset.html';
    $("#signin-btn").click(function(){
        var password = $.trim($("#password").val());
        var confirm_password = $.trim($("#confirm-password").val());
         if(password == ""||confirm_password==""){
             return false;
         }
         //ajax去服务器端校验
         $.ajax({
             type:"POST",
             url:"http://172.25.88.4:5000/reset_password",
             data:{"password":password,"confirm_password":confirm_password,"token":token},
             dataType:'json',
             success:function(data2){
                console.log(data2);
                 if(data2.result=='error'){
                    alert(data2.message);
                 }else{
                    alert(data2.message);
                 }
                 window.location.href='login.html';
             },
             error: function(jqXHR){
             alert("发生了错误xxx：" + jqXHR.status);  
            },   
         });
    }); 
});

