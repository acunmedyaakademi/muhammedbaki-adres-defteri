let adresDefteriForm = document.querySelector(".adres-defteri-form");
let adresDefteri = document.querySelector(".adres-defteri");
let adressList = [];

if (typeof localStorage.adressList !== "undefined") {
  adressList = JSON.parse(localStorage.adressList);
  renderAdress();
}

function handleFormSubmit(e) {
  e.preventDefault();
  let formData = new FormData(adresDefteriForm);
  let formObj = Object.fromEntries(formData);
  adressList.push(formObj);
  adresDefteriForm.reset();

  save();
  renderAdress();
}
adresDefteriForm.addEventListener("submit", handleFormSubmit);

function save() {
  localStorage.adressList = JSON.stringify(adressList);
}

let ad = document.querySelector(".ad");
let tel = document.querySelector(".tel");
function renderAdress() {
  adresDefteri.innerHTML = "";
  for (let adres of adressList) {
    adresDefteri.innerHTML += `
      <div class="adres-item">
      <p>${adres.adsoyad}</p>
      <p>${adres.telefon}</p>
      <p>${adres.adresmetni}</p>
      <button class="cancel">✖️</button>
      <button class="pencil">🖋️</button>
      <button class="okey">✔️</button>
      </div>`;

    let iptal = document.querySelectorAll(".adres-item .cancel");
    let adresitem = document.querySelectorAll(".adres-defteri .adres-item");

    for (let i = 0; i < iptal.length; i++) {
      iptal[i].addEventListener("click", () => {
        adressList.splice(i, 1);
        localStorage.adressList = JSON.stringify(adressList);
        adresitem[i].innerHTML = "";
      });
    }
    let okey = document.querySelectorAll(".okey");
    let pencil = document.querySelectorAll(".adres-item .pencil");
    let adresP = document.querySelectorAll(".adres-item p");

    for (let i = 0; i < pencil.length; i++) {
      pencil[i].addEventListener("click", () => {
        console.log(adresP[1]);
        okey[i].style.display = "block";
        adresDefteriForm[0].value = adressList[i].adsoyad;
        adresDefteriForm[1].value = adressList[i].telefon;
        adresDefteriForm[2].value = adressList[i].adresmetni;

        function EditText(e) {
          e.preventDefault();
          adressList[i].adsoyad = adresDefteriForm[0].value;
          adressList[i].telefon = adresDefteriForm[1].value;
          adressList[i].adresmetni = adresDefteriForm[2].value;
          adresitem[i].innerHTML = `
              <p>${adressList[i].adsoyad}</p>
              <p>${adressList[i].telefon}</p>
              <p>${adressList[i].adresmetni}</p>
              <button class="cancel">✖️</button>
              <button class="pencil">🖋️</button>
              <button class="okey">✔️</button>`;
          adresDefteriForm[0].value = "";
          adresDefteriForm[1].value = "";
          adresDefteriForm[2].value = "";
          okey[i].style.display = "none";
          localStorage.adressList = JSON.stringify(adressList);
        }
        okey[i].addEventListener("click", EditText);
      });
    }
  }
}
let garbage = document.querySelector(".garbage");

function handleClearStorage() {
  localStorage.clear();
  adressList = [];
  adresDefteri.innerHTML = "";
}
garbage.addEventListener("click", handleClearStorage);

