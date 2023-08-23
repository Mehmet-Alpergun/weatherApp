const url = "YOUR_API_URL_HERE"; // apiyi çektiğimiz adress - openweater dan ücretsiz alınabilir
const apiKey = "YOUR_API_KEY_HERE"; // apikey size bu bilgilerden faydalanma fırsatı sunar - openweater dan ücretsiz alınabilir

const searchBar = document.getElementById("searchBar");

const getResult = (cityName) => {
  // input değerini sistemde arar
  let query = `${url}weather?q=${cityName}&appid=${apiKey}&units=metric&lang=tr`;
  fetch(query)
    // fetch ile yakalanır
    .then((weather) => {
      // json formatına dönüştürülür
      return weather.json();
    })
    // json formatına dönüşmüş parametre displayResult'a gönderilir
    .then(displayResult);
};

const displayResult = (result) => {
  // html kısmında sehir isminin yazdığı kısmın id si çekilere flexible hale geitirilir
  let city = document.querySelector(".city");
  city.innerText = `${result.name}, ${result.sys.country}`;

  // html kısmında bulunan anlık sıcaklık flexible hale geitirilir
  let temp = document.querySelector(".temp");
  temp.innerText = `${Math.round(result.main.temp)}ºC`;

  // html kısmında description flexible hale geitirilir
  let desc = document.querySelector(".desc");
  desc.innerText = result.weather[0].description;

  // html kısmında bulunan min ve max dereceler flexible hale geitirilir
  let minMax = document.querySelector(".minMax");
  minMax.innerText = `${Math.round(result.main.temp_min)}ºC / ${Math.round(
    result.main.temp_max
  )}ºC`;
};

searchBar.addEventListener("keypress", (e) => {
  //input kısmına isim girildikten sonra eğer enter tuşuna basılırsa fonksiyonlar çalışmaya başlar
  if (e.key == "Enter") {
    // input değerini value ile yakalnır ve getResult methoduna parametre olarak gönderilir
    getResult(searchBar.value);
  }
});
