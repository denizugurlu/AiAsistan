import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAI } from '../context/AIContext';

const HistoryScreen = ({ navigation }) => {
  //AIContextteki verileri kullanmak için tanımlama
  const { gunlukListesi, TabloyuTemizle } = useAI();

  //Silme alerti tanımlanması
  const TemizleOnayi = () => {
    Alert.alert('Emin misin?', 'Tablodaki tüm kayıtlar silinecektir.', [
      { text: 'Vazgeç' },
      { text: 'Sil', onPress: TabloyuTemizle },
    ]);
  };

  //itemin renginin duyguya göre belirlenmesi
  const Item = ({ item }) => {
    let renk = '#607D8B'; //NOTR
    if (item.analiz.duygu === 'POSITIVE') {
      renk = '#4CAF50';
    }
    if (item.analiz.duygu === 'NEGATIVE') {
      renk = '#FF5252';
    }

    //arkaplan renginin duyguya göre belirlenmesi
    const getArkaPlanRengi = () => {
      if (!item) return '#ffffff';

      const duygu = item.analiz.duygu;

      if (duygu === 'POSITIVE') return '#30cd3dff';
      if (duygu === 'NEGATIVE') return '#FF5252';
      return '#607D8B';
    };

    const dinamikArkaPlan = getArkaPlanRengi();

    //tarihi türkiyeye göre formatlamak
    const tarihFormat = new Date(item.tarih).toLocaleDateString('tr-TR');
    const saatFormat = new Date(item.tarih).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <View style={[styles.card, { backgroundColor: dinamikArkaPlan }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.dateFormat}>
            {tarihFormat} - {saatFormat}
          </Text>
          <View style={[styles.duyguSimge, { borderColor: renk }]}>
            <Text style={[styles.duyguText, { color: renk }]}>
              {item.analiz.duygu}
            </Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.gecmisText}>{item.metin}</Text>
        </View>

        <View style={styles.ozetContainer}>
          <Text style={styles.ozetLabel}>ÖZET:</Text>
          <Text style={styles.ozetText}>{item.analiz.ozet}</Text>
        </View>
      </View>
    );
  };

  return (
    //HEADER
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/AI.png')} style={styles.logo} />
        <Text style={styles.title}>GEÇMİŞ</Text>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/geriButton.png')}
            style={styles.gecmisButon}
          />
        </TouchableOpacity>
      </View>

      {/* LİST kısmı*/}
      <View style={styles.listContainer}>
        <FlatList
          data={gunlukListesi}
          keyExtractor={item => item.id}
          renderItem={Item}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <View style={styles.bosContainer}>
              <Text style={styles.bosText}>Hiç kayıt yok </Text>
            </View>
          }
        />
      </View>
      {/* Temizleme butonu*/}
      {gunlukListesi.length > 0 && (
        <TouchableOpacity style={styles.temizleButton} onPress={TemizleOnayi}>
          <Text style={styles.temizleButtonText}>TÜM GEÇMİŞİ SİL </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },

  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#c0c9d6ff',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: '#000000ff',
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
    transform: [{ rotate: '180deg' }],
  },

  listContainer: {
    flex: 1,
    padding: 20,
  },

  card: {
    backgroundColor: '#c0c9d6ff',
    borderWidth: 2,
    borderColor: '#000000ff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#000000ff',
    paddingBottom: 5,
  },
  dateFormat: {
    fontWeight: 'bold',
    color: '#000000ff',
  },
  duyguSimge: {
    backgroundColor: '#ffffffff',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  duyguText: {
    fontWeight: 'bold',
    fontSize: 12,
  },

  textContainer: {
    marginBottom: 10,
  },
  gecmisText: {
    fontSize: 16,
    color: '#000000ff',
    fontStyle: 'italic',
  },
  ozetContainer: {
    backgroundColor: '#ffffffff',
    borderWidth: 1,
    borderColor: '#000000ff',
    padding: 8,
    borderRadius: 5,
  },
  ozetLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  ozetText: {
    color: '#555555ff',
    fontSize: 14,
  },

  bosContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  bosText: {
    fontSize: 18,
    color: '#868585ff',
  },

  temizleButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#FF5252',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000',
    elevation: 5,
  },
  temizleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
