let numGlifs = 30;  // Numero di glifi per riga/colonna
let glifSize = 70;   // Dimensione di ciascun glifo
let space = 20;    // Spazio tra i glifi

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#e5e1d4"); 
  noLoop(); 
  //ciclo for che mi permette di ripetere il ciclo fintanto che y (la variabile) risulta essere minore nel numero di glifi dichiarato, dopo ogni ciclo la variabile viene incrementata di 1
  for (let y=0; y < numGlifs; y++) {
    for (let x=0; x < numGlifs; x++) {
      //diichara le due variabili che rappresentano la posizone orizzontale e verticale di un elmento nella griglia
      let posX = space + x*(glifSize + space)
      let posY = space + y* (glifSize + space)
    //invocare funzione per disgneare il glifo, posizione orizzontale, verticale e dimensione 
      drawGlif(posX, posY, glifSize);
    }
  }
}
//funzione per disegnare glifo
function drawGlif (x, y, size){
  push ();
  translate (x+size/2, y+size/2); //centrare il glifo -> funzione che sposta l'origine del sistema di coordinate (x + size/2 e y + size/2 -> pari quindi alla metà della larghezza e dell'altezza del glifo)
  //variabile che contiene un numero casuale che deve essere compreso tra 1 e 5, rappresenta il numero di forme che devono essere disegnate
  //"int" converte il numero generato dal random in un numero che è sempre intero
  let shapeCount = int(random(1, 6));
  //ciclo for che mi permtte di ripetere il ciclo fintanto che la variabile i è minore del numero di forme che devono essere disegnate, incremento di 1 della variabile dopo ogni ciclo
  for (let i=0; i< shapeCount; i++) {
  //generare un numero intero casuale tra 0 e 2
  let randomShape = int(random(4));

  //colori casauli, a partire dalla generazione casuale di numeri da 0 al 255 (tre componeti per red, green, blue (RGB))
  let r=random(255);
  let g= random (255);
  let b=random(255);
  //funzione che imposta il colore di riempimento per tutte le forme che verranno disegnate successivamente
  fill(r, g, b);
  noStroke();
//forma casuale 
if(randomShape===0) {
  let circleSize= random (size/ 4, size/ 2);
  ellipse(0, 0, circleSize, circleSize);
} else if (randomShape===1) {
  let rectSize = random(size/4, size/2);
rect (-rectSize/ 2, -rectSize/2, rectSize, rectSize)
}else if (randomShape===2){
  let lineLength = random (size/2, size);
  rotate(random(TWO_PI));  // Ruota casualmente, angoli in radianti (TWO_PI -> 2π)
  stroke(0);
  line(-lineLength / 2, 0, lineLength / 2, 0);  // Disegna una linea
  noStroke();
} else if (randomShape === 3) { // Caso per il triangolo
  let triangleSize = random(size / 4, size / 2);
  let halfSize = triangleSize / 2;
  triangle(-halfSize, halfSize, halfSize, halfSize, 0, -halfSize); // Disegna il triangolo
}
}

pop();
}

