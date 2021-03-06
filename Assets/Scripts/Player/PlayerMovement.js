﻿#pragma strict

var manager 			: GameObject;
var heightIndicator 	: GameObject;
var body 				: Rigidbody;
var jumpEffect			: GameObject;
var deathEffect 		: GameObject;
var gib 				: GameObject;
var scoreDisplay 		: GameObject;
var cloudParent 		: GameObject;
var clouds 				: GameObject[];
var playerInitial 		: Vector3;
var scoreInitial 		: Vector3;


var speed 				: float			= 5;
var jumpPower 			: float 		= 9;
var jumpTime			: float 		= 0;
var jumpPosition 		: float 		= 0;
var lastCloud 			: float 		= 0;


var playing 			: boolean 		= false;
var onGround 			: boolean 		= false;
var isAlive 			: boolean 		= true;




function HexToColor(hex : String, alpha : int) : Color{
    var r = byte.Parse(hex.Substring(0,2), System.Globalization.NumberStyles.HexNumber);
    var g = byte.Parse(hex.Substring(2,2), System.Globalization.NumberStyles.HexNumber);
    var b = byte.Parse(hex.Substring(4,2), System.Globalization.NumberStyles.HexNumber);
    return new Color32(r,g,b, alpha);
}


function HitWall(){
	isAlive = false;
	playing = false;
	gib = Instantiate(deathEffect, Vector3(transform.position.x,transform.position.y+.7,transform.position.z+.3), Quaternion.identity);
	//transform.Find("default").gameObject.SetActive(false);
}


function Jump(){
	jumpPosition = transform.position.y;
	manager.SendMessage("PlayJump");		
	jumpTime = Time.time;
	body.velocity.y = jumpPower;
	onGround = false;
	var newEffect = Instantiate(jumpEffect, heightIndicator.transform.position, Quaternion.identity);
	newEffect.transform.localEulerAngles = Vector3(90, 0, 0);
}


function OnCollisionEnter(collision : Collision) {
	if(isAlive){
		var hitWall : boolean = false;
		//print("hit something");

		for (var contact : ContactPoint in collision.contacts) {
			if(heightIndicator.transform.position.y < contact.point.y){
				print("Hit a wall");
				hitWall = true;
			} else {
				print("Landed on the ground");
				jumpPosition = transform.position.y;

				if(!onGround && playing){
					manager.SendMessage("PlayLanding");					
				}

				onGround = true;
				
				if(Time.time > jumpTime +.05){
					body.velocity.y = 0;
				}

				if(collision.transform.gameObject.tag == "Block"){
					var thisParent : GameObject = collision.transform.parent.gameObject;
					if(!thisParent.GetComponent(BlockGroup).groupVisited){
						manager.SendMessage("SpawnGroup", thisParent.GetComponent(BlockGroup).frontMostObject);
						thisParent.GetComponent(BlockGroup).groupVisited = true;
					}
					
				}
			}
		}

		if(hitWall){
			HitWall();
			manager.SendMessage("PlayHit");
			manager.SendMessage("EndRound");
		}
	}
}


function StartRound(){
	if(gib){
		Destroy(gib);
		gib = null;
	}
	scoreDisplay.SetActive(true);
	scoreDisplay.transform.position = scoreInitial;
	yield WaitForSeconds(.05);
	playing = true;
	isAlive = true;
	lastCloud = 5;
	print("player has started round");
}


function EndRound(){
	playing = false;
	body.velocity = Vector3(0,0,0);
}


function Start () {
	manager = GameObject.Find("Manager");
	body = GetComponent(Rigidbody);
	playerInitial = transform.position;
	scoreInitial = scoreDisplay.transform.position;
}



function FixedUpdate(){
	if(playing){
		body.velocity.x = speed;

		if(jumpPosition > transform.position.y + 7){
			HitWall();
			manager.SendMessage("PlayHit");
			manager.SendMessage("EndRound");
		}

		if(transform.position.x > lastCloud){
			lastCloud = lastCloud + 25;
			var newCloud = Instantiate(clouds[0], transform.position, Quaternion.identity);
				newCloud.transform.position.z = 13.5 + Random.Range(-5,5);
				newCloud.transform.position.x = transform.position.x + 25;
				newCloud.transform.parent = cloudParent.transform;

		}
	}
}



function Update () {
	if(playing){
		if(Input.GetMouseButtonDown(0) && onGround){
			Jump();
		}

		if(transform.position.x > 10){
			scoreDisplay.transform.position = Vector3(transform.position.x+scoreInitial.x -10, transform.position.y + scoreInitial.y, 10);
		} else {
			scoreDisplay.transform.position.y = transform.position.y + scoreInitial.y;
		}
	}
}