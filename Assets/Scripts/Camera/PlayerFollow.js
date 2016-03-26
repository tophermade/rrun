#pragma strict

//GameObject / AudioClip / Transform
var focusObject			: GameObject;

// boolean
var initial 			: Vector3;


// float / int
var damp 				: float 		= .1;
var velocity		 	: Vector3		= Vector3.zero;

var playing 			: boolean 		= false;


// String


//StandardFunction

function StartRound(){
	playing = true;
}


function EndRound(){
	playing = false;
}

function Awake(){
	initial = transform.position;
}


function Update(){
	if(playing){
		transform.position = Vector3(focusObject.transform.position.x+initial.x, focusObject.transform.position.y + initial.y-1.4, focusObject.transform.position.z + initial.z);
	}
}


function FixedUpdate(){

}