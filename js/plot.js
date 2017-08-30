function add0(m){return m<10?'0'+m:m }
// stamp*1000 --->  string 
function format(stamp)
{
    var time = new Date(stamp);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}
// date  --> string yy-mm-dd h:m:s
Date.prototype.format = function(){
    var o = {
        "y":this.getFullYear(),
        "m": this.getMonth() + 1, //月份 
        "d": this.getDate(), //日 
        "h": this.getHours(), //小时 
        "n": this.getMinutes(), //分 
        "s": this.getSeconds(), //秒 
    };
     
    return o.y+"-"+o.m+"-"+o.d+" "+o.h+":"+o.n+":"+o.s;
}
//time add 
Date.prototype.add = function (part, value){
    value *= 1;  
    if (isNaN(value)) {  
        value = 0;  
    }  
    switch (part) {  
        case "y":  
            this.setFullYear(this.getFullYear() + value);  
            break;  
        case "m":  
            this.setMonth(this.getMonth() + value);  
            break;  
        case "d":  
            this.setDate(this.getDate() + value);  
            break;  
        case "h":  
            this.setHours(this.getHours() + value);  
            break;  
        case "n":  
            this.setMinutes(this.getMinutes() + value);  
            break;  
        case "s":  
            this.setSeconds(this.getSeconds() + value);  
            break;  
        default:  
   
    }  
}
/*
function getData3(){        
      var defer = $.Deferred();
        $.ajax({
            url : 'p.php',            //async : false,            success: function(data){
                defer.resolve(data)

        });        return defer.promise();
    }  
*/

// !!!!!! if(cnt==0) how to do 
function send(minTime){
    var defer = $.Deferred();
    $.ajax({ 
        type: "GET",
        url: Url+"/data?"
             +"sample_rate="+$("#sample_rate").val()+"&term="+$("#term").val()
             +"&data_type="+$("#data_type").val()[0]
             +"&start_time="+minTime
             +"&end_time="+minTime,
        dataType: "JSON",
        //async:false,
        beforeSend: function(request){
            token = window.sessionStorage.getItem('token');
            request.setRequestHeader("Authorization", token);
        },
        success: function(data) {
            defer.resolve(data);
         }

    });
    return defer.promise();
}
/*
var stationName=[];
var stationLon=[];
var stationLat=[];
*/
var frames = [];
var NUM = 0;
var steps = [];
var MINTIME;
var PLAYBTN=0;
//frames[i] = {data:[{x:[],y:[],z:[]}], name: num}
//frames[i].data[0].z
//frames[i].name


//steps[1].args[0]  steps[1].label



function contourOne(){
    var longitude = [];
    var latitude = [];
    var station_code = [];
    var term = [];
    var contour_time = [];
    var station_name = [];
    var cnt;
    var datas = [];
    var data = [];

    $.when(send(MINTIME)).done(function(data){
        datas = data.data;
        cnt = data.count;
        var tr = $("#term").val();
        for(var i=0;i<cnt;i++){
            latitude[i] = stationLat[datas[i]["IAGA CODE"]];
            longitude[i] = stationLon[datas[i]["IAGA CODE"]]-180;
            station_name[i] = stationName[datas[i]["IAGA CODE"]];
            term[i] = datas[i][tr];
            contour_time[i] = format(datas[i]["time_stamp"]*1000);
            station_code[i] = datas[i]["IAGA CODE"];
        }
        var name_code=[];
        var name_code2=[];
        for(var i=0;i<cnt;i++)
       {
            name_code2[i] = station_name[i]+"("+station_code[i]+")";
            name_code[i] = "station:"+name_code2[i];
       }

        frames[NUM] = {data:[{x:[],y:[],z:[],text:[]}], name:contour_time[0]}
        frames[NUM].data[0].x = longitude;
        frames[NUM].data[0].y = latitude;
        frames[NUM].data[0].z = term;
        frames[NUM].data[0].text = name_code;

        steps[NUM] = {
            label: contour_time[0],
            method: "animate",
            args: [[contour_time[0]], {
                mode: "immediate",
                transition: {duration: 300},
                frame: {duration: 300, "redraw": true}
              }
            ]
          };
        NUM++;
        
        //============================================================================
        var data = [{
            type:'contour',
            x: frames[NUM-1].data[0].x,
            y: frames[NUM-1].data[0].y,
            z: frames[NUM-1].data[0].z,
            text:frames[NUM-1].data[0].text,
            lines:{
                width:0,
            }
        }];
        var layout = {
            xaxis:{
                range:[-180,180],
                zeroline:false,
                showline:true,
                mirror:'ticks',
                ticks:'inside'
            },
            yaxis:{
                range:[-90,90],
                zeroline:false,
                showline:true,
                mirror:'ticks',
                ticks:'inside'
            },
            sliders: [{
                active: 0,
                steps:steps,
                x: 0.1,
                len: 0.9,
                xanchor: "left",
                y: 0,
                yanchor: "top",
                pad: {t: 50, b: 10},
                currentvalue: {
                    visible: true,
                    prefix: "Time:",
                    xanchor: "right",
                    font: {
                    size: 20,
                    color: "#666"
                    }
                },
                transition: {
                    duration: 300,
                    easing: "cubic-in-out"
                }
            }]
        };
        Plotly.newPlot('chart-part', data, layout).then(function() {
            Plotly.addFrames('chart-part', frames); 
        });


        //==================================================================================
        $('#contour_table').html("");
        var html1='<thead>'
                +'<tr>'
                +'<th>台站(IAGA CODE)</th>'
                +'<th>时间</th>'
                +'<th>经度</th>'
                +'<th>纬度</th>'
                +'<th class="term_name">磁分量</th>'
                +'</tr>'
                +'</thead>'
                +'<tfoot>'
                +'<tr>'
                +'<th>台站(IAGA CODE)</th>'
                +'<th>时间</th>'
                +'<th>经度</th>'
                +'<th>纬度</th>'
                +'<th class="term_name">磁分量</th>'
                +'</tr> '
                +'</tfoot> '
                +'<tbody id="table1">'
                +'</tbody> ';
        obj = document.getElementById("contour_table_wrapper");
        if(obj){
            $('#contour_table').dataTable().fnDestroy();
        }

        $('#contour_table').html(html1);
        $('#table1').html("");
        document.getElementById("contour_table").style.display="block";
        var html='';
        for(var i=0;i<cnt;i++){
            html+='<tr>'
                +'<td>'+name_code2[i]+'</td>'
                +'<td>'+contour_time[i]+'</td>'
                +'<td>'+longitude[i]+'</td>'
                +'<td>'+latitude[i]+'</td>'
                +'<td>'+term[i]+'</td>'
                +'</tr>';
        }
        $('#table1').html(html);
        table=$('#contour_table').DataTable({
            "bAutoWidth": false,
            "searching":false,
            "order": [[1, "asc"],[0,"asc"]]
            /*"destroy":true*/
         });
         
        $(".term_name").html("磁分量"+tr);  

    });
}

var globalID=null;
function timeadd(){
    var d = new Date(Date.parse(MINTIME.replace(/-/g, "/")));
    d.add("d",1);
    MINTIME=d.format();
}
function play(){
    var longitude = [];
    var latitude = [];
    var station_code = [];
    var term = [];
    var contour_time = [];
    var station_name = [];
    var cnt;
    var datas = [];
    var data = [];

    $.when(send(MINTIME)).done(function(data){
        if(PLAYBTN){
            return;
        }
        datas = data.data;
        cnt = data.count;
        console.log(MINTIME);
        console.log(cnt);
        var tr = $("#term").val();
        for(var i=0;i<cnt;i++){
            latitude[i] = stationLat[datas[i]["IAGA CODE"]];
            longitude[i] = stationLon[datas[i]["IAGA CODE"]]-180;
            station_name[i] = stationName[datas[i]["IAGA CODE"]];
            term[i] = datas[i][tr];
            contour_time[i] = format(datas[i]["time_stamp"]*1000);
            station_code[i] = datas[i]["IAGA CODE"];
        }
        var name_code=[];
        var name_code2=[];
        for(var i=0;i<cnt;i++)
       {
            name_code2[i] = station_name[i]+"("+station_code[i]+")";
            name_code[i] = "station:"+name_code2[i];
       }

        frames[NUM] = {data:[{x:[],y:[],z:[],text:[]}], name:contour_time[0]}
        frames[NUM].data[0].x = longitude;
        frames[NUM].data[0].y = latitude;
        frames[NUM].data[0].z = term;
        frames[NUM].data[0].text = name_code;

        steps[NUM] = {
            label: contour_time[0],
            method: "animate",
            args: [[contour_time[0]], {
                mode: "immediate",
                transition: {duration: 300},
                frame: {duration: 300, "redraw": true}
              }
            ]
          };
        NUM++;
        timeadd();
        //========================================================================
        var data=frames[NUM-1].data[0];
        var layout= {
                sliders: [{
                    active:NUM-1,
                    steps:steps,
                }],
                transition: {
                    duration: 0,
                },
                frame: {
                  duration: 0,
                  redraw: false,
                }
            };
        Plotly.animate('chart-part', {data,layout}).then(function() {
            Plotly.addFrames('chart-part', frames); 
        }); 
        globalID=requestAnimationFrame(play); 

        //========================================================================
        var add=[];
        for(var i=0;i<cnt;i++){
            add[i]=[name_code2[i],contour_time[i],longitude[i],latitude[i],term[i]];
        }
        table.rows.add(add).draw();

    });
    
}

$("#run").click(function(){
    PLAYBTN=0;
    timeadd();
    play();
})
$("#stop").click(function(){
    PLAYBTN=1;
    cancelAnimationFrame(globalID);
})

 

function Logoutbtn(){
    sessionStorage.removeItem("token");
    window.location.href='login.html';
}

$(document).ready(function(){
    $("#search").click(function(){
        document.getElementById("contour_table").style.display="none";
        if($("#graph").val()=="contour"){
            console.log("contour");
             NUM = 0;
             MINTIME = $("#starttime1").val()+" "+$("#starttime2").val();
            contourOne();
        }
        else 
            line();
    });
});

 /* 
    function getData3(){        
        var defer = $.Deferred();
        $.ajax({ 
            type: "GET",
            url: Url+"/stations",
            dataType: "JSON",
            //async:false,
            beforeSend: function(request) {
            token = window.sessionStorage.getItem('token');
            request.setRequestHeader("Authorization", token);
            defer.resolve(data);
        }
            
        });
        return defer.promise();
    }    
    $('.btn3').click(function(){
        $('.loadingicon').show();
        $.when(getData3()).done(function(data){
            $('.loadingicon').hide();
            alert(data);
        });
    });
    */