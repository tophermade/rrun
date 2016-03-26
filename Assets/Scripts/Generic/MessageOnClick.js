#pragma strict

var sendTo 			: GameObject;
var message 		: String;
var arg 			: String;

function Click(){
	#if UNITY_EDITOR
		print("sending " + message + " to " + sendTo);
	#endif
	if(arg){
		sendTo.SendMessage(message, arg);
	} else {
		sendTo.SendMessage(message);		
	}
}