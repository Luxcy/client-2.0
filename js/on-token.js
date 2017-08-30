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
             url:"http://172.25.88.5:5000/register",
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


