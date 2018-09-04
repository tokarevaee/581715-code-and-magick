'use strict';

var Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  PADDING: 10,
  GAP: 10
};

var Bar = {
  WIDTH: 40,
  HEIGHT: 150,
  DISTANCE: 50,
};

var FONT_GAP = 16;

var fontTopGap = Cloud.GAP + Cloud.Y + Cloud.PADDING + FONT_GAP;


var renderStatics = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};


var renderText = function (ctx, x, y, color, text) {
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};


var getColor = function (names) {
  if (names === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  }
  return 'rgba(0, 0,' + randomInteger(0, 255) + ', 1)';
};

var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  var defaultColor = '#000000';
  var maxTime = getMaxElement(times);
  var xStatistics = Cloud.X + Cloud.GAP + Bar.DISTANCE;
  var distanceBar = Bar.WIDTH + Bar.DISTANCE;
  var xCloud = Cloud.GAP + Cloud.X + Cloud.PADDING;
  var yStatistics = function (x) {
    return Cloud.Y + Cloud.HEIGHT - (Bar.HEIGHT * times[x] / maxTime);
  };

  renderStatics(ctx, Cloud.X + Cloud.PADDING, Cloud.Y + Cloud.PADDING, Cloud.WIDTH, Cloud.HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderStatics(ctx, Cloud.X, Cloud.Y, Cloud.WIDTH, Cloud.HEIGHT, '#fff');
  renderText(ctx, xCloud, Cloud.GAP + Cloud.Y + Cloud.PADDING, defaultColor, 'Ура вы победили!');
  renderText(ctx, xCloud, fontTopGap, defaultColor, 'Список результатов:');

  for (var i = 0; i < names.length; i++) {
    renderText(ctx, xStatistics + (distanceBar) * i, Cloud.GAP + Cloud.Y + Cloud.PADDING + fontTopGap + Bar.HEIGHT + FONT_GAP + Cloud.GAP, defaultColor, names[i]);

    for (var j = 0; j < times.length; j++) {
      renderText(ctx, xStatistics + (distanceBar) * j, yStatistics(j) - FONT_GAP * 3, defaultColor, Math.round(times[j]));
    }

    renderStatics(ctx, xStatistics + (distanceBar) * i, yStatistics(i) - FONT_GAP * 2, Bar.WIDTH, Bar.HEIGHT * times[i] / maxTime, getColor(names[i]));
  }

};
