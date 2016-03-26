using UnityEngine;
using System.Collections;

public class CamShakeSimple : MonoBehaviour 
{

    Vector3 originalCameraPosition;

    float shakeAmt = 0;

    public Camera mainCamera;

    void Start(){
        originalCameraPosition = mainCamera.transform.position;
    }

    void DoShake() 
    {

        shakeAmt = .05f;
        InvokeRepeating("CameraShake", 0, .01f);
        Invoke("StopShaking", 0.3f);

    }

    void TinyShake() 
    {

        shakeAmt = .015f;
        InvokeRepeating("CameraShake", 0, .01f);
        Invoke("StopShaking", 0.11f);

    }

    void CameraShake()
    {
        if(shakeAmt>0) 
        {
            float quakeAmt = Random.value*shakeAmt*2 - shakeAmt;
            Vector3 pp = mainCamera.transform.position;
            pp.x+= quakeAmt;
            pp.y+= quakeAmt; // can also add to x and/or z
            mainCamera.transform.position = pp;
        }
    }

    void StopShaking()
    {
        CancelInvoke("CameraShake");
        mainCamera.transform.position = originalCameraPosition;
    }

}