    $("#signin-btn").click(function(){
        var url = "127.0.0.1";
       // var url = "172.25.88.10";
        var email = $.trim($("#email").val());
         if(email == ""){
             return false;
         }
         //ajax去服务器端校验
         $.ajax({
             type:"POST",
             url:"http://"+url":5000/forget_password",
             data:{"email":email},
             dataType:'json',
             success:function(data2){
                document.getElementById("part-one").style.display="none";
                document.getElementById("part-two").style.display="block";
                $("#b_message").html(data2.message);
             },
             error: function(jqXHR){
             alert("发生了错误xxx：" + jqXHR.status);
            },   
         });
    }); 


