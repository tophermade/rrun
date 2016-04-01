using UnityEngine;
using System.Collections;
using GoogleMobileAds.Api;

public class NWZAdmob : MonoBehaviour {

	public bool useAdmobBanners = true;
	public BannerView bannerView;
	public InterstitialAd interstitial;

	public void RequestBanner(){
	    #if UNITY_ANDROID
	        string adUnitId = "ca-app-pub-7760287693368374/2122323249";
	    #elif UNITY_IPHONE
	        string adUnitId = "ca-app-pub-7760287693368374/8168856844";
	    #else
	        string adUnitId = "unexpected_platform";
	    #endif

	    // Create a 320x50 banner at the top of the screen.
	    bannerView = new BannerView(adUnitId, AdSize.Banner, AdPosition.Bottom);
	    // Create an empty ad request.
	    AdRequest request = new AdRequest.Builder().Build();
	    // Load the banner with the request.
	    bannerView.LoadAd(request);
	    bannerView.Show();
	}


	public void RequestInterstitial(){
	    #if UNITY_ANDROID
	        string adUnitId = "ca-app-pub-7760287693368374/3599056443";
	    #elif UNITY_IPHONE
	        string adUnitId = "ca-app-pub-7760287693368374/5075789647";
	    #else
	        string adUnitId = "unexpected_platform";
	    #endif

	    // Initialize an InterstitialAd.
	    interstitial = new InterstitialAd(adUnitId);
	    // Create an empty ad request.
	    AdRequest request = new AdRequest.Builder().Build();
	    // Load the interstitial with the request.
	    interstitial.LoadAd(request);
	}

	public void ShowAdmobInterstertial(){
		interstitial.Show();
	}

	public void DisableAds(){
		bannerView.Destroy();
	}

	private void Start(){
		if(useAdmobBanners){
			if(PlayerPrefs.HasKey("showads")){
				if(PlayerPrefs.GetString("showads") != "false"){
					RequestInterstitial();
					RequestBanner();
				} else {
					print("no ads has been purchased, skipping banners");
				}
			} else {
				RequestBanner();
				RequestInterstitial();
			}
		}
	}
}
