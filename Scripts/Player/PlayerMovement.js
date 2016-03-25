#pragma strict

var manager 		: GameObject;
var heightIndicator : GameObject;
var body 			: Rigidbody;
var jumpEffect		: GameObject;


var speed 			: float			= 5;
var jumpPower 		: float 		= 9;


var playing 		: boolean 		= false;
var onGround 		: boolean 		= false;




function HexToColor(hex : String, alpha : int) : Color{
    var r = byte.Parse(hex.Substring(0,2), System.Globalization.NumberStyles.HexNumber);
    var g = byte.Parse(hex.Substring(2,2), System.Globalization.NumberStyles.HexNumber);
    var b = byte.Parse(hex.Substring(4,2), System.Globalization.NumberStyles.HexNumber);
    return new Color32(r,g,b, alpha);
}


function HitWall(){

}


function OnCollisionEnter(collision : Collision) {
	var hitWall : boolean = false;

	for (var contact : ContactPoint in collision.contacts) {
		if(heightIndicator.transform.position.y < contact.point.y){
			print("Hit a wall");
			hitWall = true;
		} else {
			print("Landed on the ground");
			onGround = true;
		}
	}

	if(hitWall){
		HitWall();
	}
}


function StartRound(){
	playing = true;
}



function Start () {
	manager = GameObject.Find("Manager");
	body = GetComponent(Rigidbody);
	StartRound();
}



function FixedUpdate(){
	if(playing){
		body.velocity.x = speed;
	}
}



function Update () {
	if(Input.GetMouseButtonDown(0) && onGround){
		body.velocity.y = jumpPower;
		onGround = false;
	}
}