//? Variable declaration:

const maas = document.getElementById("maas");
const krediTur = document.querySelector(".form-select");
const vade = document.querySelector("#vade");
const tutar = document.querySelector("#tutar");
console.log(maas);
const hesaplaBtn = document.querySelector(".btn");
const krediBilgileri = document.querySelector(".kredi-bilgileri");
const aferin = document.querySelector(".aferin");
const bosver = document.querySelector(".bosver");
console.log(bosver);
let oran = 0;
let taksitTutar = 0;
let toplamTutar = 0;

//? hesaplaBtn tıklandığında kontrolleri sağla:

hesaplaBtn.addEventListener("click", () => {
  //? input-text konrolü yap
  if (
    !maas.value ||
    !krediTur.value ||
    !vade.value ||
    !tutar.value ||
    krediTur.value === "Seçiniz" ||
    vade.value === "Seçiniz" ||
    tutar.value === "Seçiniz"
  ) {
    alert(
      "Lütfen maaşınızı, almak istediğiniz kredi türünü, vade ve tutarı giriniz"
    );
  } else if (maas.value >= 10000) {
    if (krediTur.value === "Konut Kredisi") {
      oran = 1.29;
    } else if (krediTur.value === "İhtiyaç Kredisi") {
      oran = 1.99;
    } else if (krediTur.value === "Araç Kredisi") {
      oran = 1.79;
    }
    //? taksit tutarını hesapla:
    const faiz = oran / 100;
    taksitTutar =
      (tutar.value * (faiz * (1 + faiz) ** vade.value)) /
      ((1 + faiz) ** vade.value - 1);
    toplamTutar = taksitTutar * vade.value;
    sonUyari();
  } else {
    bosver.innerHTML = `<h1 class="display-3 text-center text-danger">Maaşın çok düşük olduğu için hesaplama iptal edildi.</h1>
    <h1 class="display-3 text-center text-danger">Neyse boşver üzülme, faiz haram zaten!!! </h1>`;
    aferin.innerHTML = "";
    krediBilgileri.innerHTML = "";
  }
});

const sonUyari = () => {
  let uyari =
    "Bak emin misin, faizli kredi veriyorum, faiz haram haram!!! Eminsen tamama tıkla!";
  if (confirm(uyari) == true) {
    alert("Sen bilirsin, benden günah gitti!!! Hesaplıyorum, az bekle...");
    sonucGetir();
  } else {
    aferin.innerHTML = `<h1 class="display-5 text-center text-danger">Hesaplama iptal edildi.</h1>
    <h1 class="display-5 text-center text-danger">Afferin adamsın!!!</h1>  
  `;
    krediBilgileri.innerHTML = "";
    bosver.innerHTML = "";
  }
};
const sonucGetir = () => {
  krediBilgileri.innerHTML = `
  <h1 class="text-warning text-center">Kredi Bilgileri</h1>
  <table class="table table-bordered mt-3" style="border-color: orange">
    <tbody>
      <tr>
        <th>Kredi Miktarı</th>
        <td>${tutar.value} ₺</td>
        <th>Kredi Tipi</th>
        <td>${krediTur.value}</td>
      </tr>
      <tr>
        <th>Vade</th>
        <td>${vade.value} Ay</td>
        <th>Faiz Oranı</th>
        <td>${oran}</td>
      </tr>
      <tr>
        <th>Toplam Tutar</th>
        <td>${toplamTutar.toFixed(2)} ₺</td>
        <th>Taksit Tutarı</th>
        <td>${taksitTutar.toFixed(2)} ₺</td>
      </tr>
    </tbody>
  </table>
`;
  aferin.innerHTML = "";
  bosver.innerHTML = "";
};
