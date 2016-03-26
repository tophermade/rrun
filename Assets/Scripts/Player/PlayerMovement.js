#pragma strict

var manager 		: GameObject;
var heightIndicator : GameObject;
var body 			: Rigidbody;
var jumpEffect		: GameObject;
var deathEffect 	: GameObject;
var gib 			: GameObject;


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
	gameObject.SetActive(false);
	gib = Instantiate(deathEffect, Vector3(transform.position.x,transform.position.y+.7,transform.position.z+.3), Quaternion.identity);
	//transform.Find("default").gameObject.SetActive(false);
}


function Jump(){
	body.velocity.y = jumpPower;
	onGround = false;
	var newEffect = Instantiate(jumpEffect, heightIndicator.transform.position, Quaternion.identity);
	newEffect.transform.localEulerAngles = Vector3(-90, 0, 0);
}


function OnCollisionEnter(collision : Collision) {
	var hitWall : boolean = false;
	print("hit something");

	for (var contact : ContactPoint in collision.contacts) {
		if(heightIndicator.transform.position.y < contact.point.y){
			print("Hit a wall");
			hitWall = true;
		} else {
			//print("Landed on the ground");
			onGround = true;
			body.velocity.y = 0;

			if(collision.transform.gameObject.tag == "Block"){
				var thisParent : GameObject = collision.transform.parent.gameObject;
				if(!thisParent.GetComponent(BlockGroup).groupVisited){
					manager.SendMessage("SpawnGroup", thisParent.GetComponent(BlockGroup).groupWidth);
					thisParent.GetComponent(BlockGroup).groupVisited = true;
				}
				
			}
		}
	}

	if(hitWall){
		HitWall();
		manager.SendMessage("EndRound");
	}
}


function StartRound(){
	if(gib){
		Destroy(gib);
		gib = null;
	}
	yield WaitForSeconds(.05);
	playing = true;
	print("player has started round");
}


function EndRound(){

}


function Start () {
	manager = GameObject.Find("Manager");
	body = GetComponent(Rigidbody);
}



function FixedUpdate(){
	if(playing){
		body.velocity.x = speed;
	}
}



function Update () {
	if(playing){
		if(Input.GetMouseButtonDown(0) && onGround){
			Jump();
		}
	}
}