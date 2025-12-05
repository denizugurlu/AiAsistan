const API_URL =
  'https://router.huggingface.co/hf-inference/models/distilbert/distilbert-base-uncased-finetuned-sst-2-english';
const API_TOKEN = 'Bearer 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';

//rastgele mesajların bulunduğu mesaj havuzu
const MESAJ_HAVUZU = {
  POSITIVE: [
    {
      ozet: 'Great energy! You seem very motivated.',
      oneri: 'Keep this energy up and share it with others!',
    },
    {
      ozet: 'You are glowing today!',
      oneri: 'Use this positivity to tackle a hard task.',
    },
    {
      ozet: 'Wow, sounds like a fantastic day.',
      oneri: 'Maybe treat yourself to something nice?',
    },
    {
      ozet: 'Success is in the air!',
      oneri: "Don't forget to celebrate your small wins.",
    },
  ],
  NEGATIVE: [
    {
      ozet: 'You seem a bit down or tired today.',
      oneri: 'Take a break and relax for a while.',
    },
    {
      ozet: 'It sounds like a tough day.',
      oneri: "Remember, it's okay not to be okay sometimes.",
    },
    {
      ozet: 'I sense some stress in your words.',
      oneri: 'Deep breathing exercises might help right now.',
    },
    {
      ozet: 'Things seem a bit heavy.',
      oneri: 'Maybe call a friend or go for a short walk.',
    },
  ],
  NOTR: [
    // Nötr durumları
    {
      ozet: 'You seem balanced, neither too high nor too low.',
      oneri: 'A cup of coffee might be good right now.',
    },
    {
      ozet: 'A very calm and steady mood.',
      oneri: 'This is a good time to focus on reading or studying.',
    },
    {
      ozet: 'Just a regular day, it seems.',
      oneri: 'Stay hydrated and keep going.',
    },
    { ozet: 'Emotions are stable.', oneri: 'Enjoy the tranquility.' },
  ],
};

//mesaj havuzundan rastgele mesaj seçer
const rastgeleSec = liste => {
  const rastgeleIndex = Math.floor(Math.random() * liste.length);
  return liste[rastgeleIndex];
};

//yazılan metin modele gönderilir ve modelden response döner
export const duyguAnaliziYap = async metin => {
  try {
    console.log('Metin modele gönderiliyor: ', metin);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: API_TOKEN,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ inputs: metin }),
    });

    if (!response.ok) {
      console.error("API'den response alımında hata oluştu.", response.status);
      return null;
    }

    var sonuc = await response.json();
    console.log('Dönen response : ', sonuc);

    const item = sonuc?.[0]?.[0];

    if (!item) return null;

    const label = item.label || 'NEGATIVE';
    const score = item.score || 0;

    let secilenMesaj = {};
    let duygu = 'NEGATIVE';
    //Modelden dönen verideki score değerine göre NOTR değeri belirlenir. Dönen değerler çok yüksek olduğu için eşiği 0.95 ten küçük olan değerleri seçtim.
    if (score < 0.95) {
      duygu = 'NOTR';
      secilenMesaj = rastgeleSec(MESAJ_HAVUZU.NOTR);
    } else if (label === 'POSITIVE') {
      duygu = 'POSITIVE';
      secilenMesaj = rastgeleSec(MESAJ_HAVUZU.POSITIVE);
    } else {
      duygu = 'NEGATIVE';
      secilenMesaj = rastgeleSec(MESAJ_HAVUZU.NEGATIVE);
    }

    return {
      duygu: duygu,
      ozet: secilenMesaj.ozet,
      oneri: secilenMesaj.oneri,
    };
  } catch (error) {
    console.error('Servise ulaşılamadı', error);
    return null;
  }
};
