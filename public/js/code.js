
var wsServer = 'ws://'+location.hostname+':8002'
var ws ;
var random=document.getElementById('random').innerHTML;
var sendObj={
    random:random
}
ws = new WebSocket(wsServer);

ws.onopen = function (e) {
    console.log("Connected to WebSocket server.");
} ;
ws.onmessage = function(e) {
    var data=e.data;
    var cont=document.getElementById("content");
    if(data.indexOf('login')!=-1){
        cont.innerHTML = '已经有人扫了这个二维码'
    }
    if(data.indexOf('ok')!=-1){
        cont.innerHTML = '登录成功'
    }
}
setTimeout(function(){
    ws.send(JSON.stringify(sendObj));
},1000)