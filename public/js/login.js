
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

}

document.getElementById('login').onclick=function(){
        var sex=document.querySelectorAll('[name="sex"]');
        for(var i=0;i<sex.length;i++){
            if(sex[i].checked==true){
                localStorage.sex=loginObj.sex=sex[i].value;
            }
        }
        localStorage.name=loginObj.name=document.getElementById('name').value
        ws.send(JSON.stringify(loginObj));
        location.href='/nsn?device=phone'
}

