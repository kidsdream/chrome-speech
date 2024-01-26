"use strict"
window.addEventListener("load", main, false);
console.log("koe-koe読み上げ機能起動")
//監視する要素の指定
var element = document.querySelector('#comment_show_area')
var element_player = document.querySelector('#room_prop .prop_block span')
var element_star = document.querySelector('#room_prop .prop_block:last-of-type span')
var element_timer = document.querySelector('#timer p span')

// 現在日時
const date1 = new Date();
const date2 = (date1.getMonth() + 1) + "月" + date1.getDate() + "日" + date1.getHours() + "時" + date1.getMinutes() + "分"

let userIdArray = ['42471cc839'];
let voiceArray = [];

// *********
// 配信開始時の設定情報
// *********
let isStarted = false
const uttr = new SpeechSynthesisUtterance()
uttr.text = '配信を開始しました。' + date2 + 'からの配信です。'
uttr.volume = 0.03
// 初回ロード時のみボイスデータがロードできたら発音する
speechSynthesis.addEventListener('voiceschanged', e => {
  var voices = speechSynthesis.getVoices();
  voices.forEach(function(v, i){
    if(v.name == 'Microsoft Nanami Online (Natural) - Japanese (Japan)') uttr.voice = v;
  });
  // 発言を再生
  if (!isStarted) {
    console.log(uttr.text)
    window.speechSynthesis.speak(uttr);
  }
  isStarted = true
});

// *********
// Utils関数
// *********

// JavaScriptの処理を指定ミリ秒中断させる
function sleep(waitMsec) {
  var startMsec = new Date();
  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  while (new Date() - startMsec < waitMsec);
}

// 読み上げ内容を連想配列に設定する
function setVoice(isDefault, text, rate, voicevoxId = '') {
  isVoice = true
  if (!isDefault) {
    callVoicevoxApi(text, voicevoxId)
    return
  }
    defaultPlay(text, rate)
}

// デフォルトの読み上げちゃんで読み上げさせる
function defaultPlay(text, rate) {
  if ('speechSynthesis' in window) {
    // 発言を設定
    const uttr = new SpeechSynthesisUtterance()
    uttr.text = text
    uttr.volume = 0.025
    uttr.rate = rate
    var voices = speechSynthesis.getVoices();
    voices.forEach(function (v, i) {
      if (v.name == 'Microsoft Nanami Online (Natural) - Japanese (Japan)') uttr.voice = v;
    });
    // 発言を再生
    window.speechSynthesis.speak(uttr)
    // 話し終わった場合
    uttr.onend = function () {
      isVoice = false
    }
    return
  } else {
    alert('大変申し訳ありません。このブラウザは音声合成に対応していません。')
  }
}

let isVoice = false
// VOICEVOXを使用して読み上げさせる
async function callVoicevoxApi(text, voiceId) {
  console.log('送信テキスト' + text)
  const res = await fetch(`https://api.tts.quest/v3/voicevox/synthesis?speaker=${voiceId}&text=${text}&key=e_A02-5-6810980`)
  const json = await res.json()
  console.log(json.mp3DownloadUrl)
  let retryCount = 0
  // 1秒ごとに読み込んでもエラーが出なくなったら再生する。
  let timerid = setInterval(async () => {
    const status = await fetch(json.audioStatusUrl)
    const jsonStatus = await status.json()
    console.log(jsonStatus.isAudioReady)
    // 正常に読み込めた場合
    if(jsonStatus.isAudioReady) {
      const music = new Audio()
      music.src = json.mp3DownloadUrl
      music.volume = 0.05
      music.play()
        music.addEventListener("ended", (event) => {
          console.log('VOICEVOX再生完了')
          isVoice = false
        });
      clearInterval(timerid)
    }
    retryCount++
    if (retryCount >= 10) {
      console.error("リトライ回数が10回を超えたため、処理を中止します");
      clearInterval(timerid);
    }
  }
  , 1000); //1秒ごとに繰り返す
};

//MutationObserver（インスタンス）の作成
var mo = new MutationObserver(function () {
  /* 変更検出時に実行する内容 */
  // エラーチェック
  if (document.querySelector('.new_post').innerHTML == undefined) {
    return
  }

  let getText = document.querySelector('.column p').innerText
  // トリップ削除
  let text = getText.replace(/◆.*:/, '')

  // 「読み上げ再開」が含まれていた場合、再び読み上げられないようにする。
  if (text.indexOf('読み上げ再開') !== -1 || text.indexOf('読上げ再開') !== -1 || text.indexOf('読上再開') !== -1) {
    // 読み上げ再開の人のUserIDを取得して配列から削除する
    userIdArray = userIdArray.filter(function(userId) {
      return userId !== document.querySelector('.column input').value;
    });
    console.log('読み上げ再開：' + document.querySelector('.column input').value)
  }
  // 「読み上げ不要」が含まれていた場合読み上げられないようにする。
  if (text.indexOf('読み上げ不要') !== -1 || text.indexOf('読上げ不要') !== -1 || text.indexOf('読上不要') !== -1) {
    // 読み上げ不要の人のUserIDを取得して登録する
    userIdArray.push(document.querySelector('.column input').value)
    console.log('読み上げ不要：' + document.querySelector('.column input').value)
    return
  }
  // 読み上げ不要ユーザーの場合は最初から読み上げないようにする
  let isNotRead = false
  userIdArray.forEach(function (userId) {
    if (userId == document.querySelector('.column input').value) {
      isNotRead = true
      return
    }
  })
  if (isNotRead == true) { return }

  // VOICEVOX機能
  if (text.indexOf(':') !== -1) {
    voiceArray.push([false, text, 1, 3])
    return
  }
  if (text.indexOf('四国めたん') !== -1) {
    voiceArray.push([false, text, 1, 2])
    return
  }
  if (text.indexOf('春日部つむぎ') !== -1) {
    voiceArray.push([false, text, 1, 8])
    return
  }
  if (text.indexOf('波音リツ') !== -1) {
    voiceArray.push([false, text, 1, 9])
    return
  }

  // 早口
  if (text.indexOf('早口') !== -1 || text.indexOf('はやくち') !== -1) {
    voiceArray.push([true, text, 2, ''])
  }
  // ゆっくり
  if (text.indexOf('ゆっくり') !== -1) {
    voiceArray.push([true, text, 0.5, ''])
  }
  voiceArray.push([true, text, 1, ''])
})

let player = 0

// 「～名様いらっしゃい」用のボイス
var mo_player = new MutationObserver(function () {
  /* 変更検出時に実行する内容 */
  // エラーチェック
  if (document.querySelector('#room_prop .prop_block p span').innerHTML.substring(0, 1) == undefined || 0) {
    return
  }
  const text = document.querySelector('#room_prop .prop_block p span').innerHTML.substring(0, 2)
  // if (Number(text) > 5) { return }
  if (player < Number(text)) {
    voiceArray.push([true, `${text}名様いらっしゃい`, 1, ''])
  }
  player = Number(text)
})

let star = 0

// 「いいね数」SE
//MutationObserver（インスタンス）の作成
var mo_star = new MutationObserver(function () {
  /* 変更検出時に実行する内容 */
  // エラーチェック
  if (document.querySelector('#room_prop .prop_block:last-of-type span').innerHTML == undefined || null) {
    return
  }
  if (star < document.querySelector('#room_prop .prop_block:last-of-type span').innerHTML) {
    const music = new Audio();
    music.src = "https://soundeffect-lab.info/sound/anime/mp3/pa1.mp3"
    music.volume = 0.09;
    music.play();
  }
  star = document.querySelector('#room_prop .prop_block:last-of-type span').innerHTML
})

let isBGM = false
let isEnd = false
let isEnding = false
let isEindingVoice = false
const bgm = new Audio();
// タイマー検知
//MutationObserver（インスタンス）の作成
var mo_timer = new MutationObserver(function () {
  if (!isBGM) {
    // 枠開始時用設定
    // 枠の自動選曲機能
    if (date1.getHours() >= 9 && date1.getHours() <= 11) {
      bgm.src = "https://bgmer.net/wp-content/uploads/2021/12/209_long_BPM80.mp3"
      bgm.volume = 0.015
    } else if(date1.getHours() >= 12 && date1.getHours() <= 17) {
      bgm.src = "https://bgmer.net/wp-content/uploads/2021/12/212_long_BPM132.mp3"
      bgm.volume = 0.01
    } else if(date1.getHours() >= 18 && date1.getHours() <= 21) {
      bgm.src = "https://bgmer.net/wp-content/uploads/2022/05/296_long_BPM85.mp3"
      bgm.volume = 0.02
    } else {
      bgm.src = "https://bgmer.net/wp-content/uploads/2023/01/M19_MusicBox_long_BPM78-55.mp3"
      bgm.volume = 0.07
    }
    bgm.loop = true
    bgm.play()
    isBGM = true
  } else if (isEnd) {
    console.log('まもなく配信終了となります。')
    // BGMフェードアウト
    let timerid = setInterval( ()=>{
      // ボリュームが0になったら終了
      if(bgm.volume <= 0.001){
        bgm.volume = 0;
        bgm.pause();
        clearInterval(timerid);  //タイマー解除
        if (isEnding) { return }
        // エンディングソング
        const music = new Audio();
        music.src = "https://bgmer.net/wp-content/uploads/2021/12/206_long_BPM172.mp3"
        music.volume = 0.035
        music.loop = true
        music.play()
        isEnding = true
      }
      // 0.1ずつボリュームを減らしていく
      else{
        bgm.volume -= 0.001;
      }
    }
    , 100); //0.1秒ごとに繰り返す
  }

  /* 変更検出時に実行する内容 */
  const text = document.querySelector('#timer p span').innerHTML.substring(0, 8)
  // 「配信終了3分前です」の音声発言
  if (text == "00:57:00") {
    if (isEindingVoice) { return }
    isEindingVoice = true
    voiceArray.push([true, text, 1, ''])
    isEnd = true
  }
})

// *********
// 監視情報を設定
// *********
//監視する「もの」の指定（必ず1つ以上trueにする）
var config = {
  childList: true,//「子ノード（テキストノードも含む）」の変化
  attributes: true,//「属性」の変化
  characterData: true,//「テキストノード」の変化
};

mo.observe(element, config);
mo_player.observe(element_player, config);
mo_star.observe(element_star, config);
mo_timer.observe(element_timer, config);

// 読み上げ内容があるかどうか1秒ごとに監視
let timerid = setInterval(async () => {
  if (isVoice) { return }
  // Voice配列にデータが存在する場合
  if (voiceArray.length > 0) {
    const isDefault = voiceArray[0][0]
    const text = voiceArray[0][1]
    const rate = voiceArray[0][2]
    const voicevoxId = voiceArray[0][3]
    setVoice(isDefault, text, rate, voicevoxId)
    // 読み上げるVoice配列の削除
    voiceArray.shift()
  }
}, 1000); //1秒ごとに繰り返す
