$.ajax({ 
    type: "GET",
    url: Url+"/reported_type",
    dataType: "JSON",
    beforeSend: function(request) {
        token = window.sessionStorage.getItem('token');
        request.setRequestHeader("Authorization", token);
    },
    success: function(data) {
        datas=data.Reported;
        document.getElementById("reported_type").options.length=0;
        document.getElementById("term").options.length=0;
        for(var i=0;i<datas.length;i++)
            document.getElementById("reported_type").options.add(new Option(datas[i],datas[i]));
        for(var i=0;i<datas[0].length;i++)
            document.getElementById("term").options.add(new Option(datas[0][i],datas[0][i]));

    },
    error: function(jqXHR){
        alert("发生错误：" + jqXHR.status);  
    },     
});
function reportedTerm(){
    document.getElementById("term").options.length=0;
    var t=$("#reported_type").val();
    for(var i=0;i<t.length;i++)
        document.getElementById("term").options.add(new Option(t[i],t[i]));
}