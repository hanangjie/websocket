
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
    alert(1)
    try{
        var sex=document.querySelectorAll('[name="sex"]');
        sex.forEach(function(e){
            if(e.checked==true){
                localStorage.sex=e.value
                alert(2)
            }
        })
    }catch(e){
        alert(e)
    }
        sex.forEach(function(e){
            if(e.checked==true){
                localStorage.sex=e.value
            }
        })
        loginObj.name=document.getElementById('name').value
        localStorage.name=document.getElementById('name').value
        ws.send(JSON.stringify(loginObj));
        location.href='/nsn'
}

