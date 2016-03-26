#pragma strict

var notify 				: GameObject[];
var potentialBlocks 	: GameObject[];

var indexScene 			: GameObject;
var gameOverScene 		: GameObject;

var player 				: GameObject;
var playingScoreDisplay : GameObject;

var playerStartPosition : Vector3;
var lastSpawnPosition	: int 			= 0;
var lastSpawnWidth 		: int 			= 1;



function SpawnGroup(currentDistance : int){
	// max jump distance is a four unit gap

}

function Notify(notifyThese : GameObject[], theMessage : String){
	for (var item: GameObject in notifyThese) {
		item.SendMessage(theMessage);
	}
}

function StartRound(arg : String){
	if(arg == "first"){
		indexScene.GetComponent(Animator).SetTrigger("PlayExit");
	}
	gameOverScene.SetActive(false);
	print("starting from manager");
	Notify(notify, "StartRound");
}


function RestartRound(){
	player.SetActive(true);
	playingScoreDisplay.SetActive(true);
	StartRound("restart");
}


function EndRound(){
	Notify(notify, "EndRound");
	player.transform.position = playerStartPosition;
	yield WaitForSeconds(.75);	
	playingScoreDisplay.SetActive(false);
	gameOverScene.SetActive(true);
}


function Start () {
	player = GameObject.Find("PlayerObject");
	playerStartPosition = player.transform.position;
}


function Update () {

}