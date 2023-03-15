function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function getRandomColor() {
  var letters = '23456789AB';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

lenghts = [11, 9, 7, 5, 3, 1];
let iterator = 0;

function randomOdd(n, m) {
  let min, max;
  if (n > m) {
    min = m;
    max = n;
  } else if (n === m) {
    min = max = n;
  } else {
    min = n;
    max = m;
  }
  const result = Math.floor(min + Math.random() * (max - min));
  return result + ((result % 2) - 1);
}

class Block {
  constructor() {
    this.colorOfBlock = getRandomColor();
    this.Xcor = 5;
    this.Ycor = 0;
    if (getRandomArbitrary(0, 1) > 0.5) {
      this.lenght = getRandomArbitrary(1.5, 5);
    } else {
      this.lenght = lenghts[iterator];
      if (iterator !== 6) {
        iterator++;
      } else {
        iterator = 0;
      }
    }
  }

  CheckDown(){
    //Проверка на дно
    if (this.Ycor<23){
      //Проверка на блок
      for (let i = this.Xcor; i < this.Xcor+this.lenght; i++) {
        if (document.getElementById( '' + (this.Ycor + 1) + ',' + i).style.backgroundColor!=='rgb(179, 212, 252)'){
          return true;
        }
      }
      return false;
    }
    else {
      return true;
    }
  }

  setBlockInFor(color){
    for (let i = this.Xcor; i < this.Xcor+this.lenght; i++) {
      document.getElementById( '' + this.Ycor + ',' + i).style.backgroundColor=color;
    }
  }

  Refresh(){
    this.setBlockInFor(this.colorOfBlock);
  }

  Clean(){
    this.setBlockInFor('#b3d4fc');
  }

  GetDown(){
    if (this.Ycor<23){
      this.Ycor++;
    }
  }
  GoLeft(){
    if (this.Xcor>0 && document.getElementById( '' + (this.Ycor) + ',' + (this.Xcor-1)).style.backgroundColor==='rgb(179, 212, 252)'){
      this.Xcor--;
    }
  }
  GoRight(){
    //TODO Исправить баг со съеданием при съезжании направо
    if (this.Xcor<23-this.lenght){
      this.Xcor++;
      return true;
    }
    else {
      return false;
    }
  }
}


