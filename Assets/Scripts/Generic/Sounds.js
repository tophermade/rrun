#pragma strict
//	GameObject / AudioClip / Transform
var buttonTap 		: AudioClip;
var deathHit 		: AudioClip;
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
	GetComponent.<AudioSource>().PlayOneShot(deathHit, clipLevel);
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
