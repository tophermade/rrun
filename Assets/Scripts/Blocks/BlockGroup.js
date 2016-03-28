#pragma strict

var frontMostObject 	: GameObject;
var backMostObject 		: GameObject;
var overRidingBlock 	: GameObject;// use to control a different next spawn

var groupVisited 		: boolean 	= false;

var backMost 			: float		= 0;
var frontMost 			: float 	= 0;
var upMost 				: float 	= 0;
var downMost 			: float 	= 0;



function SetupBlocks(){
	for (var child : Transform in transform) {

	    if(child.position.y > upMost){
	    	upMost = child.position.y;
	    }

	    if(child.position.y < downMost){
	    	downMost = child.position.y;
	    }

	    if(child.position.x > frontMost){
	    	frontMost = child.position.x;
	    	frontMostObject = child.gameObject;
	    }

	    if(child.position.x < backMost){
	    	backMost = child.position.x;
	    	backMostObject = child.gameObject;
	    }
	}

	if(backMostObject == null){
		backMostObject = gameObject.transform.GetChild(0).gameObject;
		print(backMostObject);
	}

	if(overRidingBlock){
		frontMostObject = overRidingBlock;
	}
}

function Awake () {
	backMost = transform.position.x;
	frontMost = transform.position.x;
	upMost = transform.position.y;
	downMost = transform.position.y;

	SetupBlocks();
}

function Update () {

}