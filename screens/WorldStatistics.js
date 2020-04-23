import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StatusBar, View, ActivityIndicator } from 'react-native';
import { BoldText, RegularText } from '../components/Typography';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal';
import styled from 'styled-components';
import { ApolloClient, createHttpLink, gql, InMemoryCache, useLazyQuery } from '@apollo/client';


const covidTrackerGraphqlClient = new ApolloClient({
  link: createHttpLink({
    uri: 'https://covid19-graphql.netlify.com',
  }),
  cache: new InMemoryCache(),
});


const query = gql`
    query ($country: String!){
        globalTotal {
            affectedCountries
            tests
            cases
            todayCases
            deaths
            todayDeaths
            recovered
            active
            critical
            casesPerOneMillion
            deathsPerOneMillion
            testsPerOneMillion
            updated
        }

        country(name:$country) {
            country
            result {
                tests
                cases
                todayCases
                deaths
                todayDeaths
                recovered
                active
                critical
                casesPerOneMillion
                deathsPerOneMillion
                testsPerOneMillion
                updated
            }
        }
    }
`;

const WorldStatistics = ({ navigation }) => {
  StatusBar.setBarStyle('light-content');

  const [countryOne, setCountryOne] = useState('Ghana');
  const [countryOneCode, setCountryOneCode] = useState('GH');

  const [getStats, { loading, data, error }] = useLazyQuery(query, {
    client: covidTrackerGraphqlClient,
  });

  const onCountryOneSelect = (country) => {
    setCountryOneCode(country.cca2);
    setCountryOne(country.name);
  };


  useEffect(() => {
    getStats({
      variables: {
        country: countryOne,
      },
    });
  }, [countryOne]);

  return (
    <ImageBackground
      source={require('../assets/images/assessmentBackground.png')}
      imageStyle={{ borderRadius: 10, opacity: 0.5 }}
      resizeMode="contain"
      style={{ flex: 1, backgroundColor: '#f4f4f4', paddingBottom: 50 }}>
      {
        loading ?
          <View style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            flex: 1,
            height: '100%',
            width: '100%',
            zIndex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ActivityIndicator/>
          </View>
          :
          null
      }
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#898989',
          paddingBottom: 10,
        }}
      >
        <View style={{ marginTop: 50, paddingHorizontal: 20, marginBottom: 0, flex: 0.9 }}>
          <BoldText size="lg">COVID-19 Worldwide</BoldText>
        </View>
      </View>
      <ScrollView style={{ paddingHorizontal: 10, flex: 1, paddingBottom: 50, paddingTop: 20 }}
                  showsVerticalScrollIndicator={false}>
        <View style={{
          borderWidth: 1,
          borderColor: '#e3e3e3',
          paddingVertical: 10,
          borderRadius: 5,
          backgroundColor: 'white',
        }}>
          <View style={{ flexDirection: 'row', marginBottom: 10, marginLeft: 10 }}>
            <View style={{ flex: 0.08 }}>
              <Ionicons name="ios-globe" size={25} color="blue"/>
            </View>
            <View style={{ flex: 0.9, justifyContent: 'center' }}>
              <RegularText size="md">Worldwide Statistics</RegularText>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: '#dedede', padding: 10 }}>
              <RegularText style={{ color: 'blue'}}>Confirmed</RegularText>
              <BoldText size="mlg">{data?.globalTotal?.cases.toLocaleString() || 0}</BoldText>
            </View>
            <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: '#dedede', padding: 10 }}>
              <RegularText style={{ color: 'green'}}>Recovered</RegularText>
              <BoldText size="mlg">{data?.globalTotal?.recovered.toLocaleString() || 0}</BoldText>
            </View>
            <View style={{ flex: 1, padding: 10 }}>
              <RegularText style={{ color: 'red'}}>Deaths</RegularText>
              <BoldText size="mlg">{data?.globalTotal?.deaths.toLocaleString() || 0}</BoldText>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <BoldText style={{ textAlign: 'left', paddingLeft: 5 }}>Select Country: </BoldText>
          <CountryOption style={{ borderWidth: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <CountryPicker
                countryCode={countryOneCode}
                //theme={DARK_THEME}
                //countryCodes={['GH', 'MR', 'CV', 'BJ', 'TG', 'NG', 'LR', 'SL', 'ST', 'GN', 'GW', 'CI']}
                withFlag={true}
                withCountryNameButton={true}
                onSelect={onCountryOneSelect}
                visible={false}
              />
            </View>
            <View style={{ flex: 0.08 }}>
              <EvilIcons name="chevron-down" size={25}/>
            </View>
          </CountryOption>

          <View style={{
            borderWidth: 1,
            borderColor: '#e3e3e3',
            paddingVertical: 10,
            borderRadius: 5,
            backgroundColor: 'white',
          }}>
            <View style={{ flexDirection: 'row', marginBottom: 10, marginLeft: 10 }}>
              <View style={{ flex: 0.05 }}>
                <Ionicons name="ios-stats" size={20} color="#89ac59"/>
              </View>
              <View style={{ flex: 0.9, justifyContent: 'center' }}>
                <RegularText size="md"> Statistics</RegularText>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: '#dedede', padding: 10 }}>
                <RegularText style={{ color: 'blue'}}>Confirmed</RegularText>
                <BoldText size="mlg">{data?.country?.result?.cases.toLocaleString() || 0}</BoldText>
              </View>
              <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: '#dedede', padding: 10 }}>
                <RegularText style={{ color: 'green'}}>Recovered</RegularText>
                <BoldText size="mlg">{data?.country?.result?.recovered.toLocaleString() || 0}</BoldText>
              </View>
              <View style={{ flex: 1, padding: 10 }}>
                <RegularText style={{ color: 'red'}}>Deaths</RegularText>
                <BoldText size="mlg">{data?.country?.result?.deaths.toLocaleString() || 0}</BoldText>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: '#dedede', padding: 10 }}>
                <RegularText style={{ color: 'orange'}}>Active</RegularText>
                <BoldText size="mlg">{data?.country?.result?.active.toLocaleString() || 0}</BoldText>
              </View>
              <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: '#dedede', padding: 10 }}>
                <RegularText style={{ color: 'brown'}}>Critical</RegularText>
                <BoldText size="mlg">{data?.country?.result?.critical.toLocaleString() || 0}</BoldText>
              </View>
              <View style={{ flex: 1, padding: 10 }}>
                <RegularText style={{ color: 'indigo'}}>Tests</RegularText>
                <BoldText size="mlg">{data?.country?.result?.tests.toLocaleString() || 0}</BoldText>
              </View>
            </View>
          </View>
          <RegularText style={{ textAlign: 'right', marginTop: 10 }}>
            Last Updated: {data?.globalTotal?.updated ? new Date(data?.globalTotal?.updated).toDateString() : null}
          </RegularText>
        </View>


      </ScrollView>
    </ImageBackground>
  );
};

const CountryOption = styled.View`
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  padding: 5px 5px;
  margin: 5px 0;
  flex: 1;
  background: #FFFFFF;
  border: 1px solid #e3e3e3;
`;

export default WorldStatistics;
