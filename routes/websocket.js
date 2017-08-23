var express = require('express');
var WebSocket = require('faye-websocket'),
http      = require('http');

var debug = require('debug')('socket:websocket');
var msgList=[]
,sendMsg=false
,wsList=[],
loginWs=[],
loginCodeList=[]
;


var server = http.createServer();

server.on('upgrade', function(request, socket, body) {
  if (WebSocket.isWebSocket(request)) {
    var ws = new WebSocket(request, socket, body);
    wsList.push(ws);
    ws.on('message', function(event) {
      var time=new Date().getTime();
      var times=event.data.slice(event.data.indexOf("times:")+6,event.data.indexOf(",name"));
     
      msgList.push(event.data+",ser:{time:"+time+",num:"+wsList.length+"}");
      
      if(msgList.length>100){
       msgList=msgList.slice(1); 
      }
      for(var i=0;i<wsList.length;i++){
      if(times==1 &&(i==wsList.length-1)){
        wsList[i].send(msgList.join("||"));
      }else{
          wsList[i].send(msgList[(msgList.length-1)]);
      }
      }
      debug('msg', event.data);
    });
    
    ws.on('close', function(event) {
      for(var q=0;q<wsList.length;q++){
        if(wsList[q]._stream._idleStart==ws._stream._idleStart){
          wsList.splice(q,1);
        }
      }
        console.log('close', event.code, event.reason);
        ws = null;
    });
  }
});

var loginServer=http.createServer();

loginServer.on('upgrade', function(request, socket, body) {
  if (WebSocket.isWebSocket(request)) {
    var ws = new WebSocket(request, socket, body);
    loginWs.push(ws);//客户端列表
    ws.on('message', function(event) {
      console.log(event.data)
      var obj=event.data.replace('login','random').replace("ok","random");
      console.log(obj)
      loginCodeList.push(event.data);
     
      for(var i=0;i<loginWs.length;i++){
        if(loginCodeList[i].indexOf(obj)!=-1&&event.data.indexOf('login')!=-1){
          //当前二维码 有人扫
          loginWs[i].send(loginCodeList[i]+',{login:true}');
        } else if(loginCodeList[i].indexOf(obj)!=-1&&event.data.indexOf('ok')!=-1){ 
          loginWs[i].send(loginCodeList[i]+',{ok:true}');
        }else{
          loginWs[i].send(loginCodeList[i]);
        }
      }
      debug('msg', event.data);
    });
    
    ws.on('close', function(event) {
      for(var q=0;q<loginWs.length;q++){
        if(loginWs[q]._stream._idleStart==ws._stream._idleStart){
          loginWs.splice(q,1);
        }
      }
        console.log('close', event.code, event.reason);
        ws = null;
    });
  }
});


module.exports = {server,loginServer};
