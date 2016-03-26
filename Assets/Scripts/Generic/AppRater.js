#pragma strict

var appId : String;

function Click(){
	#if UNITY_ANDROID
		Application.OpenURL("market://details?id=" + appId);
	#elif UNITY_IPHONE
		Application.OpenURL("itms-apps://itunes.apple.com/app/" + appId);
	#endif
}