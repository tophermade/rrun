#pragma strict

function CheckNoAds(){
	if(PlayerPrefs.HasKey("showads")){
		if(PlayerPrefs.GetString("showads") == "false"){
			Destroy(gameObject);
		}
	}
}

function Awake () {
	CheckNoAds();
}