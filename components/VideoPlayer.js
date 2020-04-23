import React, { useState, useRef } from 'react';
import { View, ProgressViewIOS, TouchableOpacity } from 'react-native';
import { RegularText } from './Typography';
import styled from 'styled-components';
import SVGIcon from './SVGIcon';
import { fastForward, fastRewind, pauseIcon, sermonPlay } from '../assets/icons';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';

import { Video } from 'expo-av';
import Layout from '../constants/Layout';
import ChildScreenHeader from './ChildScreenHeader';

const VideoPlayer = ({ title, mediaURL }) => {
  let videoRef = useRef();
  const [playerStatus, setPlayerStatus] = useState('playing');
  const [progress, setProgress] = useState(0.4);
  return (
    <View>
      <ChildScreenHeader title={""}/>
      <PlayerContainer>
        <View style={{ marginBottom: 20 }}>
          <Video
            source={{ uri: mediaURL }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={Video.RESIZE_MODE_COVER}
            shouldPlay
            style={{ minWidth: Layout.window.width, minHeight: 300 }}
            ref={component => {
              videoRef = component;
            }}
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          />
        </View>
        <View style={{ marginBottom: 40 }}>
          <RegularText
            style={{
              fontFamily: 'bold',
              fontSize: RFValue(14),
              marginBottom: 10,
              color: Colors.tintColor,
              textAlign: 'center',
            }}
          >
            {title}
          </RegularText>
        </View>
        <View
          style={{
            paddingHorizontal: 40,
            flexDirection: 'row',
            alignItems: 'space-around',
            marginBottom: 20,
          }}
        >
          <View style={{ flex: 0.5 }}>
            <RegularText>{new Date(progress).toISOString().slice(11, -1)}</RegularText>
          </View>
          <View style={{ flex: 0.5 }}>
            <RegularText style={{ textAlign: 'right' }}>17:44</RegularText>
          </View>
        </View>
        <View style={{ backgroundColor: 'green', width: '80%', marginBottom: 20 }}>
          <ProgressViewIOS progressViewStyle="bar" progress={progress} trackTintColor="red" />
        </View>
        <FloatingControlBox>
          <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
            <FastRewindContainer>
              <SVGIcon source={fastRewind} height={25} width={25} />
            </FastRewindContainer>
          </View>
          {playerStatus === 'playing' ? (
            <View style={{ flex: 0.4, justifyContent: 'flex-start', alignItems: 'center' }}>
              <TouchableOpacity onPress={onPause}>
                <PlayPauseContainer>
                  <SVGIcon source={pauseIcon} height={50} width={50} />
                </PlayPauseContainer>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flex: 0.4, justifyContent: 'flex-start', alignItems: 'center' }}>
              <TouchableOpacity onPress={onPlay}>
                <PlayPauseContainer>
                  <SVGIcon source={sermonPlay} height={50} width={50} />
                </PlayPauseContainer>
              </TouchableOpacity>
            </View>
          )}
          <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
            <FastForwardContainer>
              <SVGIcon source={fastForward} height={25} width={25} />
            </FastForwardContainer>
          </View>
        </FloatingControlBox>
      </PlayerContainer>

    </View>
  );

  async function onPause() {
    await videoRef.pauseAsync();
    setPlayerStatus('paused');
  }

  async function onPlay() {
    await videoRef.playAsync();
    setPlayerStatus('playing');
  }

  async function handlePlaybackStatusUpdate(status) {
    if (status.isLoaded) {
      setProgress(Number(status.positionMillis) / status.durationMillis);
    }

    if (status.positionMillis === status.durationMillis) {
      await videoRef.setPositionAsync(0);
      setProgress(0);
    }

    if (status.isPlaying) {
      setPlayerStatus('playing');
    } else {
      setPlayerStatus('paused');
    }
  }
};

const FastRewindContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  border: 1px solid #25569c;
  background-color: #f5f5f5;
`;

const FastForwardContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  border: 1px solid #25569c;
  background-color: #f5f5f5;
`;

const PlayPauseContainer = styled.View`
  height: 120px;
  width: 120px;
  border-radius: 60px;
  border: 1px solid #25569c;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
`;

const ControlBox = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f8fafb;
  height: 120px;
  width: 100%;
  bottom: 50px;
`;

const FloatingControlBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const PlayerContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export default VideoPlayer;
