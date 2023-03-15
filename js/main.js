function StartGame() { // Точка входа в игру после авторизации
  document.getElementById('initScreen').hidden = true; // Прячем начальный экран
  let playableBlock = new Block(); // Создаём первый падающий блок
  playableBlock.Refresh();
  let score = 0;
  let timerInterval = setInterval(TimerFunc, 1000);
  ClickTimer();
  document.getElementById('score').innerText = score;
  let timing = 100;
  document.getElementById('ti').innerText = timing;

  function ClickTimer() {
    let timeout = 500;
    if (score<150){
      timeout = -(2 * score) + 500;
    }
    else{
      timeout = -(0.333 * score) + 250;
    }
    console.log('Timeout is ' + timeout);
    Click();
    if (parseInt(document.getElementById('ti').innerText) > 0) {
      let clickInt = setTimeout(ClickTimer, timeout);
    }
  }

  function ClearLevel() { // Функция очистки поля
    for (var i = 0; i < 24; i++) {
      for (var j = 0; j < 24; j++) {
        document.getElementById('' + j + ',' + i).style.backgroundColor = 'rgb(179, 212, 252)';
      }
    }
  }

  function TimerFunc() { // Функция проверки истечения таймера. Если истекло - то появляется окно окончания игры
    if (timing > 0) {
      timing--;
      document.getElementById('ti').innerText = timing;
    } else {
      clearInterval(timerInterval);
      removeEventListener("keydown", Controls);
      document.getElementById('endgameWindow').open = true;
      document.getElementById('endgameWindow').hidden = false;
    }
  }

  function Click() { // Функция итерации игры - смещение блока вниз и проверка логики игры
    playableBlock.Clean();
    playableBlock.GetDown();
    playableBlock.Refresh();
    if (playableBlock.CheckDown()) { // Если блок коснулся низом чего-либо
      console.log('Lenght of landed block:' + playableBlock.lenght)

      if (playableBlock.lenght === 1) { // Если блок - вершина
        console.log('Checking of pyramid is started');
        playableBlock = new Block();
        let nickname = document.getElementById('nicknameInput').value;

        if (CheckPiramyd()) { // Если пирамида получилась
          console.log('Pyramid is determined');
          score = score + GetCountOfBlocks();
          timing += GetCountOfBlocks();
          document.getElementById('ti').innerText = timing;
        } else { // Если не пирамида
          console.log('Pyramid is NOT determined');
          score = score - GetCountOfBlocks();
        }
        document.getElementById('score').innerText = score;
        if (Users[ITERATOR].score < score) { // Изменение счёта
          Users[ITERATOR].score = score;
          setCookie('users', JSON.stringify(Users));
        }
        ClearLevel(); // Очистка
      } 
      playableBlock = new Block(); // Создание нового блока
    }
  }

  function Controls(e) {
    console.log(e.key)
    playableBlock.Clean();
    switch (e.key) {
      case "ArrowLeft":  // если нажата клавиша влево
        playableBlock.GoLeft();
        break;
      case "ArrowRight":   // если нажата клавиша вправо
        if (!playableBlock.GoRight()) {
          playableBlock = new Block();
        }
        break;
      case "ArrowDown": // если нажата клавиша вниз
        Click();
        break;
      case " ": // Spacebar
        Click();
        Click();
        Click();
        Click();
        Click();
        break;
    }
    playableBlock.Refresh();
  }

  addEventListener("keydown", Controls);

  function CheckPiramyd() {
    return CheckPiramydFromLeft(DetectFundationFromLeft())[0] === CheckPiramydFromRight(DetectFundationFromRight())[0]
      && CheckPiramydFromLeft(DetectFundationFromLeft())[1] === CheckPiramydFromRight(DetectFundationFromRight())[1];
  }

  function CheckPiramydFromLeft(x) {
    let xpointer = x;
    let ypointer = 23;

    console.log('' + ypointer + ',' + xpointer)

    while (document.getElementById('' + ypointer + ',' + xpointer).style.backgroundColor !== 'rgb(179, 212, 252)'
    && document.getElementById('' + ypointer + ',' + (xpointer + 1)).style.backgroundColor !== 'rgb(179, 212, 252)'
    && document.getElementById('' + (ypointer - 1) + ',' + (xpointer)).style.backgroundColor === 'rgb(179, 212, 252)') {
      xpointer++;
      ypointer--;
    }
    return [xpointer, ypointer];
  }

  function CheckPiramydFromRight(x) {
    let xpointer = x;
    let ypointer = 23;
    while (document.getElementById('' + ypointer + ',' + xpointer).style.backgroundColor !== 'rgb(179, 212, 252)'
    && document.getElementById('' + ypointer + ',' + (xpointer - 1)).style.backgroundColor !== 'rgb(179, 212, 252)'
    && document.getElementById('' + (ypointer - 1) + ',' + (xpointer)).style.backgroundColor === 'rgb(179, 212, 252)') {
      xpointer--;
      ypointer--;
    }
    return [xpointer, ypointer];
  }

  function DetectFundationFromLeft() {
    for (let i = 0; i < 24; i++) {
      if (document.getElementById('' + 23 + ',' + i).style.backgroundColor !== 'rgb(179, 212, 252)') {
        return i;
      }
    }
    return 0;
  }

  function DetectFundationFromRight() {
    for (let i = 23; i > 0; i--) {
      if (document.getElementById('' + 23 + ',' + i).style.backgroundColor !== 'rgb(179, 212, 252)') {
        return i;
      }
    }
    return 23;
  }

}

function GetCountOfBlocks() {
  const parent = document.getElementById('gameField');
  let count = -24;
  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i].style.backgroundColor !== 'rgb(179, 212, 252)') {
      count++;
    }
  }
  return count;
}

function StartAnonymGame() {
  let nickname = 'Anonym';
  let password = 'Anonym';
  if (GetUser(JSON.parse(getCookie('users')), nickname) === undefined) {
    let newUser = new User(nickname, password);
    Users.push(newUser);
    setCookie('users', JSON.stringify(Users));
    fitAboutUsers();
    console.log(JSON.parse(getCookie('users')));
  }

  StartGame();
}

let switcherTheme = true;

function ChangeTheme(){
  if (switcherTheme){
    document.body.setAttribute('style', 'filter: invert(100%);')
    switcherTheme = false;
  }
  else {
    document.body.setAttribute('style', 'filter: invert(0%);')
    switcherTheme = true;
  }
  document.getElementById('gameField').style.borderRight='#e2000f solid 1vw';
}
