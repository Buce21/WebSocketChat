/**
 * Created by Administrator on 2016/1/22.
 */
var ws;
var SocketCreated = false;
var isUserloggedout = false;
var lastMessageType;
var countS;

function lockOn(str)
{
    var lock = document.getElementById('skm_LockPane');
    if (lock)
        lock.className = 'LockOn';
    lock.innerHTML = str;
}

function lockOff()
{
    var lock = document.getElementById('skm_LockPane');
    lock.className = 'LockOff';
}
/* 统计在线数量
function changeOnlineNum(num){
    $("#onlineNum").html(num);
}

function countMessage(event) {
    changeOnlineNum(event.data);
};
*/

/*获取在线列表*/
function updateList(str){
    var number;
    if(str.data == "error" || str.data == undefined){
        number = 0;
    }else{
        var strs = str.data.substr(0,str.data.length-1);
        var array = strs.split("|");
        number = array.length
    }
    var html="<li class='list-group-item'><span class='badge' id='onlineNum'>"+number+"</span>在线人数</li>"
    for(var i=0;i<number;i++){
        if(i<11){
            html += " <li class='list-group-item'><a href='#'>"+array[i]+"</a></li>"
        }else if(i == 11){
            html+=" <li class='list-group-item'><a href='#'>"+"..."+"</a></li>"
        }
    }
    $("#onlineList").html(html);
}

/*链接WebSocket*/
function ToggleConnectionClicked() {
    if (SocketCreated && (ws.readyState == 0 || ws.readyState == 1)) {
        lockOn("离开聊天室...");
        SocketCreated = false;
        isUserloggedout = true;
        ws.close();
    } else {
        lockOn("进入聊天室...");
        Log("准备连接到聊天服务器 ...","WARNING");
        try {
            if ("WebSocket" in window) {
                ws = new WebSocket("ws://" + document.getElementById("Connection").value);
            }
            else if("MozWebSocket" in window) {
                ws = new MozWebSocket("ws://" + document.getElementById("Connection").value);
            }

            SocketCreated = true;
            isUserloggedout = false;
        } catch (ex) {
            Log(ex, "ERROR");
            return;
        }
        document.getElementById("txtName").setAttribute("readonly","readonly");
        document.getElementById("ToggleConnection").innerHTML = "断 开";
        document.getElementById("ToggleConnection").className = "btn btn-danger";
        ws.onopen = WSonOpen;
        ws.onmessage = WSonMessage;
        ws.onclose = WSonClose;
        ws.onerror = WSonError;
    }
};

function WSonOpen() {
    lockOff();
    Log("连接已经建立。", "OK");
    $("#SendDataContainer").show();
    ws.send("【" + document.getElementById("txtName").value + "】进入了聊天室！");
};

function WSonMessage(event) {
    if (event.data.indexOf("进入了聊天室") != -1) Log(event.data,"WARNING");
    else Log(event.data);
};

function WSonClose() {
    lockOff();
    if (isUserloggedout)
        Log("【"+document.getElementById("txtName").value+"】离开了聊天室！","WARNING");
    document.getElementById("txtName").removeAttribute("readonly");
    document.getElementById("ToggleConnection").innerHTML = "连 接";
    document.getElementById("ToggleConnection").className = "btn btn-success";
    $("#SendDataContainer").hide();
};

function WSonError(event) {
    lockOff();
    Log("远程连接中断。", "ERROR");
};

/*发送消息*/
function SendDataClicked() {
    if (document.getElementById("DataToSend").value.trim() != "") {
        ws.send("<div class='alert alert-info col-md-2'  style='     padding: 5px;    text-align: center;  margin-bottom:10px;' role='alert'><strong>"+document.getElementById("txtName").value  +"</strong></div>"+"<div class='alert alert-info col-md-10'  style='    padding: 5px;  margin-bottom:10px;' role='alert'>"+ document.getElementById("DataToSend").value + "</div>");
        document.getElementById("DataToSend").value = "";
    }
};

/*输出到文本框*/
function Log(Text, MessageType) {
    if (MessageType == "OK") {Text = "<div class='alert alert-success' style='  margin-bottom:10px;' role='alert'>" + Text +"</div>";}
    else if (MessageType == "ERROR"){ Text = "<div class='alert alert-danger'  style='  margin-bottom:10px;' role='alert'>" + Text +"</div>";}
    else if (MessageType == "WARNING"){ Text = "<div class='alert alert-warning '  style='  margin-bottom:10px;' role='alert'>" + Text +"</div>";}
    else{
        Text = "<span class='bubble'>"+Text+"</span></br>"
    }
    document.getElementById("LogContainer").innerHTML = document.getElementById("LogContainer").innerHTML + Text;
    var LogContainer = document.getElementById("LogContainer");
    LogContainer.scrollTop = LogContainer.scrollHeight;
    lastMessageType = MessageType;
};

$(document).ready(function () {

    $("#SendDataContainer").hide();  //隐藏发送消息框

    /*验证浏览器是否支持WebSocket*/
    var WebSocketsExist = true;
    try {
        var dummy = new WebSocket("ws://localhost:8088/WebSocketChat/test");
        dummy.close();
    } catch (ex) {
        try
        {
            var webSocket = new MozWebSocket("ws://localhost:8088/WebSocketChat/test")
            webSocket.close();
        }
        catch(ex)
        {
            WebSocketsExist = false;
        }
    }

    if (WebSocketsExist) {
        Log("您的浏览器支持WebSocket. 您可以尝试连接到聊天服务器!", "OK");
        document.getElementById("Connection").value = "localhost:8088/WebSocketChat/chat";  //设置服务器默认参数
        countS = new WebSocket("ws://localhost:8088/WebSocketChat/counter");  //获取在线人数
        countS.onopen = updateList;
        countS.onmessage = updateList;
        countS.onclose = updateList;
        countS.onerror = updateList;
    } else {
        Log("您的浏览器不支持WebSocket。请选择其他的浏览器再尝试连接服务器。", "ERROR");
        document.getElementById("ToggleConnection").disabled = true;
    }

    /*回车键发送消息*/
    $("#DataToSend").keypress(function(evt)
    {
        if (evt.keyCode == 13)
        {
            $("#SendData").click();
            evt.preventDefault();
        }
    })
});