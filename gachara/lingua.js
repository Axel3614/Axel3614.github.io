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

// Un link a una domanda (#feedback) la apre: le domande sono chiuse finché
// non le si tocca.
function apriDomanda() {
  const domanda = location.hash.length > 1 ? document.getElementById(location.hash.slice(1)) : null;
  if (domanda && domanda.tagName === "DETAILS") domanda.open = true;
}
addEventListener("hashchange", apriDomanda);
addEventListener("DOMContentLoaded", apriDomanda);
