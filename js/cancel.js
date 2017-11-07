
var ajaxs = [];
var oldAjax = $.ajax;

$.ajax = function() {
    var args = Array.prototype.slice.call(arguments);
    var ajax = oldAjax.apply(this, args);
    ajaxs.push(ajax);
    return ajax;
}

// 新增abortAll函数。
function abortAll() {
    $.each(ajaxs, function(i, ajax) {
        ajax.abort();
    });
}
$('#cancelBtn').click(function() {
    abortAll();
});