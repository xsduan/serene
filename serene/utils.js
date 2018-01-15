"use strict";

function lowerBound(l, n) {
  var left = 0;
  var right = l.length;
  while (left < right - 1) {
    var mid = (left + right) >> 1;
    var midval = l[mid];
    if (midval == n) return mid;
    else if (midval < n) left = mid;
    else if (midval > n) right = mid;
  }
  return left;
}

function randInt(n) {
  return Math.floor(Math.random() * n);
}

function randElem(l) {
  return l[randInt(l.length)];
}

function randIntWeighted(l) {
  var p = [];
  var sum = 0;
  for (var e of l) {
    p.push(sum);
    sum += e;
  }
  var roll = randInt(sum);
  return lowerBound(p, roll);
}
