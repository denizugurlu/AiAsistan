import {
  Image,
  PermissionsAndroid,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useAI } from '../context/AIContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  //metinin tutulması ve AIContextteki fonksiyonların kullanılmak üzere tanımlanması
  const [metin, setMetin] = useState('');
  const { YeniKayitEkle, yukleniyor, gunlukListesi } = useAI();
  const sonSonuc = gunlukListesi[0];

  //arkaplan renginin duyguya göre belirlenmesi

  const getArkaPlanRengi = () => {
    if (!sonSonuc) return '#ffffff';

    const duygu = sonSonuc.analiz.duygu;

    if (duygu === 'POSITIVE') return '#30cd3dff';
    if (duygu === 'NEGATIVE') return '#FF5252';
    return '#607D8B';
  };

  const dinamikArkaPlan = getArkaPlanRengi();

  //duyguya göre renk filtreleme
  const getRenk = duygu => {
    if (duygu == 'POSITIVE') {
      return '#4CAF50';
    }
    if (duygu == 'NEGATIVE') {
      return '#FF5252';
    }
    return '#607D8B';
  };
  //yeni kayıt ekleme fonksiyonunu çalıştırma
  const AnalizBaslat = async () => {
    if (metin.length < 5) {
      Alert.alert('Yazdığınız metin 5 kelimeden fazla olmalıdır.');
      return;
    }
    Keyboard.dismiss();
    await YeniKayitEkle(metin);
    setMetin('');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor={dinamikArkaPlan} />

      <View style={[styles.container, { backgroundColor: dinamikArkaPlan }]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/*HEADER*/}
          <View style={styles.header}>
            <Image
              source={require('../assets/AI.png')}
              style={styles.logo}
            ></Image>
            <Text style={styles.title}>AI ASİSTAN</Text>
            <TouchableOpacity onPress={() => navigation.navigate('History')}>
              <Image
                source={require('../assets/geriButton.png')}
                style={styles.gecmisButon}
              ></Image>
            </TouchableOpacity>
          </View>

          {/*GİRDİ KISMI*/}
          <View style={styles.mainCard}>
            <View style={styles.mainCardHeader}>
              <Image
                source={require('../assets/AI.png')}
                style={styles.logo}
              ></Image>
            </View>
            <View style={styles.inputArea}>
              <TextInput
                style={styles.input}
                placeholder="Bugünki ruh halinizi anlatacak bir şeyler yazın..."
                placeholderTextColor="#868585ff"
                multiline={true}
                numberOfLines={4}
                value={metin}
                onChangeText={setMetin}
              />
            </View>

            <TouchableOpacity
              style={styles.gonderButton}
              onPress={AnalizBaslat}
              disabled={yukleniyor}
            >
              {yukleniyor ? (
                <ActivityIndicator color="#ffffffff" size="small" />
              ) : (
                <Text style={styles.gonderButtonText}>Gönder</Text>
              )}
            </TouchableOpacity>
          </View>

          {/*SONUÇ KISMI*/}

          {sonSonuc && (
            <View style={styles.sonucCard}>
              <View style={styles.ozellıkCard}>
                <Text style={styles.sonucLabel}>DUYGU: </Text>
                <View
                  style={[
                    styles.sonucBox,
                    { borderColor: getRenk(sonSonuc.analiz.duygu) },
                  ]}
                >
                  <Text
                    style={[
                      styles.sonucValue,
                      { color: getRenk(sonSonuc.analiz.duygu) },
                    ]}
                  >
                    {sonSonuc.analiz.duygu}
                  </Text>
                </View>
              </View>

              <View style={styles.ozellıkCard}>
                <Text style={styles.sonucLabel}>ÖZET:</Text>
                <View style={styles.sonucBox}>
                  <Text style={styles.analizValue}>{sonSonuc.analiz.ozet}</Text>
                </View>
              </View>

              <View style={styles.ozellıkCard}>
                <Text style={styles.sonucLabel}>ÖNERİ:</Text>
                <View style={styles.sonucBox}>
                  <Text style={styles.analizValue}>
                    {sonSonuc.analiz.oneri}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#c0c9d6ff',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: '#000',
  },

  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 25,
    color: '#283389',
    fontWeight: 'bold',
    marginLeft: 20,
  },

  gecmisButon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },

  mainCard: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 40,
    marginVertical: 30,
    backgroundColor: '#c0c9d6ff',
    height: 350,
  },
  mainCardHeader: {
    alignItems: 'center',
  },
  inputArea: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    minHeight: 180,
    marginHorizontal: 5,
    marginVertical: 20,
  },
  input: {
    fontSize: 18,
    color: '#000',
    textAlignVertical: 'top',
  },

  gonderButton: {
    backgroundColor: '#283389',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#000',
  },
  gonderButtonText: {
    color: '#ffffffff',
  },
  sonucCard: {
    flexDirection: 'column',

    height: 200,
  },

  ozellıkCard: {
    flexDirection: 'row',
    backgroundColor: '#c0c9d6ff',
    marginHorizontal: 40,
    marginBottom: 10,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  sonucBox: {
    backgroundColor: 'rgba(248, 241, 241, 1)',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    margin: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sonucValue: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 8,
  },
  sonucLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    marginTop: 10,
  },
  analizValue: {
    fontSize: 15,
    padding: 2,
  },
});
