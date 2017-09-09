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
    var sourceNode = document.getElementById(name+num);
     var clonedNode = sourceNode.cloneNode(true); // 克隆节点
     num += 1; 
    var vbn = name + num; 
    clonedNode.setAttribute("id",vbn);

    var o = clonedNode.childNodes;
    findall(o,num);
    document.getElementById(id).appendChild(clonedNode);
   // sourceNode.parentNode.appendChild(clonedNode); 
}
function addK(){
    copy("selection_part",SelectNum,"all");
    copy("popSta",SelectNum,"all");
    copy("select_timespan",SelectNum,"Section1");
    copy("loading",SelectNum,"Section1");
    //copy2("chart-part",SelectNum,"Section1");
    //copy2("tablepart",SelectNum,"Section2");
    SelectNum = SelectNum + 1;
    $("#Section1").append('<div id="chart-part'+SelectNum+'"></div>')

    var html='<div id="tablepart'+SelectNum+'" style="display:none;">'
             +'<table id="contour_table'+SelectNum+'" class="cell-border" cellspacing="0" width="100%">' 
             +'<tbody id="table'+SelectNum+'"></tbody>' 
             +'</table>' 
             +'</div>';
    $("#Section2").append(html);
    //SelectNum = SelectNum + 1;
    document.getElementById("table_stations"+SelectNum).style.display="none";
    init_select(SelectNum);
    $("#selection_part"+SelectNum).css({"top": "75.4px", "left": "667px","position":"absolute","z-index":"3"});
    $("#selection_part"+SelectNum).draggable();
}
function removeK(){
    if(SelectNum==0) return;
    $("#selection_part"+SelectNum).remove();
    $("#popSta"+SelectNum).remove();
    $("#select_timespan"+SelectNum).remove();
    $("#loading"+SelectNum).remove();
    $("#chart-part"+SelectNum).remove();
    $("#tablepart"+SelectNum).remove();
    SelectNum -= 1;
}