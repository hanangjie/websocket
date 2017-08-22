
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
setTimeout(function(){
    ws.send(JSON.stringify(sendObj));
},1000)