document.addEventListener("DOMContentLoaded", function () {
  Promise.all([
    fetch("header.html").then((response) => response.text()), // Obtener el contenido de header.html
    fetch("footer.html").then((response) => response.text()), // Obtener el contenido de footer.html
  ])
    .then((data) => {
      const [headerContent, footerContent] = data; // Separar el contenido en dos variables

      // Establecer el contenido en los elementos del DOM
      document.getElementById("header-container").innerHTML = headerContent;
      document.getElementById("footer-container").innerHTML = footerContent;
      /* CONSTANTATES PARA MANIPULACION DEL DOM */
      const $btnsBurgerMenu = document.getElementById("btnsBurgerMenu");
      const $btnBurger = document.getElementById("btnburger");
      const $btnClose = document.getElementById("btnClose");
      const $theme = document.getElementById("theme");
      const $moon = document.getElementById("moon");
      const $sun = document.getElementById("sun");
      const $languageElement = document.getElementById("langItem");
      const $langEs = document.getElementById("langEs");
      const $langEn = document.getElementById("langEn");
      const $textsToChange = document.querySelectorAll("[data-section]");
      const $navigation = document.getElementById("navigation");
      const $allBtn = document.querySelectorAll(".navRight div");
      const $allNavInf = document.querySelectorAll(".navLeft .navInfo");
      const $main = document.getElementById("main");
      const $footer = document.getElementById("footer");

      /* BOTON PARA CAMBIAR DE ESPAÑOL A INGLES */
      const changeLanguage = async (language) => {
        const requestJson = await fetch(`/languages/${language}.json`);
        const texts = await requestJson.json();

        for (const $textToChange of $textsToChange) {
          const section = $textToChange.dataset.section;
          const value = $textToChange.dataset.value;
          $textToChange.innerHTML = texts[section][value];
        }
      };

      const selectedLanguage = localStorage.getItem("selectedLanguage");
      if (selectedLanguage) {
        changeLanguage(selectedLanguage);
        if (selectedLanguage === $langEn.dataset.language) {
          $langEs.classList.remove("allTransition");
          $langEn.classList.add("allTransition");
        } else if (selectedLanguage === $langEs.dataset.language) {
          $langEs.classList.add("allTransition");
          $langEn.classList.remove("allTransition");
        }
      }

      $languageElement.addEventListener("click", (e) => {
        const selectedLanguage = e.target.dataset.language;
        localStorage.setItem("selectedLanguage", selectedLanguage);
        changeLanguage(selectedLanguage);
        $langEs.classList.toggle("allTransition");
        $langEn.classList.toggle("allTransition");
      });

      /* BOTON DEL MENU HAMBURGUESA */
      $btnsBurgerMenu.addEventListener("click", (e) => {
        $btnBurger.classList.toggle("allTransition");
        $btnClose.classList.toggle("allTransition");
        $navigation.classList.toggle("allTransition");
        $footer.classList.toggle("allTransition");
        $main.classList.toggle("allTransition");
      });

      /* BOTON PARA CAMBIAR DE DARK A LIGHT */
      $theme.addEventListener("click", (e) => {
        $moon.classList.toggle("allTransition");
        $sun.classList.toggle("allTransition");
        document.body.classList.toggle("dark-theme");
      });

      /* BOTONES INTERNOS DEL NAV */

      $allBtn.forEach((btn) => {
        btn.addEventListener("click", (b) => {
          document.querySelector(".btnActive").classList.remove("btnActive");
          btn.classList.add("btnActive");
          const indiceBtn = Array.from($allBtn).findIndex((btn) =>
            btn.classList.contains("btnActive")
          );
          $allNavInf.forEach((navInfElemet) => {
            navInfElemet.classList.add("allTransition");
          });
          const indiceNavInf = $allNavInf[indiceBtn];
          indiceNavInf.classList.remove("allTransition");
        });
      });
    })
    .catch((error) => console.log(error));
});
