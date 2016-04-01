#pragma strict


var hideOnAndroid 		: GameObject[];
var hideOnIOS 			: GameObject[];
var hideOnWeb 			: GameObject[];
var hideOnDesktop 		: GameObject[];
var hideOnAmazon 		: GameObject[];


function Awake(){
	var hideThese : GameObject[];
	
	#if UNITY_ANDROID
		hideThese = hideOnAndroid;
	#endif
	
	#if UNITY_IPHONE
		hideThese = hideOnIOS;
	#endif
	
	#if UNITY_WEBGL
		hideThese = hideOnWeb;
	#endif
	
	#if UNITY_STANDALONE_WIN
		hideThese = hideOnDesktop;
	#endif

	if(SystemInfo.deviceModel.ToLower().Contains("amazon")){
		hideThese = hideOnAmazon;
	}

	for (var i = 0; i < hideThese.length; i++) {
		hideThese[i].SetActive(false);
	}
}


function Start () {
	print(SystemInfo.deviceModel);
}

function Update () {

}