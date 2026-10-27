// Il conteggio anonimo del sito: una visita al giorno per browser, e i clic sui
// pulsanti "scarica" e "apri". Solo somme: niente identificativi, niente
// cookie. Le date dell'ultima visita contata restano in questo browser, e
// servono solo a non contare due volte lo stesso giorno (e a sapere se è la
// prima visita della settimana, del mese, in assoluto). Non conta per chi ha
// acceso "Do Not Track" e nelle prove sul PC. Come nell'app: src/dati/uso.ts.
(function () {
  var INDIRIZZO = "https://hjzdrsibyokgqthusppv.supabase.co/functions/v1/Gachadex";
  if (location.protocol !== "https:" || navigator.doNotTrack === "1") return;
  var due = function (n) { return (n < 10 ? "0" : "") + n; };
  var manda = function (corpo, poi) {
    try {
      // Testo semplice: il browser non fa la domanda preliminare.
      fetch(INDIRIZZO, { method: "POST", headers: { "content-type": "text/plain;charset=UTF-8" }, body: JSON.stringify(corpo), keepalive: true })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (letto) { if (letto && letto.ok && poi) poi(); })
        .catch(function () {});
    } catch (e) {}
  };

  // La visita di oggi.
  try {
    var d = new Date();
    var giorno = d.getFullYear() + "-" + due(d.getMonth() + 1) + "-" + due(d.getDate());
    var g = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    g.setUTCDate(g.getUTCDate() + 4 - (g.getUTCDay() || 7));
    var settimana = g.getUTCFullYear() + "-W" + due(Math.ceil(((g.getTime() - Date.UTC(g.getUTCFullYear(), 0, 1)) / 86400000 + 1) / 7));
    var mese = giorno.slice(0, 7);
    var prima = null;
    try { prima = JSON.parse(localStorage.getItem("gachara:visita") || "null"); } catch (e) {}
    if (!prima || prima.giorno !== giorno) {
      manda(
        { tipo: "uso", piattaforma: "sito", settimana: !prima || prima.settimana !== settimana, mese: !prima || prima.mese !== mese, nuova: !prima },
        function () { try { localStorage.setItem("gachara:visita", JSON.stringify({ giorno: giorno, settimana: settimana, mese: mese })); } catch (e) {} }
      );
    }
  } catch (e) {}

  // I clic sui pulsanti segnati con data-conta (clic-windows, clic-android, clic-web).
  document.addEventListener("click", function (evento) {
    var pulsante = evento.target && evento.target.closest ? evento.target.closest("[data-conta]") : null;
    if (pulsante) manda({ tipo: "uso", piattaforma: pulsante.getAttribute("data-conta") });
  });
})();
