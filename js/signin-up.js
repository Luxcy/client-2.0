function setTab(name,cursel,n){
    for(i=1;i<=n;i++){
        var menu=document.getElementById(name+i);
        var con=document.getElementById(name+i+"_form");
        menu.className=i==cursel?"hover1":"";
        con.style.display=i==cursel?"block":"none";
    }
}
function signin_display(name,cursel,n)
{
    document.getElementById("signin-up").style.display="block";
    setTab(name,cursel,n);
}
function signup_display(name,cursel,n)
{
    document.getElementById("signin-up").style.display="block";
    setTab(name,cursel,n);
}
function sign_display()
{
    document.getElementById("signin-up").style.display="none";
}
function logout_btn()
{
    sessionStorage.removeItem("token");
    document.getElementById('logout_btn_top').style.display='none';
    document.getElementById('signup_btn_top').style.display='block';
    document.getElementById('signin_btn_top').style.display='block';
}
$(document).ready(function(){
    var t=sessionStorage.getItem("token");
    console.log("token="+t);
    if(t!=null){
        console.log("====");
    document.getElementById('logout_btn_top').style.display='block';
    document.getElementById('signup_btn_top').style.display='none';
    document.getElementById('signin_btn_top').style.display='none';
        console.log("===================");
    }
});

