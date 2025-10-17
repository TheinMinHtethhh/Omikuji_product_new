"use strict";

const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const body = document.querySelector("body");

let startTime;
let timeoutid;
let stopTime = 0;

// --- 音声ファイルをJSで指定 ---
const soundStart = new Audio("sound/start.mp3");
const soundStop1 = new Audio("sound/stop1_long.mp3");
const soundStop2 = new Audio("sound/stop2_long.mp3");
const soundReset = new Audio("sound/reset.mp3");

// --- 初期状態 ---
setButtonStateInitial();

// ---------------------------
// Startボタンクリック
// ---------------------------
start.addEventListener("click", function () {
  setButtonStateRunning();
  startTime = Date.now();
  countUp();
  playSound(soundStart); // Start音
}, false);

// ---------------------------
// Stopボタンクリック
// ---------------------------
stop.addEventListener("click", function () {
  setButtonStateStopped();
  clearTimeout(timeoutid);
  stopTime = Date.now() - startTime + stopTime;

  // 経過時間（秒）
  const elapsedSec = (stopTime / 1000).toFixed(3);

  // ちょうど10秒台なら花火＆stop2音
  if (elapsedSec >= 10.000 && elapsedSec <= 10.999) {
    playSound(soundStop2);

    body.style.backgroundColor = "transparent";
    body.style.backgroundImage = "url('img/fireworks.gif')";
    body.style.backgroundPosition = "center";
    body.style.backgroundSize = "cover";
  } else {
    playSound(soundStop1);
  }
}, false);

// ---------------------------
// Resetボタンクリック
// ---------------------------
reset.addEventListener("click", function () {
  setButtonStateInitial();
  timer.textContent = "00:00.000";
  stopTime = 0;
  playSound(soundReset);

  body.style.backgroundColor = "rgba(233, 168, 227, 0.6)";
  body.style.backgroundImage = "";
});

// ---------------------------
// カウントアップ関数
// ---------------------------
function countUp() {
  const d = new Date(Date.now() - startTime + stopTime);
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  timer.textContent = `${m}:${s}.${ms}`;

  timeoutid = setTimeout(countUp, 10);
}

// ---------------------------
// ボタン状態制御
// ---------------------------
function setButtonStateInitial() {
  start.classList.remove("js-inactive");
  stop.classList.add("js-inactive");
  reset.classList.add("js-inactive");

  start.classList.remove("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.add("js-unclickable");
}

function setButtonStateRunning() {
  timer.classList.add("timer-fontColor_hidden");
  start.classList.add("js-inactive");
  stop.classList.remove("js-inactive");
  reset.classList.add("js-inactive");

  start.classList.add("js-unclickable");
  stop.classList.remove("js-unclickable");
  reset.classList.add("js-unclickable");
}

function setButtonStateStopped() {
  timer.classList.remove("timer-fontColor_hidden");
  timer.classList.add("timer_appear");

  start.classList.add("js-inactive");
  stop.classList.add("js-inactive");
  reset.classList.remove("js-inactive");

  start.classList.add("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.remove("js-unclickable");
}

function playSound(sound) {
  [soundStart, soundStop1, soundStop2, soundReset].forEach(s => {
    s.pause();
    s.currentTime = 0;
    
  });
  sound.play();

}