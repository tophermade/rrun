#pragma strict
//	GameObject / AudioClip / Transform
var buttonTap 		: AudioClip;
var deathHit 		: AudioClip[];
var deathFall 		: AudioClip;
var jump 			: AudioClip;
var landing			: AudioClip;
var kill			: AudioClip;
var combo 			: AudioClip;



//	boolean



//	float / int
var clipLevel  		: float = 1.0;



//	Custom Function
function PlayTap(){
	GetComponent.<AudioSource>().PlayOneShot(buttonTap, clipLevel);
}

function PlayHit(){
	var hitNum : int = Random.Range(0,deathHit.length);
	GetComponent.<AudioSource>().PlayOneShot(deathHit[hitNum], clipLevel);
}

function PlayFall(){
	GetComponent.<AudioSource>().PlayOneShot(deathFall, clipLevel);
}

function PlayJump(){
	GetComponent.<AudioSource>().PlayOneShot(jump, clipLevel);
}

function PlayLanding(){
	GetComponent.<AudioSource>().PlayOneShot(landing, .3);
}

function PlayKill(){
	GetComponent.<AudioSource>().PlayOneShot(kill, clipLevel);
}

function PlayMusic(){
	
}
