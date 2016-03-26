#pragma strict

var radius      : float     = 10;
var power       : float     = 25.0;


function FireExplosive(){	
    var explosionPos : Vector3 = Vector3(transform.position.x,transform.position.y-.3, transform.position.z);
    var colliders : Collider[] = Physics.OverlapSphere(explosionPos, radius);
    
    for (var hit : Collider in colliders) {
        if (!hit){
        	continue;
        }            
        
        if (hit.GetComponent.<Rigidbody>()){
        	hit.GetComponent.<Rigidbody>().AddExplosionForce(power, explosionPos, radius);
        }
    }
}

function Start(){
	FireExplosive();
}