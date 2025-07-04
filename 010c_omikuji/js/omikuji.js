
let n = "";
let nBefore = "";

window.addEventListener("DOMContentLoaded", function () {
    // ヘッダーのテキストアニメーション
    $("header").textillate({
        loop: false,
        minDisplayTime: 2000,
        initialDelay: 2000,
        autoStart: true,
        in: {
            effect: "fadeInLeftBig",
            delayScale: 1.5,
            delay: 50,
            sync: false,
            shuffle: true
        }
    });

    // おみくじボタンをふわっと表示
    ScrollReveal().reveal("#btn1", { duration: 9000 });

    // 5秒後にアラート表示
    setTimeout(function () {
        alert("いらっしゃい、おみくじ引いてって");
    }, 5000);
});

let soundEndflag = "0"; // サウンド制御フラグ
let w_sound;
let music;

const btn1 = document.getElementById("btn1");
const omikujiText = document.getElementById("omikujiText"); // ✅ 修正済み

btn1.addEventListener("click", function () {
    // サウンドを停止（前回分）
    if (soundEndflag === "1") {
        soundControl("end", "");
    }

    // おみくじの設定
    let resultText = [
        "img/new-img/daikichi.png",
        "img/new-img/chukichi.png",
        "img/new-img/syokichi.png",
        "img/new-img/suekichi.png",
        "img/new-img/daikyo.png"
];
    
    let resultMaxSpeed = [10, 10, 8, 5, 5];
    let resultMaxSize = [30, 30, 30, 40, 30];
    let resultImage = [
        "img/star.png",
        "img/sakura_hanabira.png",
        "img/new-img/water1.png",
        "img/new-img/redLeaves4.png",
        "img/snowflakes.png"
    ];
    let resultSound = [
        "omikuji-sound/omikuji_sound1.mp3",
        "omikuji-sound/omikuji_sound2.mp3",
        "omikuji-sound/omikuji_sound3.mp3",
        "omikuji-sound/omikuji_sound4.mp3",
        "omikuji-sound/omikuji_sound5.mp3"
    ];

    // let n = Math.floor(Math.random() * resultText.length);
    while(n==nBefore){
        n = Math.floor(Math.random() * resultText.length);
    }
    nBefore = n;
    omikujiTextImage.src = resultText[n];
    omikujiTextImage.classList.add("omikujiPaper");
    
    omikujiTextImage.addEventListener("animationend",
        function() {
            omikujiTextImage.classList.remove("omikujiPaper");
        }, false
    
    
    
    );

    // サウンド再生
    w_sound = resultSound[n];
    soundControl("start", w_sound);
    soundEndflag = "1";

    // 雪を止めて再描画
    $(document).snowfall("clear");
    $(document).snowfall({
        maxSpeed: resultMaxSpeed[n],
        minSpeed: 1,
        maxSize: resultMaxSize[n],
        minSize: 1,
        image: resultImage[n]
    });
});

// サウンド制御関数
function soundControl(status, w_sound) {
    if (status === "start") {
        music = new Audio(w_sound);
        music.currentTime = 0;
        music.play();
    } else if (status === "end") {
        // if (music) {
            music.pause();
            music.currentTime = 0;
        // }
    }
}
