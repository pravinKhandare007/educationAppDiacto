import { useState } from "react";
import YouTubeVideo from "./YouTubeVideo";

const VideoComponent = () => {
   const [renderComponent , setRenderComponent ] = useState('choiceComponent');
   
   if(renderComponent === "choiceComponent"){
    return (
        <div className="d-flex justify-content-around">
            <div className="video_file">
                <label>choose from pc</label>
                <input type="file" name="desktop_upload" id="desktop_video" />
            </div>
            <div className="yt_video" onClick={()=> setRenderComponent("yt_component")}>
                Click to upload youtube video
            </div>
        </div>
    )
   }
   if(renderComponent === "yt_component"){
    return (
        <YouTubeVideo />
    )
   }
}
 
export default VideoComponent;