import React from 'react';
import ReactPlayer from 'react-player';
import treeanimation from '../assets/loadergrowmefast.mp4';

const Loader = ({ onVideoEnd }) => {
  return (
    <div className="loader-container">
      <ReactPlayer 
        url={treeanimation} 
        playing 
        width="100%" 
        height="100%" 
        //onReady={() => console.log('Video is ready')}
        onEnded={onVideoEnd} 
        controls={false} 
        muted={true} 
      />
    </div>
  );
};

export default Loader;
