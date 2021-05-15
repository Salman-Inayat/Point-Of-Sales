<<<<<<< HEAD
import * as faceapi from 'face-api.js';
import '../css/styles.css';
import React, { useState } from 'react';
import axios from 'axios';

function FaceModel(props) {
 
  /*initiating state component*/
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    faceapi.nets.ageGenderNet.loadFromUri("/models"),
  ]).then(console.log("loading."));

  React.useEffect(() => {
  const video = document.getElementById("video");
  let predictedAges = [];
  //var i = 0;
  let outputImg = document.createElement("div");
  const div = document.getElementById("container");
  let counter = 0;
  //var det1 = [];
  var facematcher;
  //var matches = [];
  var id = 1;
  const labeledDescriptors = [];
  const maxThreshold = 0.6;
  const detectedFaces = [];
  // const distinctFace = {
  //   name: "",
  //   url: ""
  // }

  video.addEventListener("play", function vidplay() {
    const canvas = faceapi.createCanvasFromMedia(video);
    //console.log("hello");
    // document.body.append(canvas);
    div.append(canvas);  
    const appended_canvas = document.querySelector("canvas")
    appended_canvas.style.position = 'relative';
    //appended_canvas.style.top = '45%';
    //appended_canvas.style.left = '25%';

    console.log(appended_canvas.style)

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
      var t0 = performance.now();
      const detections = await faceapi
        .detectAllFaces(
          video,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 960,
            scoreThreshold: 0.4,
          })
        )
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender()
        .withFaceDescriptors();
      
      //saveDetections(video, detections, faceMatcher);

    console.log(detections);

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    if(labeledDescriptors.length == 0){
      detections.forEach(fd => {
        let lb = assignLabel([fd.descriptor]);
        let resizedDetection = faceapi.resizeResults(fd, displaySize);
        faceapi.draw.drawDetections(canvas, resizedDetection);
        // drawCanvas(fd, canvas, lb);
        drawFace(fd, video, lb);
      });
    }
    else{
      const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, maxThreshold);
      //console.log(faceMatcher);
      detections.forEach(fd => {
        let bestMatch = faceMatcher.findBestMatch(fd.descriptor);
        if(bestMatch.distance >= maxThreshold){
          let lb = assignLabel([fd.descriptor]);
          let resizedDetection = faceapi.resizeResults(fd, displaySize);
          faceapi.draw.drawDetections(canvas, resizedDetection);
          // drawCanvas(fd, canvas, lb);
          drawFace(fd, video, lb);
        }
        else{
        let resizedDetection = faceapi.resizeResults(fd, displaySize);
        //console.log(resizedDetection);
        faceapi.draw.drawDetections(canvas, resizedDetection);
        // drawCanvas(resizedDetection, canvas, bestMatch.label);
        // drawFace(fd, video);
        }
        // const age = resizedDetection.age;
        // const interpolatedAge = interpolateAgePredictions(age);
        // const bottomRight = {
        //   x: resizedDetection.detection.box.bottomRight.x - 50,
        //   y: resizedDetection.detection.box.bottomRight.y,
        // };

        // new faceapi.draw.DrawTextField(
        //   [`${faceapi.utils.round(interpolatedAge, 0)} years`+`\n${bestMatch.label}`],
        //   bottomRight
        // ).draw(canvas);
      });
      
      //const results = detections.map(fd => faceMatcher.findBestMatch(fd.descriptor));
      // results.forEach((bestMatch) => {
      //   const text = bestMatch.toString();
      //   console.log(text);
      // })
    }
    
      //extractFaceFromBox(video,detections[0].detection.box);
    
      // const resizedDetections = faceapi.resizeResults(detections, displaySize);
      // canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      // faceapi.draw.drawDetections(canvas, resizedDetections);
      // // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      // // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      // resizedDetections.forEach((rd) => {
      //   const age = rd.age;
      //   const interpolatedAge = interpolateAgePredictions(age);
      //   const bottomRight = {
      //     x: rd.detection.box.bottomRight.x - 50,
      //     y: rd.detection.box.bottomRight.y,
      //   };

      //   new faceapi.draw.DrawTextField(
      //     [`${faceapi.utils.round(interpolatedAge, 0)} years`],
      //     bottomRight
      //   ).draw(canvas);
      // });
      if(detectedFaces.length >= 6){
       printArray(detectedFaces);
      }
      var t1 = performance.now();
      console.log(t1-t0);
    }, 5000);
  });

  function assignLabel(desc){
    let name = 'person';
    let token = id++;
    let label = name+token;
    labeledDescriptors.push(
      new faceapi.LabeledFaceDescriptors(label, desc)
    );
    //console.log(labeledDescriptors);
    let state = {
      label: label,
      descriptor: desc
    }
    // axios.post('http://localhost:10000/customer/add', state)
    //   .then(res => console.log(res.data));
    return label;
  }

  function drawCanvas(det, canvas, id){
    const age = det.age;
    const interpolatedAge = interpolateAgePredictions(age);
    const bottomRight = {
      x: det.detection.box.bottomRight.x - 50,
      y: det.detection.box.bottomRight.y,
    };

    new faceapi.draw.DrawTextField(
      [`${faceapi.utils.round(interpolatedAge, 0)} years`+`\n${id}`],
      bottomRight
    ).draw(canvas);
  }
  
  async function drawFace(det, video, name){
    let box = det.detection.box;
    const regionsToExtract = [
      new faceapi.Rect( box.x, box.y, box.width, box.height )
    ]
    let faceImg = await faceapi.extractFaces(video, regionsToExtract);
    console.log("faceImg:", faceImg);
    // console.log(faceImg); 
    //let img = document.createElement("img");
    faceImg.forEach(cnv =>{
      // distinctFace.url = cnv.toDataURL();
      // detectedFaces[i] = new Image();
      // detectedFaces[i].src = cnv.toDataURL();
      // img.src = cnv.toDataURL();
      let distinctFace = {};
      distinctFace["name"] = name;
      distinctFace["url"] = cnv.toDataURL();
      detectedFaces.push(distinctFace);
    });
    console.log("Detected Faces:");
    console.log(detectedFaces);
  }

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

  /*
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
  }*/

  // function generator(){
  //   return id++;
  // }
  function printArray(arr){
    arr.forEach(fc => {
      let img = new Image();
      img.src = fc.url;
      div.append(fc.name);
      div.append(img);
    });
    clearInterval();
  }
    return(
      <select>
      </select>
    );
});
}

export default FaceModel;
=======
import * as faceapi from 'face-api.js';
import '../css/styles.css';
import React, { useState } from 'react';
import axios from 'axios';

function FaceModel() {
 
  /*initiating state component*/
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    faceapi.nets.ageGenderNet.loadFromUri("/models"),
  ]).then(console.log("loading."));

  React.useEffect(() => {
  const video = document.getElementById("video");
  let predictedAges = [];
  //var i = 0;
  let outputImg = document.createElement("div");
  const div = document.getElementById("container");
  let counter = 0;
  //var det1 = [];
  var facematcher;
  //var matches = [];
  var id = 1;
  const labeledDescriptors = [];
  const maxThreshold = 0.6;
  const detectedFaces = [];
  let distinctFace = {
    name: "",
    url: ""
  }
  var count = 1;

  video.addEventListener("play", function vidplay() {
    const canvas = faceapi.createCanvasFromMedia(video);
    //console.log("hello");
    // document.body.append(canvas);
    div.append(canvas);  
    const appended_canvas = document.querySelector("canvas")
    appended_canvas.style.position = 'absolute';
    appended_canvas.style.top = '0%';
    appended_canvas.style.left = '0%';

    console.log("appended")
    console.log(appended_canvas.style)

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
      var t0 = performance.now();
      const detections = await faceapi
        .detectAllFaces(
          video,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 960,
            scoreThreshold: 0.4,
          })
        )
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender()
        .withFaceDescriptors();
      
      //saveDetections(video, detections, faceMatcher);

    console.log(detections);

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    if(labeledDescriptors.length == 0){
      detections.forEach(fd => {
        let lb = assignLabel([fd.descriptor]);
        let resizedDetection = faceapi.resizeResults(fd, displaySize);
        faceapi.draw.drawDetections(canvas, resizedDetection);
        drawCanvas(fd, canvas, lb);
        drawFace(fd, video, lb);
      });
    }
    else{
      const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, maxThreshold);
      //console.log(faceMatcher);
      detections.forEach(fd => {
        let bestMatch = faceMatcher.findBestMatch(fd.descriptor);
        if(bestMatch.distance >= maxThreshold){
          let lb = assignLabel([fd.descriptor]);
          let resizedDetection = faceapi.resizeResults(fd, displaySize);
          faceapi.draw.drawDetections(canvas, resizedDetection);
          drawCanvas(fd, canvas, lb);
          drawFace(fd, video, lb);
        }
        else{
        let resizedDetection = faceapi.resizeResults(fd, displaySize);
        //console.log(resizedDetection);
        faceapi.draw.drawDetections(canvas, resizedDetection);
        drawCanvas(resizedDetection, canvas, bestMatch.label);
        //drawFace(fd, video);
        }
        // const age = resizedDetection.age;
        // const interpolatedAge = interpolateAgePredictions(age);
        // const bottomRight = {
        //   x: resizedDetection.detection.box.bottomRight.x - 50,
        //   y: resizedDetection.detection.box.bottomRight.y,
        // };

        // new faceapi.draw.DrawTextField(
        //   [`${faceapi.utils.round(interpolatedAge, 0)} years`+`\n${bestMatch.label}`],
        //   bottomRight
        // ).draw(canvas);
      });
      
      //const results = detections.map(fd => faceMatcher.findBestMatch(fd.descriptor));
      // results.forEach((bestMatch) => {
      //   const text = bestMatch.toString();
      //   console.log(text);
      // })
    }
    
      //extractFaceFromBox(video,detections[0].detection.box);
    
      // const resizedDetections = faceapi.resizeResults(detections, displaySize);
      // canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      // faceapi.draw.drawDetections(canvas, resizedDetections);
      // // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      // // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      // resizedDetections.forEach((rd) => {
      //   const age = rd.age;
      //   const interpolatedAge = interpolateAgePredictions(age);
      //   const bottomRight = {
      //     x: rd.detection.box.bottomRight.x - 50,
      //     y: rd.detection.box.bottomRight.y,
      //   };

      //   new faceapi.draw.DrawTextField(
      //     [`${faceapi.utils.round(interpolatedAge, 0)} years`],
      //     bottomRight
      //   ).draw(canvas);
      // });
      console.log("This is the array to pass:");
      console.log(detectedFaces);
      var t1 = performance.now();
      console.log(t1-t0);
    }, 7000);
  });

  function assignLabel(desc){
    let name = 'person';
    let token = generator();
    let label = name+token;
    labeledDescriptors.push(
      new faceapi.LabeledFaceDescriptors(label, desc)
    );
    //console.log(labeledDescriptors);
    let state = {
      label: label,
      descriptor: desc
    }
    // axios.post('http://localhost:10000/customer/add', state)
    //   .then(res => console.log(res.data));
    return label;
  }

  function drawCanvas(det, canvas, id){
    const age = det.age;
    const interpolatedAge = interpolateAgePredictions(age);
    const bottomRight = {
      x: det.detection.box.bottomRight.x - 50,
      y: det.detection.box.bottomRight.y,
    };

    new faceapi.draw.DrawTextField(
      [`${faceapi.utils.round(interpolatedAge, 0)} years`+`\n${id}`],
      bottomRight
    ).draw(canvas);
  }

  async function drawFace(det, video, name){
    let box = det.detection.box;
    const regionsToExtract = [
      new faceapi.Rect( box.x, box.y, box.width, box.height )
    ]
    // console.log("Check this!")
    // console.log(name);
    // console.log(box.width, box.height);
    // console.log(name);
    let faceImg = await faceapi.extractFaces(video, regionsToExtract);
    // console.log(faceImg); 
    // let img = document.createElement("img");
    faceImg.forEach(cnv =>{
      count++;
      distinctFace.url = cnv.toDataURL;
      
      // detectedFaces[i] = new Image();
      // detectedFaces[i].src = cnv.toDataURL();
    });
    distinctFace.name = name;
    detectedFaces.push(distinctFace);
  }

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

  /*
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
  }*/

  function generator(){
    return id++;
  }
});

  return(
    // <canvas id="myCanvas" height="540" width="720"></canvas>
    <div></div>
    );
}

export default FaceModel;
>>>>>>> b44116fb5fbfb98f97453385fe259500730ae3d6
