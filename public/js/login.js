
var wsServer = 'ws://'+location.hostname+':8002';
var random=location.search.split('random=')[1];

var ws ;
var sendObj={
    login:random
}
var loginObj={
    ok:random
}
ws = new WebSocket(wsServer);

ws.onopen = function (e) {
    console.log("Connected to WebSocket server.");
} ;
ws.onmessage = function(e) {
    console.log(e)
}

document.getElementById('login').onclick=function(){
    ws.send(JSON.stringify(loginObj));
}
setTimeout(function(){
    ws.send(JSON.stringify(sendObj));
},1000)

