    $("#signup-btn").click(function(){

        var username = $.trim($("#username").val());
        var email = $.trim($("#email").val());
        var password = $.trim($("#password").val());
        
         if(username ==""){
            return false;
         }
         if(email == ""){
             return false;
         }else if(password == ""){
             return false;
         }
         $.ajax({
             type:"POST",
             url:"http://172.25.88.4:5000/register",
             data:{"username":username,"email":email,"password":password},
             dataType:'json',
             success:function(data2){
                if(data2.error==undefined){
                    alert("You're almost ready to go! please check your email to activate your account.");
                    window.location.href="login.html";
                }else {
                    alert(data2.error);
                }
             }, 
             error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert("112231");
             var result = eval("("+XMLHttpRequest.responseText+")");
             console.log(result.message);
            }, 
         });
 }); 


