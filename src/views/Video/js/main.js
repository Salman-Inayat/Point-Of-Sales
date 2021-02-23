import * as faceapi from 'face-api.js';

export default function mainFunction() {
  const video = document.getElementById("video");
  let predictedAges = [];
  var detectedFaces = new Array();
  var recognized = [];
  var i = 0;
  let outputImg = document.createElement("div");
  const div = document.getElementById("faces");
  let counter = 0;
  var det1 = [];
  var facematcher;
  var matches = [];

  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    faceapi.nets.ageGenderNet.loadFromUri("/models"),
  ]).then(p);

  function p() {
    console.log("loading.");
  }
  // function startVideo() {
  //   // navigator.getUserMedia(
  //   //   { video: {} },
  //   //   stream => (video.srcObject = stream),
  //   //   err => console.error(err)

  //   //   );
  //   //   console.log(video.srcObject);
  // }

  video.addEventListener("play", function vidplay() {
    const canvas = faceapi.createCanvasFromMedia(video);
    console.log("hello");
    document.body.append(canvas);

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(
          video,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 960,
            scoreThreshold: 0.3,
          })
        )
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender()
        .withFaceDescriptors();

      const faceMatcher = new faceapi.FaceMatcher(detections);
      console.log(faceMatcher);
      saveDetections(video, detections, faceMatcher);

      console.log(detections);

      //console.log(faceMatcher);

      /*detections.forEach(fd => {
          const bestMatch = faceMatcher.findBestMatch(fd.descriptor);
          console.log(bestMatch.toString());
          //recognized[i] = bestMatch;
          /*box = fd.detection.box;
          const regionsToExtract = [
            new faceapi.Rect( box.x, box.y , box.width , box.height)
        ]
          let faceImages = new faceapi.extractFaces(fd, regionsToExtract);
          detectedFaces[i] = new Image();  
          detectedFaces[i].src = fd.toDataURL(); 
          i++;
        })*/

      //extractFaceFromBox(video,detections[0].detection.box);

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      resizedDetections.forEach((rd) => {
        const age = rd.age;
        const interpolatedAge = interpolateAgePredictions(age);
        const bottomRight = {
          x: rd.detection.box.bottomRight.x - 50,
          y: rd.detection.box.bottomRight.y,
        };

        new faceapi.draw.DrawTextField(
          [`${faceapi.utils.round(interpolatedAge, 0)} years`],
          bottomRight
        ).draw(canvas);
      });

      /*for(j=0; j < detectedFaces.length; j++){
        outputImg.src = detectedFaces[j].src;
        document.body.append(outputImg);
        //prnt.append(recognized[j]);
        //console.log(descriptorArrays[j])
        }*/
    }, 7000);
  });

  /*
    async function extractFaceFromBox(inputImage, box){ 
      const regionsToExtract = [
          new faceapi.Rect( box.x, box.y , box.width , box.height)
      ]
                          
      let faceImages = await faceapi.extractFaces(inputImage, regionsToExtract);
      //let outputImage = document.createElement("img");
    
      if(faceImages.length == 0){
          console.log('Face not found')
      }
      else
      {
          faceImages.forEach(cnv =>{      
            detectedFaces[i] = new Image();  
            detectedFaces[i].src = cnv.toDataURL(); 
            i++;
          })
      }   
    }                       
    */
  function interpolateAgePredictions(age) {
    predictedAges = [age].concat(predictedAges).slice(0, 30);
    const avgPredictedAge =
      predictedAges.reduce((total, a) => total + a) / predictedAges.length;
    return avgPredictedAge;
  }

  function saveDetections(inputVid, dets, fm) {
    if (counter == 0) {
      facematcher = fm;
      // det1 = dets;
      // const faceMatcher = await faceapi.FaceMatcher(det1)
      console.log("Initial Check!");
      counter++;
    } else {
      det1 = dets;
      det1.forEach(async (fd) => {
        const bestMatch = facematcher.findBestMatch(fd.descriptor);
        console.log("Is it Working?");
        console.log(bestMatch.toString());
        const  box = fd.detection.box;
        let regionsToExtract = [
          new faceapi.Rect(box.x, box.y, box.width, box.height),
        ];
        let faceImage = await faceapi.extractFaces(inputVid, regionsToExtract);
        // console.log(faceImage);
        faceImage.forEach((cnv) => {
          const src = cnv.toDataURL();
          outputImg.innerHTML =
            '<img src="' +
            src +
            '" /><text>' +
            bestMatch.toString() +
            "</text>";
          document.body.append(outputImg);
        });
      });
      facematcher = fm;
    }
  }
}
