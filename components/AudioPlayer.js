import React from 'react';
import { Image, ProgressViewIOS, View, TouchableOpacity } from 'react-native';
import { RegularText } from './Typography';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';
import SVGIcon from '../components/SVGIcon';
import { fastForward, fastRewind, sermonPlay, pauseIcon } from '../assets/icons';
import styled from 'styled-components';
import ChildScreenHeader from './ChildScreenHeader';
import usePlayer from '../hooks/usePlayer';

const albumArt = require('../assets/images/video-thumbnail.png');

function AudioPlayer({ title, mediaURL }) {
  const { isPaused, isPlaying, play, pause } = usePlayer(mediaURL);

  return (
    <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
      <ChildScreenHeader title={''}/>
      <PlayerContainer>
        <View style={{ marginBottom: 20 }}>
          <Image source={albumArt} style={{ height: 250, width: 250 }}/>
        </View>
        <View style={{ marginBottom: 40 }}>
          <RegularText
            style={{
              fontFamily: 'bold',
              fontSize: RFValue(14),
              marginBottom: 10,
              color: Colors.tintColor,
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
            <RegularText>1:56</RegularText>
          </View>
          <View style={{ flex: 0.5 }}>
            <RegularText style={{ textAlign: 'right' }}>17:44</RegularText>
          </View>
        </View>
        <View style={{ backgroundColor: 'green', width: '80%', marginBottom: 20 }}>
          <ProgressViewIOS progressViewStyle="bar" progress={0.4} trackTintColor="red"/>
        </View>
        <FloatingControlBox>
          <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
            <FastRewindContainer>
              <SVGIcon source={fastRewind} height={25} width={25}/>
            </FastRewindContainer>
          </View>
          <View style={{ flex: 0.4, justifyContent: 'flex-start', alignItems: 'center' }}>
            {
              isPlaying ? <TouchableOpacity onPress={play}>
                  <PlayPauseContainer>
                    <SVGIcon source={sermonPlay} height={50} width={50}/>
                  </PlayPauseContainer>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={pause}>
                  <PlayPauseContainer>
                    <SVGIcon source={pauseIcon} height={50} width={50}/>
                  </PlayPauseContainer>
                </TouchableOpacity>
            }
          </View>
          <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
            <FastForwardContainer>
              <SVGIcon source={fastForward} height={25} width={25}/>
            </FastForwardContainer>
          </View>
        </FloatingControlBox>
      </PlayerContainer>
    </View>

  );
}

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
  box-shadow: 0px 12px 5px rgba(203, 203, 203, 0.5);
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
  background-color: #ffffff;
`;

const PlayerContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

export default AudioPlayer;
