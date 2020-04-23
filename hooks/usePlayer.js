import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { showMessage } from 'react-native-flash-message';
const sound = new Audio.Sound();

function usePlayer(url) {
  const [playerStatus, setPlayerStatus] = useState({
    isPlaying: false,
    isPaused: true,
    isLoading: false,
  });

  useEffect(() => {
    sound.loadAsync({ uri: url });

    return function cleanup() {
      sound.unloadAsync();
    };
  }, [url]);

  async function play() {
    // Setting loading to true
    setPlayerStatus({ isPlaying: false, isPaused: false, isLoading: true });

    // Setting audio options
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      playThroughEarpieceAndroid: false,
    });

    try {
      await sound.playAsync();

      // Setting playing to true
      setPlayerStatus({ isPlaying: true, isLoading: false, isPaused: false });
    } catch (error) {
      showMessage({
        type: 'error',
        message: 'Failed to play audio',
      });
    }
  }

  async function pause() {
    setPlayerStatus({ isPlaying: false, isLoading: false, isPaused: true });
    await sound.pauseAsync();
  }

  return { ...playerStatus, play, pause };
}

export default usePlayer;
