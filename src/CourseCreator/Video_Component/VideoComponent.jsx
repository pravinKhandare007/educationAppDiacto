import { useEffect, useState } from "react";
import YouTubeVideo from "./YouTubeVideo";

const VideoComponent = ({slidesData , setSlidesData , slideId , contentId}) => {
   
   const [videoData , setVideoData ] = useState({
    renderComponent:"choiceComponent" , 
    ytData : {
        videoUrl:"",
        videoId:""
    }
   })

   useEffect(()=>{
        setSlidesData((slidesData)=>{
            const newSlidesData = {
                ...slidesData, slides: [...slidesData.slides.map((slide) => {
                    if (slide.id === slideId) {
                        console.log("slide.slideId: ", slide.id);
                        return {
                            id: slide.id,
                            content: [...slide.content.map((contentObject) => {
                                if (contentObject.id === contentId) {
                                    return {
                                        id: contentObject.id,
                                        type: contentObject.type,
                                        data: videoData
                                    }
                                }
                                return {
                                    ...contentObject
                                }
                            })]
                        }
                    } else {
                        return { ...slide }
                    }
                })]
            }
            return newSlidesData;
        })
   },[videoData])
   
   if(videoData.renderComponent === "choiceComponent"){
    return (
        <div className="d-flex justify-content-around">
            <div className="video_file">
                <label>choose from pc</label>
                <input type="file" name="desktop_upload" id="desktop_video" />
            </div>
            <div className="yt_video" onClick={()=> setVideoData((prevVideoData)=>{
                const newVideoData = {...prevVideoData , renderComponent: "yt_video"};
                return newVideoData;
            })}>
                Click to upload youtube video
            </div>
        </div>
    )
   }
   if(videoData.renderComponent === "yt_component"){
    return (
        <YouTubeVideo />
    )
   }
}
 
export default VideoComponent;