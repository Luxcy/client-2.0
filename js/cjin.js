// var Url = "http://172.25.88.5:5000/api/v1.0/iaga";
// var URL = "http://172.25.88.5:5000/api/v1.0/istp";
var Url = "http://127.0.0.1:5000/iaga";
var URL = "http://127.0.0.1:5000/istp";
// var Url = "http://172.20.76.59:5000/iaga";
// var URL = "http://172.20.76.59:5000/istp";
var istpNum = 0;
var iagaNum = 0;
var LineNum = 0;
var token = window.sessionStorage.getItem('token');
if(token == null){
    window.location.href = 'login.html';
}