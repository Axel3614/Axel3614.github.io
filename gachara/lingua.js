// Il pulsante della lingua del sito (in ogni pagina, id "lingua"): mostra
// quella a cui si passa e ricorda la scelta. La lingua di partenza la mette
// il piccolo codice nella testata di ogni pagina (prima di disegnarla, così
// non si vede l'altra per un attimo); i testi stanno in due <span lang>, e lo
// stile mostra solo quelli della lingua scelta.
(function () {
  var pulsante = document.getElementById("lingua");
  if (!pulsante) return;
  var radice = document.documentElement;
  var scrivi = function () {
    pulsante.textContent = radice.getAttribute("data-lingua") === "it" ? "EN" : "IT";
  };
  scrivi();
  pulsante.addEventListener("click", function () {
    var nuova = radice.getAttribute("data-lingua") === "it" ? "en" : "it";
    radice.setAttribute("data-lingua", nuova);
    radice.lang = nuova;
    try {
      localStorage.setItem("gachara:lingua-sito", nuova);
    } catch (e) {}
    scrivi();
  });
})();
