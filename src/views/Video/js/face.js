import * as faceapi from 'face-api.js';
import '../css/styles.css';
import React, { useState } from 'react';
import axios from 'axios';

const detectedFaces = [];
const labeledDescriptors = [];
const predictedAges = [];
var id = 1;

const FaceModel = (props) => {
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        faceapi.nets.ageGenderNet.loadFromUri("/models"),])
        .then(console.log("loading."));
    
    const[detFaces, setDetFaces] = useState([]);
    React.useEffect(() => {
        const div = document.getElementById("container");
        const video = document.getElementById("video");
        //const predictedAges = [];
        //const labeledDescriptors = [];
        const maxThreshold = 0.6;
        //const detectedFaces = [];
        let counter = 0;
        ///var id = 1;
        var facematcher;

        video.addEventListener("play", () => {
            const canvas = faceapi.createCanvasFromMedia(video);
            div.append(canvas);  
            const appended_canvas = document.querySelector("canvas")
            appended_canvas.style.position = 'relative';
            //appended_canvas.style.top = '45%';
            //appended_canvas.style.left = '25%';

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

                    console.log(detections);
                    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

                    if(labeledDescriptors.length == 0){
                        detections.forEach(fd => {
                            let lb = assignLabel([fd.descriptor], id);
                            let resizedDetection = faceapi.resizeResults(fd, displaySize);
                            faceapi.draw.drawDetections(canvas, resizedDetection);
                            // drawCanvas(fd, canvas, lb);
                            drawFace(fd, video, lb);
                        });
                    }
                    else{
                        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, maxThreshold);
                        detections.forEach(fd => {
                            let bestMatch = faceMatcher.findBestMatch(fd.descriptor);
                            if(bestMatch.distance >= maxThreshold){
                                let lb = assignLabel([fd.descriptor], id);
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
                        });
                    }
                    if(detectedFaces.length >= 6){
                        printArray(detectedFaces, div);
                    }
                    var t1 = performance.now();
                    console.log(t1-t0);
            }, 8000);
        });
        if (detectedFaces.length != 0){
            return (
                <select>
                    {optionTag(detFaces)}
                </select>
            )
        }
        else{
            return (
                <div>No detected faces</div>
            )
        }
    });
}

const assignLabel = (desc, id) => {
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

const drawCanvas = (det, canvas, id) => {
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

const drawFace = async (det, video, name) => {
    let box = det.detection.box;
    const regionsToExtract = [
      new faceapi.Rect( box.x, box.y, box.width, box.height )
    ]
    let faceImg = await faceapi.extractFaces(video, regionsToExtract);
    console.log("faceImg:", faceImg);
    faceImg.forEach(cnv =>{
        let distinctFace = {};
        distinctFace["name"] = name;
        distinctFace["url"] = cnv.toDataURL();
        detectedFaces.push(distinctFace);
      });
    console.log("Detected Faces:");
    console.log(detectedFaces);
}

const interpolateAgePredictions = (age) => {
    predictedAges = [age].concat(predictedAges).slice(0, 30);
    const avgPredictedAge =
      predictedAges.reduce((total, a) => total + a) / predictedAges.length;
    return avgPredictedAge;
}

const printArray = (arr, div) => {
    arr.forEach(fc => {
        let img = new Image();
        img.src = fc.url;
        div.append(fc.name);
        div.append(img);
    });
}

const optionTag = (detectedFaces) => {
    detectedFaces.map((df, i) => {
        return(
            <option key={i} value={df.name}>{df.name}</option>
        )
    });
}

export default FaceModel;