'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_PADDING = 10;
var CLOUD_GAP = 10;
var FONT_GAP = 16;
var fontTopGap = CLOUD_GAP + CLOUD_Y + CLOUD_PADDING + FONT_GAP;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_DISTANCE = 50;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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

var renderStatics = function (ctx, x, y, width, height, colorRenderStatics) {
  ctx.fillStyle = colorRenderStatics;
  ctx.fillRect(x, y, width, height);
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
  var xStatistics = CLOUD_X + CLOUD_GAP + BAR_DISTANCE;
  var distanceBar = BAR_WIDTH + BAR_DISTANCE;
  var yStatistics = function (x) {
    return CLOUD_Y + CLOUD_HEIGHT - (BAR_HEIGHT * times[x] / maxTime);
  };

  renderCloud(ctx, CLOUD_X + CLOUD_PADDING, CLOUD_Y + CLOUD_PADDING, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderText(ctx, CLOUD_GAP + CLOUD_X + CLOUD_PADDING, CLOUD_GAP + CLOUD_Y + CLOUD_PADDING, defaultColor, 'Ура вы победили!');
  renderText(ctx, CLOUD_GAP + CLOUD_X + CLOUD_PADDING, fontTopGap, defaultColor, 'Список результатов:');

  for (var i = 0; i < names.length; i++) {
    renderText(ctx, xStatistics + (distanceBar) * i, CLOUD_GAP + CLOUD_Y + CLOUD_PADDING + fontTopGap + BAR_HEIGHT + FONT_GAP + CLOUD_GAP, defaultColor, names[i]);

    for (var j = 0; j < times.length; j++) {
      renderText(ctx, xStatistics + (distanceBar) * j, yStatistics(j) - FONT_GAP * 3, defaultColor, Math.round(times[j]));
    }

    renderStatics(ctx, xStatistics + (distanceBar) * i, yStatistics(i) - FONT_GAP * 2, BAR_WIDTH, BAR_HEIGHT * times[i] / maxTime, getColor(names[i]));
  }

};
