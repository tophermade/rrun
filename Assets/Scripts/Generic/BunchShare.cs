using UnityEngine;
using System.Collections;

public class BunchShare : MonoBehaviour {

	public void ShareScore () {
		ShareBunch.GetInstance().ShareText("I'm kicking a highscore of " + PlayerPrefs.GetInt("highscore").ToString() + " on Rooster Run for iOS and Android! Can you do better? http://roosterrun.tk");
	}
	
}
