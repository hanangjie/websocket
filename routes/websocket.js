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
      var obj=JSON.parse(event.data);
      loginCodeList.push(obj);
      loginWs.forEach((item,i) => {
        item.send(JSON.stringify(loginCodeList));
      })
      if(obj.action == "login"){
        loginCodeList.splice((loginCodeList.length-1),1);
        loginCodeList.forEach((item,i) => {
          if(item.id==obj.id){
            loginCodeList.splice(i,1);
          }
        })
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


var gameServer=http.createServer();
var gameList=[];
var gameWs=[];
gameServer.on('upgrade', function(request, socket, body) {
  if (WebSocket.isWebSocket(request)) {
    var ws = new WebSocket(request, socket, body);
    gameWs.push(ws);//客户端列表
    ws.on('message', function(event) {
      var obj=JSON.parse(event.data);
      gameList.push(obj);
      gameWs.forEach((item,i) => {
        item.send(JSON.stringify(loginCodeList));
      })
     
    });
    
    ws.on('close', function(event) {
      for(var q=0;q<gameWs.length;q++){
        if(gameWs[q]._stream._idleStart==ws._stream._idleStart){
          gameWs.splice(q,1);
        }
      }
        ws = null;
    });
  }
});


module.exports = {server,loginServer,gameServer};
