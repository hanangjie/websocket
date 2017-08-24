
var wsServer = 'ws://'+location.hostname+':8002'
var ws ;
var random=document.getElementById('random').innerHTML;

ws = new WebSocket(wsServer);

ws.onopen = function (e) {
    console.log("Connected to WebSocket server.");
} ;
ws.onmessage = function(e) {
    var arr=JSON.parse(e.data);
    var cont=document.getElementById("content");
    
    for(var i=0;i<arr.length;i++){
        if(arr[i].id == random){
            if(arr[i].action=="start"){
                cont.innerHTML = '已经有人扫了这个二维码'
            }
            if(arr[i].action=="login"){
                cont.innerHTML = '登录成功';
                localStorage.name='手机';
                localStorage.sex='boy';
                setTimeout(function() {
                  location.href='./nsn'
                }, 1000);
            }
        }
    }
}