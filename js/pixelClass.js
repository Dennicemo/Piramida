function getRandomArbitrary(min, max) { // Функция, возвращающая случайное число из равномерного распределения в указанном диапазоне
  return Math.random() * (max - min) + min;
}
function getRandomColor() { // Генерация случайного числа, собираемого в строке в код цвета
  var letters = '23456789AB';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

lenghts = [11, 9, 7, 5, 3, 1]; // Массив "хороших" (нечётных) размеров блоков, из которых можно весьма просто получить пирамиду

let iterator = 0; // Отсчёт количества сгенерированных блоков, используется, чтобы далее с вероятностью 0.5 получить блок с хорошей длиной

function randomOdd(n, m) { // Функция, выдающая случайное нечётное из заданного диапазона
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

class Block { // Описание класса блока, а именно его конструктора
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

  setBlockInFor(color){ // Прорисовка блока с заданным цветом
    for (let i = this.Xcor; i < this.Xcor+this.lenght; i++) {
      document.getElementById( '' + this.Ycor + ',' + i).style.backgroundColor=color;
    }
  }

  Refresh(){
    this.setBlockInFor(this.colorOfBlock); // Перерисовка блока
  }

  Clean(){
    this.setBlockInFor('#b3d4fc'); // Замена цвета блока на цвет фона - то есть очистка места, где был блок
  }

  GetDown(){ // Перенос координат блока вниз с проверкой дна
    if (this.Ycor<23){
      this.Ycor++;
    }
  }
  GoLeft(){ // Перенос координат блока влево с проверкой левой границы
    if (this.Xcor>0 && document.getElementById( '' + (this.Ycor) + ',' + (this.Xcor-1)).style.backgroundColor==='rgb(179, 212, 252)'){
      this.Xcor--;
    }
  }
  GoRight(){ // Перенос координат блока вправо с проверкой правой границы - возврат False в случае встречи с границей
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


