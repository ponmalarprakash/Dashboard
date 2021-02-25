import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Animated,
  Dimensions,
  TextInput,
  Easing,
  Alert,
  ScrollView,
  FlatList,
  BackHandler,
  useWindowDimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import GlobalFont from 'react-native-global-font';
import * as Colors from './src/colors';
import * as DATA from './src/constants';

const App = () => {
  const isFirstLaunched = true;
  const [loader, showLoader] = useState(false);
  const [searchQuery, setSearchQuery] = useState('Search..');
  const [latlong, setLatLong] = useState({
    lat: '',
    long: '',
    address: '',
  });
  const [selectedId, setSelectedId] = useState('');
  const [modelData, setModelData] = useState([]);
  const [tempModelData, setTempModelData] = useState([]);
  const [showcancelImage, setShowCancelImage] = useState(false);
  const [address, setAddress] = useState('');
  const [animation, showAnimation] = useState(false);
  const [dialogLoader, setDialogLoader] = useState(false);
  const animatedValue = new Animated.Value(0);
  const [orientation, setOrientation] = useState('');
  const [time, setTime] = useState(false);
  const [canRefreshPage, setCanRefreshPage] = useState(true);
  const [kioskId, setKioskId] = useState('');
  let intervalId = 0;
  const [exitApp, setExitApp] = useState(false);
  const [internetConnectionScreen, showInternetConnectionScreen] = useState(
    false,
  );
  const [type, setType] = useState(1);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [supervisorId, setSupervisorId] = useState(1);
  let fontName = 'GoodTimesRg-Regular';
  GlobalFont.applyGlobal(fontName);

  const NavigationDrawerStructure = () => {
    return (
      <View style={{marginHorizontal: wp('3%'), marginVertical: hp('2%')}}>
        <TouchableOpacity
          style={{
            paddingEnd: wp('3%'),
            paddingBottom: hp('2%'),
            paddingTop: hp('2%'),
            paddingStart: wp('3%'),
          }}>
          <Image
            source={require('./src/images/menu.png')}
            style={{
              width: wp('3%'),
              height: hp('3%'),
              padding: hp('1.8%'),
              tintColor: Colors.ColorPrimary,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  function LogoImage() {
    return (
      <Image
        style={{
          width: wp('20%'),
          height: hp('15%'),
          padding: hp('2%'),
          alignSelf: 'center',
          marginTop: hp('2%'),
        }}
        source={require('./src/images/ic_launcher.png')}
      />
    );
  }

  function Profile() {
    return (
      <View style={{alignItems: 'center', margin: 20}}>
        <Text
          style={{
            color: Colors.ColorPrimary,
            fontSize: hp('2.1%'),
            padding: hp('1%'),
          }}>
          TestCbe
        </Text>
        <Text
          style={{
            color: Colors.ColorPrimary,
            fontSize: hp('1.8%'),
            padding: hp('1%'),
            marginTop: hp('1%'),
          }}>
          SupervisorOne
        </Text>
      </View>
    );
  }

  function SearchView() {
    return (
      <View
        style={{
          flexDirection: 'row',
          margin: wp('5%'),
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: Colors.ColorPrimary,
            fontSize: hp('2%'),
            paddingStart: wp('7%'),
            fontWeight: '600',
          }}>
          Drop Off:
        </Text>

        <View
          style={{
            marginHorizontal: wp('2%'),
            backgroundColor: Colors.White,
            paddingHorizontal: wp('2%'),
            paddingVertical: hp('0.5%'),
            borderRadius: hp('5%'),
            flexDirection: 'row',
            height: hp('5.8%'),
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
          }}>
          <TouchableOpacity style={{flex: 1}}>
            <Text
              style={{
                fontSize: hp('2%'),
                width: '100%',
                height: '100%',
                padding: hp('1.2%'),
                paddingStart: wp('1%'),
                color:
                  searchQuery == 'Search..'
                    ? Colors.Grey
                    : Colors.ColorSecondary,
              }}>
              {searchQuery}
            </Text>
          </TouchableOpacity>
          {showcancelImage ? (
            <TouchableOpacity>
              <Image
                style={{
                  width: hp('3%'),
                  height: hp('3%'),
                  margin: hp('1%'),
                  tintColor: Colors.Grey,
                }}
                source={require('./src/images/ic_cancel.png')}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Image
                style={{
                  width: hp('3%'),
                  height: hp('3%'),
                  margin: hp('1%'),
                  tintColor: Colors.Grey,
                }}
                source={require('./src/images/search.png')}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  const renderItem = ({item, index}) => {
    return (
      <View style={{marginHorizontal: wp('2%')}}>
        <ListItem
          item={item}
          position={index}
          onPress={() => setSelectedId(item.motor_id)}
        />
      </View>
    );
  };

  const ListItem = ({item, position, onPress}) => {
    return (
      <TouchableOpacity>
        <View style={styles.listBackground}>
          <Image
            style={{
              width: wp('38%'),
              height: hp('8%'),
            }}
            source={{uri: item.model_image}}
          />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              marginStart: wp('1.5%'),
              flex: 1,
            }}>
            <Text style={styles.modelNameText}>{item.motor_name}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.fareCountText}>Available Cars: </Text>
              <Text style={styles.fareCount}>{item.driver_count}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.fareCountText}>Fare: </Text>
              <Text style={styles.fareCount}>
                {item.meter_fare ? 'AED ' + item.meter_fare : null}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.ColorSecondary,
        width: orientation == 'Landscape' ? hp('100%') : wp('100%'),
        height: orientation == 'Landscape' ? wp('100%') : hp('100%'),
      }}
      onLayout={(event) => {
        if (event.nativeEvent.layout.width > event.nativeEvent.layout.height) {
          setOrientation('Landscape');
        } else {
          setOrientation('Portrait');
        }
      }}>
      <StatusBar
        backgroundColor={Colors.ColorSecondary}
        barStyle="light-content"
      />
      <View style={styles.container}>
        <FlatList
          horizontal={false}
          data={DATA.modelData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={[styles.container, {marginBottom: hp('3%')}]}>
              <View
                style={{position: 'absolute', top: hp('1%'), left: hp('1%')}}>
                <NavigationDrawerStructure />
              </View>
              <LogoImage />
              <Profile />
              <SearchView />
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ColorSecondary,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  listBackground: {
    paddingVertical: hp('2.2%'),
    paddingHorizontal: wp('2.5%'),
    alignItems: 'center',
    color: Colors.ColorPrimary,
    borderRadius: hp('2%'),
    backgroundColor: Colors.ColorPrimary,
    flexDirection: 'row',
    marginHorizontal: wp('2%'),
    marginBottom: hp('2.5%'),
  },
  modelNameText: {
    color: Colors.ColorSecondary,
    fontSize: hp('2.3%'),
    fontWeight: '600',
  },
  fareCountText: {
    color: 'white',
    fontSize: hp('1.9%'),
    fontWeight: '600',
  },
  fareCount: {
    color: Colors.ColorSecondary,
    fontSize: hp('1.9%'),
    fontWeight: '600',
  },
});
