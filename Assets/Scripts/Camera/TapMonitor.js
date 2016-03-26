#pragma strict
// goes on a camera

function Update(){ 
	var hit : RaycastHit;

	if (Input.GetMouseButtonDown(0)) {
		print("clicked");
		var ray : Ray = GetComponent(Camera).ScreenPointToRay (Input.mousePosition);
		if (Physics.Raycast (ray,hit) && hit.transform.gameObject.tag == "Button") {
			//print(hit.transform.gameObject);
			hit.transform.gameObject.SendMessage("Click");
		}
	}

}