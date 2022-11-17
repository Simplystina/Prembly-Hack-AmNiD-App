import Webcam from "react-webcam";
import React, { useEffect, useState } from 'react'
import { Button } from "@chakra-ui/react";


const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  
const TakePic = () => {

  const [data, setData] = useState({
    base64URL:"",
    file: ""
  })

  const webcamRef = React.useRef(null);
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc, "imageee")


     
      
    },
    [webcamRef]
  );
    return (
      <>
        <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
        
      </>
    );
  };

  export default TakePic