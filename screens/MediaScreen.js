import React, { useEffect, useState } from 'react';
import { FlatList, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import ChildScreenHeader from '../components/ChildScreenHeader';
import { gql, useQuery } from '@apollo/client';
import LoadingState from '../components/LoadingState';
import styled from 'styled-components';
import { BoldText, RegularText } from '../components/Typography';
import Colors from '../constants/Colors';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Ionicons } from '@expo/vector-icons';


const query = gql`
    query {
        media {
            mediaType
            mediaURL
            title
            description
        }
    }
`;



function MediaThumbnail({ mediaURL, mediaType }){
  const [thumbnailURL, setThumbnailURL] = useState('')

  useEffect(() => {
    async function generateThumbnail() {
      if(mediaType === 'video'){
        const { uri } = await VideoThumbnails.getThumbnailAsync(
          mediaURL,
          {
            time: 15000,
          }
        );
        setThumbnailURL(uri)
      }
    }

    generateThumbnail()
  })

  return (
    <Image source={thumbnailURL ? { uri: thumbnailURL}: require('../assets/images/video-thumbnail.png')}
           style={{ width: 100, height: 100, borderRadius: 2}}/>
  )
}

function Media({ navigation }) {
  const { loading, data, refetch } = useQuery(query);

  if (loading) {
    return (
      <Container>
        <ChildScreenHeader title="Media" />
        <LoadingState />
      </Container>
    );
  }


  return (
    <Container>
      <ChildScreenHeader title="Media" />
      <View style={{ paddingHorizontal: 20, paddingVertical: 10, flex: 1 }}>
        <FlatList data={data.media} renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Player', { ...item })}>
              <View style={{ flexDirection: 'row', flex: 1, borderBottomWidth: 1, borderBottomColor: '#e3e3e3', paddingVertical: 10 }}>
                <View style={{ flex: 1}}>
                  <MediaThumbnail
                    mediaURL={item.mediaURL}
                    mediaType={item.mediaType}
                  />
                </View>

                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between'  }}>
                  <View style={{ justifyContent: 'space-between' }}>
                    <View>
                      <RegularText>{item.title}</RegularText>
                      <RegularText>{item.description}</RegularText>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <View style={{ backgroundColor: "#DDDDDD", padding: 5, borderRadius: 2}}>
                        <RegularText>{item.mediaType.charAt(0).toUpperCase().concat(item.mediaType.slice(1))}</RegularText>
                      </View>
                    </View>
                  </View>

                  <View style={{ justifyContent: 'center'}}>
                    <Ionicons name="ios-arrow-forward" size={20}/>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}/>
      </View>
    </Container>
  );

}

const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;



export default Media;
