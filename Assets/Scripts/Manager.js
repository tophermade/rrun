#pragma strict

var notify 				: GameObject[];
var potentialBlocks 	: GameObject[];

var indexScene 			: GameObject;
var gameOverScene 		: GameObject;

var player 				: GameObject;
var playingScoreDisplay : GameObject;

var lastSpawnForemost 	: GameObject;

var playScore 			: GameObject;
var gameOverScore 		: GameObject;
var highScore 			: GameObject;

var playing 			: boolean 		= false;

var playerStartPosition : Vector3;
var playsBetweenAds		: int 			= 5;
var plays 				: int 			= 0;
var score 				: int 			= 0;



function SpawnGroup(leadingBlock : GameObject){
	// max jump distance is a four unit gap
	print("spawn group");

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
	score = 0;
	plays++;
	UpdateScore();
	playing = true;
	if(arg == "first"){
		indexScene.GetComponent(Animator).SetTrigger("PlayExit");
	}
	gameOverScene.SetActive(false);
	print("starting from manager");
	Notify(notify, "StartRound");
}


function RestartRound(){
	playing = true;
	plays++;
	player.SetActive(true);
	score = 0;
	UpdateScore();
	playingScoreDisplay.SetActive(true);
	StartRound("restart");
}


function EndRound(){
	playing = false;
	Notify(notify, "EndRound");
	player.transform.position = playerStartPosition;
	SetupHighscore();
	if(plays % playsBetweenAds == 0){
		BroadcastMessage("ShowAd");
	}
	yield WaitForSeconds(.75);	
	playingScoreDisplay.SetActive(false);
	gameOverScene.SetActive(true);
}


function SetupHighscore(){
	if(PlayerPrefs.HasKey("highscore")){
		if(score > parseInt(PlayerPrefs.GetInt("highscore"))){			
			PlayerPrefs.SetInt("highscore", score);
		}
	} else {
		PlayerPrefs.SetInt("highscore", score);
	}
	highScore.GetComponent(TextMesh).text = PlayerPrefs.GetInt("highscore").ToString();
}


function UpdateScore(){
	var oScore : int = score;
	score = player.transform.position.x / 5;
	if(oScore < score){
		playScore.GetComponent(TextMesh).text = score.ToString();
		gameOverScore.GetComponent(TextMesh).text = score.ToString();
	}
}


function Start () {
	player = GameObject.Find("PlayerObject");
	playerStartPosition = player.transform.position;
}


function FixedUpdate(){	
	if(playing){
		UpdateScore();
	}
}


function Update () {
}