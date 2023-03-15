for (var i = 0; i < 24; i++) {
  for (var j = 0; j < 24; j++) {
    var parentPixel = document.createElement('div');
    parentPixel.className = 'pixel';
    parentPixel.style.backgroundColor='#b3d4fc';
    parentPixel.id= '' + i + ',' + j;
    document.getElementById('gameField').appendChild(parentPixel);
  }
  document.getElementById('gameField').appendChild(document.createElement('br'));
}

