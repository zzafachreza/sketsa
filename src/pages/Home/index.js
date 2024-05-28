import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, PermissionsAndroid, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { NavigationRouteContext, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import MyCarouser from '../../components/MyCarouser';
import { Rating } from 'react-native-ratings';
import { MyButton, MyGap, MyHeader } from '../../components';
import GetLocation from 'react-native-get-location';
import ProgressCircle from 'react-native-progress-circle';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
export default function Home({ navigation, route }) {

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const BAJU = [
    {
      image: require('../../assets/sfront.png'),
      label: 'Lengan Pendek (Depan)'
    },
    {
      image: require('../../assets/sback.png'),
      label: 'Lengan Pendek (Belakang)'
    },
    {
      image: require('../../assets/lfront.png'),
      label: 'Lengan Panjang (Depan)'
    },
    {
      image: require('../../assets/lback.png'),
      label: 'Lengan Panjang (Belakang)'
    }
  ]

  const [lihat, setLihat] = useState(0);
  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [comp, setComp] = useState({});
  const [loading, setLoading] = useState(false);
  const [kirim, setKirim] = useState({
    foto_baju: null,
  })
  const [artikel, setArtikel] = useState([]);
  const [nomor, setNomor] = useState(0);


  const sendServer = () => {
    console.log(kirim);
    setLoading(true)
    axios.post(apiURL + 'add_baju', kirim).then(res => {
      console.log(res.data);
      if (res.data.status == 200) {
        Alert.alert(MYAPP, res.data.message);
        setKirim({
          ...kirim,
          foto_baju: null
        })
      }
    }).finally(() => {
      setLoading(false)
    })
  }

  const _getTransaction = async () => {

    requestCameraPermission();
    getData('user').then(u => {
      setUser(u);
    })

    axios.post(apiURL + 'company').then(res => {

      setComp(res.data.data);

    });



  }


  useEffect(() => {
    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);

  const [lokasi, setLokasi] = useState({
    lat: 0,
    long: 0
  })




  return (

    <View style={{
      flex: 1,
      width: "100%",
      height: "100%",

      backgroundColor: colors.primary,



    }}>

      {/* HEADERS */}
      {/* <View style={{
        flexDirection: "row",
        backgroundColor: colors.primary,
        padding: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: 'space-between'


      }}>

        <View>
          <Text style={{
            fontFamily: fonts.secondary[800],
            color: colors.white

          }}>Hello {user.nama_lengkap}</Text>
          <Text style={{ fontFamily: fonts.primary[400], color: colors.white }}>
            Selamat datang
          </Text>
        </View>


        <Image source={require('../../assets/logo2.png')} style={{
          width: 150, height: 50,
        }}
        />


      </View> */}

      <View style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>


        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',

        }}>
          <View style={{
            width: windowWidth,
            // backgroundColor: colors.primary,
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}>
              <TouchableOpacity onPress={() => {
                setNomor(0);
              }} style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: nomor == 0 ? colors.primary : colors.white,
                borderWidth: 1,
                borderColor: colors.primary,
                padding: 5,
                borderRadius: 10,
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 12,
                  color: nomor == 0 ? colors.white : colors.primary
                }}>Lengan Pendek (Depan)</Text>

              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setNomor(1);
              }} style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: nomor == 1 ? colors.primary : colors.white,
                borderWidth: 1,
                borderColor: colors.primary,
                padding: 5,
                borderRadius: 10,
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 12,
                  color: nomor == 1 ? colors.white : colors.primary
                }}>Lengan Pendek (Belakang)</Text>

              </TouchableOpacity>
            </View>
            <View style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}>
              <TouchableOpacity onPress={() => {
                setNomor(2);
              }} style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: nomor == 2 ? colors.primary : colors.white,
                borderWidth: 1,
                borderColor: colors.primary,
                padding: 5,
                borderRadius: 10,
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 12,
                  color: nomor == 2 ? colors.white : colors.primary
                }}>Lengan Panjang (Depan)</Text>

              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setNomor(3);
              }} style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: nomor == 3 ? colors.primary : colors.white,
                borderWidth: 1,
                borderColor: colors.primary,
                padding: 5,
                borderRadius: 10,
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 12,
                  color: nomor == 3 ? colors.white : colors.primary
                }}>Lengan Panjang (Belakang)</Text>

              </TouchableOpacity>
            </View>
          </View>
          <ImageBackground source={{
            uri: kirim.foto_baju
          }} style={{

            width: 350,
            height: 420,
          }}>
            <Image source={BAJU[nomor].image} style={{
              width: 350,
              height: 420,
            }} />
            <Text style={{
              position: 'absolute',
              fontFamily: fonts.secondary[800],
              bottom: 0,
              textAlign: 'center',
              right: 0,
            }}>{BAJU[nomor].label}</Text>



          </ImageBackground>



        </View>


        <TouchableOpacity onPress={() => {


          launchCamera({
            includeBase64: true,
            quality: 1,
            mediaType: "photo",
            maxWidth: 1000,
            maxHeight: 1000
          }, response => {
            console.log('All Response = ', response);

            if (!response.didCancel) {
              setKirim({
                ...kirim,
                foto_baju: `data:${response.type};base64, ${response.base64}`,
              });
            }


          });



        }} style={{
          alignSelf: 'center',
          marginVertical: 10,
          width: 60,
          height: 60,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: 'hidden',
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Icon type='ionicon' name='aperture' size={30} />
        </TouchableOpacity>

        {loading && <ActivityIndicator color={colors.primary} size="large" />}

        {
          kirim.foto_baju !== null && !loading &&

          <View style={{
            flexDirection: 'row',
            marginVertical: 10,
            marginHorizontal: 10,
          }}>
            <View style={{
              flex: 1,
              paddingRight: 5
            }}>
              <MyButton onPress={sendServer} title="Simpan Foto" warna={colors.primary} Icons="checkmark" />
            </View>
            <View style={{
              flex: 1,
              paddingLeft: 5
            }}>
              <MyButton onPress={() => setKirim({
                ...kirim,
                foto_baju: null
              })} title="Batal" warna={colors.danger} Icons="close" />
            </View>
          </View>
        }
      </View >





    </View >

  )
}

const styles = StyleSheet.create({
  tulisan: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.secondary[600],
    color: colors.black,
    textAlign: 'justify'
  },
  tulisanJudul: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.secondary[800],
    color: colors.black,
    textAlign: 'justify'
  }
})