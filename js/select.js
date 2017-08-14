$(document).ready(function(){
    /*var t=new Date();
    var v=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();
    $("#starttime1").val(v);
    $("#endtime1").val(v);*/
    $("#starttime1").val("2010-1-2");
    $("#endtime1").val("2010-4-16");
    $('#Timeselection .time').timepicker({
        'timeFormat': 'g:i:s',
        'step':15
    });

    $('#Timeselection .date').datepicker({
        'format': 'yyyy-m-d',
        'autoclose': true
    });

    var ExampleEl = document.getElementById('Timeselection');
    var defaultDeltaDatepair = new Datepair(ExampleEl, {
        'anchor': null//starttime++ endtime++ yes or no 
    });
});