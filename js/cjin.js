var Url = "http://172.25.88.5:5000/iaga";
var URL = "http://172.25.88.5:5000/istp";
var SelectNum = 0;
var token = window.sessionStorage.getItem('token');
if(token == null){
    window.location.href = 'login.html';
}