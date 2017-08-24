
var wsServer = 'ws://'+location.hostname+':8002';
var random=location.search.split('random=')[1];

var ws ;
var sendObj={
    id:random,
    action:'start'
}
var loginObj={
    id:random,
    action:'login'
}
ws = new WebSocket(wsServer);

ws.onopen = function (e) {
    ws.send(JSON.stringify(sendObj));
    console.log("Connected to WebSocket server.");
} ;
ws.onmessage = function(e) {
    console.log(e)
}

document.getElementById('login').onclick=function(){
    ws.send(JSON.stringify(loginObj));
}

