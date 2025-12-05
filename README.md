--AI GÜNLÜK ASISTAN --

Bu proje React Native CLI ile geliştirilmiş yapay zeka destekli bir duygu analiz uygulamasıdır. Kullanıcının girdiği metini analiz eder ve duygu durumunu belirler buna uygun da özet ve öneri sunar.

--Özellikler--
Kullanıcı gününü anlatan bir metin girer.
Hugging Face API kullanılarak girilen metinin analizi yapılır.
Pozitif, Negatif veya Nötr olarak sınıflandırma yapılır.
Sınıflandırma yapıldıktan sonra buna karşılık özet ve öneri sunulur.
Duygu durumuna göre değişebilen dinamik UI tasarımı yapılmıştır.
Tüm veriler AsyncStorage ile telefonda saklanır. İnternet bağlantısı yokken bile geçmiş kayıtlar telefondan görüntülenebilir.
Eski analizler ise tarih ve saat bilgisiyle listelenir.

--Kullanılan Teknolojiler--
Platform = React Native CLI - Javascript 
State Yönetimi = Context API
Yapay Zeka Modeli = Hugging Face API - "distilbert-base-uncased-finetuned-sst-2-english"
Veri Depolama = AsyncStorage 
Navigasyon = React Navigation
UI Tasarımı = StyleSheet


-- Kurulum ve Çalıştırma ---
Gereksinimler = Node.js
	        Java SDK 17
	        Android Studio
                        VS CODE

Proje klonlama = git clone [https://github.com/denizugurlu/AiAsistan](https://github.com/denizugurlu/AiAsistan)
cd AiAsistan

Bağımlılıkların yüklenmesi = npm install

Uygulama başlatma  = Önce Metro Bundler başlamalı : npm start
		  Yeni bir terminal açıp emülatöre yüklenmesi = npm run android



--- Android SDK ve Gradle Hataları ---

Eğer `npm run android` komutu sırasında şu hata görülürse:

"SDK location not found. Define a valid SDK location with an ANDROID_HOME environment variable or by setting the sdk.dir path in your project's local properties file"
- Android SDK yolu makineye özeldir ve Git'e commit edilmez.

Çözüm:
- Android Studio ile `android` klasörünü açın; Studio otomatik olarak `android/local.properties` dosyasını oluşturur ve `sdk.dir` ayarlar.
- Alternatif olarak `android/local.properties` dosyasını elle oluşturun ve Windows için SDK yolunu yazın:

	`sdk.dir=C:\\Users\\<kullanıcı_adı>\\AppData\\Local\\Android\\Sdk`

- `android/local.properties` ve Gradle cache klasörleri `.gitignore` içerisindedir, commit edilmez.
- Proje `compileSdkVersion=36` kullanır; Android Studio SDK Manager üzerinden API 36'yı kurduğunuzdan emin olun.




--Kullanılan AI Modeli Hakkında Bilgiler -- 

Bu projede Hugging Face API kullanılmıştır.
Kullanılan model : distilbert-base-uncased-finetuned-sst-2-english
Model duygu analizi yapmaktadır. "Fine-tuned" bir model olduğu için tercih edilmiştir. Girilen metni alır ve duygusunu tespit eder. Bunun yanında ise bir score değeri döndürür. Bu değer ise sınıflandırmada kullanılmıştır. 



-- AI Araç Kullanımı --

Projenin geliştirilme sürecinde, gerek kod kalitesinin artırılması gerek hataların tespit edilmesini hızlandırmak amacıla Gemini yapay zeka asistanından faydalanılmıştır. 

React Natıve CLI kurulum sırasında alınan Gradle ve Java sürüm uyumsuzluklarını gidermede yardım alındı. 
Hugging Face API entegrasyonu yapılırken fetch yapısının kurulmasında yardım alındı.
AsyncStorage ile veri saklama mantığı konusunda yardımlar alındı.
Duygu analizi sonrası geri gelen cevap ile ilgili örnek cümleler yazdırıldı. 








