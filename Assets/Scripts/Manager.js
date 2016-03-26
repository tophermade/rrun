#pragma strict

var notify 				: GameObject[];
var potentialBlocks 	: GameObject[];

var indexScene 			: GameObject;
var gameOverScene 		: GameObject;

var player 				: GameObject;
var playingScoreDisplay : GameObject;

var lastSpawnForemost 	: GameObject;

var playerStartPosition : Vector3;



function SpawnGroup(leadingBlock : GameObject){
	// max jump distance is a four unit gap
	lastSpawnForemost 			= leadingBlock;
	var gap 			: int 	= Random.Range(1,5);		
	var verticalGap 	: int 	= Random.Range(-2,3);

	var groupId 		: int  	= Random.Range(0, potentialBlocks.length);

	var newGroup = Instantiate(potentialBlocks[groupId], transform.position, Quaternion.identity);
		newGroup.transform.position.x = lastSpawnForemost.transform.position.x + 4;
		newGroup.transform.position.y = lastSpawnForemost.transform.position.y + verticalGap;
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