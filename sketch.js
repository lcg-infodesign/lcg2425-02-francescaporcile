let glifSize = 15;   // Dimensione del glifo
let space = 28;      // Spazio tra i glifi
let padding = 30;    // Padding attorno alla griglia
let colors = [];     // Array per i colori (generati casualmente)

function setup() {
  createCanvas(windowWidth, windowHeight); //tela grande quanto la finestra del browser
  background("#ffffff"); //bianco 
  noLoop();
}
// Genera un array di colori casuali, ciclo for con 10 colori casuali (lavorando sulle tre componenti del modello colore RGB)
for (let i = 0; i < 10; i++) {
  colors.push(color(random(255), random(255), random(255)))
}

  // Calcola la larghezza e l'altezza disponibili per la griglia, considerando il padding
  let AvWidth = width - 2 * padding;   // Larghezza totale disponibile
  let AvHeight = height - 2 * padding; // Altezza totale disponibile
   // Calcola il numero di colonne e righe in base alle dimensioni disponibili
   let numColumns = (AvWidth / (glifSize + space)); // Numero di colonne
   let numRows = (AvHeight / (glifSize + space));   // Numero di righe