
var wsServer = 'ws://'+location.hostname+':8002';
var random=location.search.split('random=')[1];

var ws ;
var sendObj={
    login:random
}
ws = new WebSocket(wsServer);

ws.onopen = function (e) {
    console.log("Connected to WebSocket server.");
} ;
setTimeout(function(){
    ws.send(JSON.stringify(sendObj));
},1000)
