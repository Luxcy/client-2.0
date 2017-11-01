 
    $("#signup-btn").click(function(){
        var url = "127.0.0.1";
        //var url = "172.25.88.10";
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
             url:"http://"+url+":5000/register",
             data:{"username":username,"email":email,"password":password},
             dataType:'json',
             success:function(data2){
                if(data2.error==undefined){
                    document.getElementById("part-one").style.display="none";
                    document.getElementById("part-two").style.display="block";
                    $("#b_message").html(data2.message);
                }else {
                    alert(data2.error);
                }
             }, 
             error: function(XMLHttpRequest, textStatus, errorThrown) {
            }, 
         });
 }); 
    $("#signup-btn2").click(function(){
        window.location.href='login.html';
    }); 
    $(document).keyup(function(event){
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('#signup-btn').click();
        }
    });

