$(document).ready(function(){
    $("#now_date").val($("#starttime1").val());
    $("#now_time").val($("#starttime2").val());

    $('#now_time').timepicker({
        'timeFormat': 'g:i:s',
        'step':15
    });

    $('#now_date').datepicker({
        'format': 'yyyy-m-d',
        'autoclose': true
    });
});


