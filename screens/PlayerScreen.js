import React from 'react';
import VideoPlayer from '../components/VideoPlayer';
import AudioPlayer from '../components/AudioPlayer';

const PlayerScreen = ({ route }) => {
  const { mediaType, ...media } = route.params
  if (mediaType === 'video') {
    return <VideoPlayer {...media} />;
  } else {
    return <AudioPlayer {...media} />;
  }
};

export default PlayerScreen;
