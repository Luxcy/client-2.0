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
    // if(name=="iaga_part"){
    //     var node = document.getElementById(id)
    //     node.insertBefore(clonedNode,node.childNodes[0]);
    // }else{
        document.getElementById(id).appendChild(clonedNode);
 //   }
   // sourceNode.parentNode.appendChild(clonedNode); 
}
function addiaga(){
    //copy("iaga_part",SelectNum,"searchpart0");
    copy("iaga_part",SelectNum,"part_iaga");
    copy("popSta",SelectNum,"all");
    copy("select_timespan",SelectNum,"graph_iaga");
    copy("loading",SelectNum,"graph_iaga");
    SelectNum = SelectNum + 1;
    $("#graph_iaga").append('<div id="chart-part'+SelectNum+'"></div>')

    var html='<div id="tablepart'+SelectNum+'" style="display:none;">'
             +'<table id="contour_table'+SelectNum+'" class="cell-border" cellspacing="0" width="100%">' 
             +'<tbody id="table'+SelectNum+'"></tbody>' 
             +'</table>' 
             +'</div>';
    $("#table_iaga").append(html);
    document.getElementById("table_stations"+SelectNum).style.display = "none";
    document.getElementById("riaga"+SelectNum).style.display = "";
    init_iaga(SelectNum);
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
    copy("istp_part",SelectNum,"part_istp");
    //copy("loading",SelectNum,"Section1");
    SelectNum = SelectNum + 1;
    document.getElementById("ristp"+SelectNum).style.display = "";
    init_istp(SelectNum);
}
function removeistp(str1){
    var num = "";
    for(var i=0;i<str1.length;i++){
        if(str1[i]>='0'&&str1[i]<='9')
            num+=str1[i];
    }
    $("#istp_part"+num).remove();
    //$("#loading"+num).remove();
}