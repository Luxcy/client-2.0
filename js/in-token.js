    $("#signin-btn").click(function(){
        var email = $.trim($("#email").val());
        var password = $.trim($("#password").val());
        var url = "127.0.0.1";
        //var url = "172.20.76.59";
        //var url = "172.25.88.5";
         if(email == ""){
             return false;
         }else if(password == ""){
             return false;
         }
         //ajax去服务器端校验
         $.ajax({
             type:"POST",
             url:"http://"+url+":5000/login",
             data:{"email":email,"password":password},
             dataType:'JSON',
             success:function(data2){
                console.log(data2);
                 if(data2.result=='error'){
                    alert(data2.message);
                 }else{
                    var token=btoa(data2.token+":");
                    sessionStorage.setItem("token","Basic "+token);
                    window.location.href='client.html';
                 }
             },
             error: function(jqXHR){
             alert("发生了错误xxx：" + jqXHR.status);  
            },   
         });
    }); 
    $(document).keyup(function(event){
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('#signin-btn').click();
        }
    });


