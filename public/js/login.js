
var wsServer = 'ws://'+location.hostname+':8001';

ws = new WebSocket(wsServer);
var option='login';
if(ws.readyState==1){
  ws.send(option);
}
