using UnityEngine;
using System.Collections;
using UnityEngine.Advertisements;

public class NWZUnityAds : MonoBehaviour {

	public void ShowAd(){
		if(Advertisement.IsReady()){
			if(PlayerPrefs.HasKey("showads")){
				if(PlayerPrefs.GetString("showads") != "false"){
					Advertisement.Show();
				} else {
					print("no ads has been purchased, skipping advert");
				}
			} else {
				Advertisement.Show();
			}
		}
	}


	public void ShowRewardedAd(){
		if (Advertisement.IsReady("rewardedVideoZone")){
			var options = new ShowOptions { resultCallback = HandleShowResult };
			Advertisement.Show("rewardedVideoZone", options);
		}
	}

	private void HandleShowResult(ShowResult result){
		switch (result) {
			case ShowResult.Finished:
				Debug.Log("The ad was successfully shown, give reward.");
				break;

			case ShowResult.Skipped:
				Debug.Log("The ad was skipped before reaching the end, fucker tried to skip");
				break;

			case ShowResult.Failed:
				Debug.LogError("The ad failed to be shown, bummer.");
				break;
		}
	}
}
