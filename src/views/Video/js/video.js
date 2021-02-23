import React, {Component} from "react";
import video from "../video.mp4";
import mainFunction from "./main";

class VideoJs extends Component{
    componentDidMount() {
        mainFunction();
      }

    render(){
        return(
            <div>
                <video src={video} controls loop id="video" height="540" width="720" autoplay muted>
                </video>
                {/* 
                <ScriptTag type="text/javascript" src="./demo.js" />
                <ScriptTag type="text/javascript" src="./face-api.min.js" />
                <ScriptTag type="text/javascript" src="./main.js"/>
                <Helmet>
                    <script src="./main.js" type="text/javascript" />
                    <script src="./face-api.min.js" type="text/javascript" />
                </Helmet>
                <Script
                    src="./demo.js"
                    type="text/javascript"
                    async
                /> */}
            </div>
        )
    }
}

export default VideoJs;