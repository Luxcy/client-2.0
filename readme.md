# 全局变量
+ 获得台站信息
++ stationName[IAGA CODE]
++ stationLon[IAGA CODE]
++ stationLat[IAGA CODE]
+ contour 
++ frames[] frames[i] = {data:[{x:[],y:[],z:[]}], name: time}
++ steps[] 
*** var step={
        label: "2010",
        method: "animate",
        args: [["2010"], {
            mode: "immediate",
            transition: {duration: 300},
            frame: {duration: 300, "redraw": true}
          }
        ]
      }; 
***
+ mintime 开始时间
# 参数
++ contour 2d 
+++ x:longitude
+++ y:latitude
+++ z:term
+++ text:name_code   "station:"+station_name+"("+station_code+")"

++ contour table
+++ all contour 除了 name_code()
+++ contour_time 
+++ contour_code2
# 函数
+ 关于contour
++ play() : 生成动画
++ contourOne(): 第一针 

