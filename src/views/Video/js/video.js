import React, {Component} from "react";
import '../css/styles.css';
import FaceModel from './main.js';
import demo from './demo.mp4'

class VideoJs extends Component{
    constructor(props) {
        super(props);
        this.streamCamVideo = this.streamCamVideo.bind(this);
        // this.state = {
        //   face_label: "",
        //   face_desc: []
        // }
    }
    streamCamVideo() {
      var constraints = { audio: false, video: { width: 720, height: 540 } };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(mediaStream) {
          var video = document.querySelector("video");
  
          video.srcObject = mediaStream;
          video.onloadedmetadata = function(e) {
            video.play();
          };
        })
        .catch(function(err) {
          console.log(err.name + ": " + err.message);
        }); // always check for errors at the end.
    }
    // componentDidMount() {
    //   FaceModel()
    // }
    render() {
      return (
          <div id="container" style={{position:'relative'}}>
            <video src={demo} autoPlay={true} id="video" controls height="540" width="720"></video>
            <FaceModel style={{position:"absolute", left:'0%',top:'0%'}}></FaceModel>
          </div>
      );
    }
}

export default VideoJs;