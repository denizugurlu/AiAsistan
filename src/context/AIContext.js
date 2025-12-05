import { createContext, useState, useEffect, useContext } from 'react';
import { GecmisiTemizle, Getir, Kaydet } from '../storage/storageService';
import { duyguAnaliziYap } from '../api/huggingFaceService';

import { gunlukGirisiOlustur } from '../models/entryModel';

const AIContext = createContext();

export const AIProvider = ({ children }) => {
  const [gunlukListesi, setGunlukListesi] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(false);

  // Verileri ekrana ilk girişte getirir
  useEffect(() => {
    VerileriCek();
  }, []);

  // Servisteki Getir fonksiyonunu kullanarak verileri çekme
  const VerileriCek = async () => {
    const cekilenVeri = await Getir();
    setGunlukListesi(cekilenVeri);
  };

  //Yeni kayıt ekleme fonksiyonu
  const YeniKayitEkle = async metin => {
    setYukleniyor(true);

    const sonuc = await duyguAnaliziYap(metin);

    if (sonuc !== null) {
      const yeniVeri = gunlukGirisiOlustur(metin, sonuc);

      setGunlukListesi([yeniVeri, ...gunlukListesi]);

      await Kaydet(yeniVeri);
    } else {
      alert('Hata oluştu. Yapay zeka analizi yapılamadı.');
    }

    setYukleniyor(false);
  };

  //Tamamen tabloyu temizleme fonksiyonu
  const TabloyuTemizle = async () => {
    await GecmisiTemizle();
    setGunlukListesi([]);
  };

  //oluşturulan durum ve fonksiyonların paketlenmesi
  return (
    <AIContext.Provider
      value={{
        gunlukListesi,
        YeniKayitEkle,
        TabloyuTemizle,
        yukleniyor,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => useContext(AIContext);
