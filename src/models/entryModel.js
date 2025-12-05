export const gunlukGirisiOlustur = (metin, analizSonucu) => {
  return {
    id: Math.floor(Math.random() * 10000).toString(),
    tarih: new Date().toISOString(),
    metin: metin,
    analiz: {
      duygu: analizSonucu.duygu,
      ozet: analizSonucu.ozet,
      oneri: analizSonucu.oneri,
    },
  };
};
