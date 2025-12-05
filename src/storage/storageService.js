import AsyncStorage from '@react-native-async-storage/async-storage';

const Tablo_Adı = '@gunluk_kayıt_tablosu';

// okuma

export const Getir = async () => {
  try {
    const tablodakiVeri = await AsyncStorage.getItem(Tablo_Adı);

    if (tablodakiVeri !== null) {
      let gonderilecekVeri = JSON.parse(tablodakiVeri);
      return gonderilecekVeri;
    } else {
      return [];
    }
  } catch (error) {
    console.log('Tablo okunamadı', error);
    return [];
  }
};

//kaydetme işlemleri
export const Kaydet = async kaydedilecekVeri => {
  try {
    const eskiKayitlar = await Getir();

    const yeniListe = [kaydedilecekVeri, ...eskiKayitlar];

    const tabloyaKaydedilecekVeri = JSON.stringify(yeniListe);

    await AsyncStorage.setItem(Tablo_Adı, tabloyaKaydedilecekVeri);
  } catch (error) {
    console.log('Veri tabloya eklenemedi', error);
  }
};

//Gecmisi silme
export const GecmisiTemizle = async () => {
  try {
    await AsyncStorage.removeItem(Tablo_Adı);
    console.log('Geçmiş temizlendi');
  } catch (error) {
    console.log('Geçmiş temizlenemedi.', error);
  }
};
