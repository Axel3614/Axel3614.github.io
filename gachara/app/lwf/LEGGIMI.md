# LWF

`lwf.js` è la libreria di GREE che disegna le animazioni in formato LWF
(quelle degli artwork delle carte di Dokkan), presa così com'è, senza
modifiche, da https://github.com/gree/lwf (`coffee/js/lwf.js`, ramo
`master`, ultimo aggiornamento del 2023-07-07).

Licenza: zlib (`LICENSE`); le parti di altri autori dentro la libreria
(tween.js, lzma-purejs, base64.js…) sono MIT (`LICENSE.3RDPARTY`).

La pagina la carica solo quando serve (`src/lwf.ts`), con un tag `<script>`
normale: la libreria assegna variabili globali e non è un modulo.
