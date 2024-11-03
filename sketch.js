let glifSize = 15;   // Dimensione del glifo
let space = 28;      // Spazio tra i glifi
let padding = 30;    // Padding attorno alla griglia
let colors = [];     // Array per i colori (generati casualmente)

function setup() {
  createCanvas(windowWidth, windowHeight); //tela grande quanto la finestra del browser
  background("#ffffff"); //bianco 
  noLoop();
// Genera un array di colori casuali, ciclo for con 15 colori random (lavora sulle tre componenti del modello colore RGB)
for (let i = 0; i < 15; i++) {
  //ogni volta che il ciclo si ripete, un nuovo colore viene aggiunto all'array
  colors.push(color(random(255), random(255), random(255)))
}

  // Calcola la larghezza e l'altezza disponibili per la griglia, considerando il padding
  let MaxWidth = width - 2 * padding;   // Larghezza totale disponibile (viene sottratto due volte il padding, a destra e a sinistra)
  let MaxHeight = height - 2 * padding; // Altezza totale disponibile (viene sottratto due volte il padding, in alto e in basso)
   // Calcola il numero di colonne e righe in base alle dimensioni disponibili
   let numColumns = MaxWidth / (glifSize + space); // Numero di colonne (larghezza massima diviso la somma della dimensione del glifo e dello spazio tra un glifo e l'altro)
   let numRows = MaxHeight / (glifSize + space);   // Numero di righe
   //cicli for per i glifi, x e y rappresentano una posizione nella griglia
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numColumns; x++) {
      // Calcola la posizione orizzontale e verticale di un glifo, tenendo conto del padding
      let posX = padding + x * (glifSize + space); // Posizione orizzontale
      let posY = padding + y * (glifSize + space); // Posizione verticale
      drawGlifo(posX, posY, glifSize); //disegna il glifo nella posizione specifica, con la corretta dimensione stabilita
    }
  }
}
function drawGlifo(x, y, size) {
  push();
  translate(x + size / 2, y + size / 2);  //sposta l'origine delle coordinate al centro del glifo
  let layers = int(random(4, 8));  //imposta un numero casuale di livelli concentrici, compreso tra 4 e 8
  let segments = int(random(6, 12));  //imposta numero di segmenti radiali, tra 6 e 12, dando al glifo simmetria radiale
//ciclo for per disegnare ogni livello concentrico
  for (let i = 0; i < layers; i++) {
    let layerSize = map(i, 0, layers, size / 5, size); //calcola la dimensione del livello corrente, che descresce verso il centro del glifo
    let colorIndex = int(random(colors.length)); // Seleziona un colore casuale
    let selectedColor = colors[colorIndex]; // Colore scelto dall'array
//imposta il colore di contorno del livello corrente (0-> valore per il rosso, 1-> valore per il verde, 2->valore per il blu)
    stroke(selectedColor.levels[0], selectedColor.levels[1], selectedColor.levels[2]); // Imposta il colore
    noFill(); //no rimepimento interno
    push();
//applica una rotazione random al livello corrente
    rotate(random(TWO_PI / segments));  //genera una rotazione random fino ad un massimo di 2π
//ciclo for che disegna ciascun segmento radiale attorno al livello corrente del glifo
    for (let j = 0; j < segments; j++) {
      //segments indica il numero totale di spicchi in cui il cerchio è suddiviso
      //TWO_PI segments indica l'angolo che corrisponde a ciascun segmento
      rotate(TWO_PI / segments);  // Distribuisce segmenti attorno al cerchio, two_pi = 2π (radianti)
      //se i è pari viene eseguita "drawPetal" -> petalo allungato
      if (i % 2 === 0) {
        drawPetal(layerSize);  // Disegna petalo allungato
      //se i è divisibile per 3 viene esguita "drawSpikyShade" -> forma a punta
      } else if (i % 3 === 0) {
        drawSpikyShape(layerSize);  //Disegna forma a punta (specie di triagolino)
      //se nessuna delle condizioni precedenti è soddisfatta esegue "drawCurvedShape" ->forma curva
      } else {
        drawCurvedShape(layerSize);  // Disegna forma curva
      }
    }
    pop();
  }
  pop();
}
//funzione per disegnare il petalo del fiore
function drawPetal(radius) {
  beginShape(); // non specifica il tipo di forma, che viene definita dai vertici
  curveVertex(0, -radius / 2); //aggiungu una curva all'inzio della forma, e il primo punto è spostato verso l'alto rispetto all'origine
  curveVertex(radius / 4, -radius); //aggiunge un altro punto curvo alla forma
  curveVertex(-radius / 4, -radius); //agiunge un terzo punto alla curva, simmetrico al precedente ma posizionato a sinistra
  curveVertex(0, -radius / 2); //chiude la forma e la rende continua
  endShape(CLOSE); //rende la forma chiusa
}
//funzione per disegnare la forma a punta (specie di trigolino) definita sa soli vertici (la forma è chiusa)
function drawSpikyShape(radius) {
  beginShape();
  vertex(0, -radius / 2);
  vertex(radius / 4, -radius);
  vertex(0, -radius * 1.2);
  vertex(-radius / 4, -radius);
  vertex(0, -radius / 2);
  endShape(CLOSE);
}
//funzione per disegnare la forma curva (una sorta di semicerchio)
function drawCurvedShape(radius) {
  beginShape();
  curveVertex(0, 0);
  curveVertex(radius / 3, -radius / 2);
  curveVertex(0, -radius);
  curveVertex(-radius / 3, -radius / 2);
  curveVertex(0, 0);
  endShape(CLOSE);
}