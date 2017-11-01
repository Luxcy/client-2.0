 //var SelectNum
function findall(o,num){
    for(var i=0;i<o.length;i++){
        if(o[i].nodeName!="#text"&&o[i].nodeName!="#comment"){

            if(o[i].hasAttribute("id") == true){
                o[i].setAttribute("id", o[i].getAttribute("id").replace(/\d+/,num));
            }
            findall(o[i].childNodes,num);
        }
    }
}
function copy(name,num,id){
    var sourceNode = document.getElementById(name+0);
    var clonedNode = sourceNode.cloneNode(true); // 克隆节点
    num += 1; 
    var vbn = name + num; 
    clonedNode.setAttribute("id",vbn);

    var o = clonedNode.childNodes;
    findall(o,num);
    document.getElementById(id).appendChild(clonedNode);
}
function addiaga(){
    //copy("iaga_part",iagaNum,"searchpart0");
    copy("iaga_part",iagaNum,"part_iaga");
    copy("popSta",iagaNum,"all");
    copy("select_timespan",iagaNum,"graph_iaga");
    copy("loading",iagaNum,"graph_iaga");
    iagaNum = iagaNum + 1;
    $("#graph_iaga").append('<div id="chart-part'+iagaNum+'"></div>')

    var html='<div id="tablepart'+iagaNum+'" style="display:none;">'
             +'<table id="contour_table'+iagaNum+'" class="cell-border" cellspacing="0" width="100%">' 
             +'<tbody id="table'+iagaNum+'"></tbody>' 
             +'</table>' 
             +'</div>';
    $("#table_iaga").append(html);
    document.getElementById("table_stations"+iagaNum).style.display = "none";
    document.getElementById("riaga"+iagaNum).style.display = "";
    init_iaga(iagaNum);
}
function removeiaga(str1){
    var num = "";
    for(var i=0;i<str1.length;i++){
        if(str1[i]>='0'&&str1[i]<='9')
            num+=str1[i];
    }
    $("#iaga_part"+num).remove();
    $("#popSta"+num).remove();
    $("#select_timespan"+num).remove();
    $("#loading"+num).remove();
    $("#chart-part"+num).remove();
    $("#tablepart"+num).remove();
}
function addistp(){
    copy("istp_part",istpNum,"part_istp");
    istpNum = istpNum + 1;
    $("#graph_istp").append('<div id="graph_mult'+istpNum+'"></div>');
    $("#table_istp").append('<div id="table_mult'+istpNum+'"></div>');
    document.getElementById("ristp"+istpNum).style.display = "";
    init_istp(istpNum);
}
function removeistp(str1){
    var num = "";
    for(var i=0;i<str1.length;i++){
        if(str1[i]>='0'&&str1[i]<='9')
            num+=str1[i];
    }
    $("#istp_part"+num).remove();
}