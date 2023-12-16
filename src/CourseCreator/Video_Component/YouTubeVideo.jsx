import React, { useEffect, useState } from 'react';

const YouTubeVideo = ({videoData , setVideoData , reRenderChid}) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');

  const getVideoId = (url) => {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : '';
  };

  const handleInputChange = (e) => {
    const inputUrl = e.target.value;
    setVideoUrl(inputUrl);
    
  };  

  function handleYtURLUpload(){
    const id = getVideoId(videoUrl);
    setVideoId(id);
  }

  useEffect(()=>{
    setVideoData({...videoData , ytData: {...videoData.ytData , videoUrl:videoUrl , videoId:videoId}});
  },[videoId , videoUrl ])

  useEffect(()=>{
    setVideoUrl(videoData.ytData.videoUrl);
    setVideoId(videoData.ytData.videoId);
  },[reRenderChid])

  return (
    <div>
      <label>
        Enter YouTube Video URL:
        <input
          type="text"
          value={videoUrl}
          onChange={handleInputChange}
          placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
        />
      </label>
      <button onClick={handleYtURLUpload}>upload</button>
      {videoId && (
        <div style={{display:"flex" , alignItems:"center" , justifyContent:"center"}}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default YouTubeVideo;
