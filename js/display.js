var Url="http://172.25.88.4:5000";
function Station_display(str)
{
    if(str=="contour")
       document.getElementById("table_stations").style.display="none";
   else 
       document.getElementById("table_stations").style.display="";
}
function showDivFun(){
    document.getElementById('popSta').style.display='block';
}

function closeDivFun(){
    document.getElementById('popSta').style.display='none';
}