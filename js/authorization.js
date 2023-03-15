console.log(document.cookie);
count = 0;

let Users = [];

if (getCookie('users')===undefined){ // Если в кукис нет юзеров, то инициализируем в них пустой массив юзеров в формате json 
  setCookie('users', JSON.stringify(Users));
}
else { // Иначе парсим массив из формата json из кукис
  Users = JSON.parse(getCookie('users'));
}


class User{ // Класс, описывающий пользователя
  score = 0;
  constructor(nick, pass) { 
    if (nick.length*pass.length!==0){ // Если длина пароля и ника не нулевая, то инициализируем экземпляр юзера с указанным паролем и ником
      this.nickname = nick;
      this.password = pass;
    }
  }
}

let ITERATOR=0;

function  GetUser(arrOfUsers, name) {
  for (let i = 0; i < arrOfUsers.length; i++){
    if (arrOfUsers[i].nickname===name){
      ITERATOR=i;
      return arrOfUsers[i];
    }
  }
  return undefined;
}

fitAboutUsers();

function fitAboutUsers(){
  let arr = JSON.parse(getCookie('users'));
  for (let i = 0; i < arr.length; i++){
    document.getElementById('aboutUsers').innerText+=arr[i].nickname + ' - ' + arr[i].score + ';';
    document.getElementById('aboutUsers').innerHTML+='<br/>';
  }
  if (document.getElementById('aboutUsers').innerText===''){
    document.getElementById('aboutUsers').innerText='Тут будет таблица с результатами пользователей, как только Вы зарегестрируете хотя бы одного!'
  }
}

function getCookie(name) { // Стандартная функция получения куки
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) { // Стандартная функция получения куки

  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function CookiesDelete() { // Фукнция удаления куки - для откладки игры
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}

function SignIn(){ // Функция регистрации пользователя, перезагрузка страницы
  let nickname = document.getElementById('nicknameInput').value;
  let password = document.getElementById('passwordInput').value;
  if (nickname.length*password.length!==0){
    let newUser = new User(nickname, password);
    Users.push(newUser);
    setCookie('users', JSON.stringify(Users));
    document.location.reload();
  }
  fitAboutUsers();
  console.log(JSON.parse(getCookie('users')));
}

function CheckNickname(){ // Проверка наличия никнейма и манипуляция кнопкой регитрации в зависимости от этого
  if (GetUser(JSON.parse(getCookie('users')), document.getElementById('nicknameInput').value)!==undefined){
    document.getElementById('signinInput').disabled=true;
  }
  else {
    document.getElementById('signinInput').disabled=false;
  }
}

function LogIn(){ // Функция авторизации - манипуляция кнопкой входа
  let nickname = document.getElementById('nicknameInput').value;
  let password = document.getElementById('passwordInput').value;
  if (password === GetUser(JSON.parse(getCookie('users')), nickname).password){
    document.getElementById('continueInput').disabled=false;
  }
  else {
    document.getElementById('continueInput').disabled=true;
  }
}
