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

let userIdArray = [];

let isStarted = false
// 枠開始時用設定
const music = new Audio();
music.src = "https://bgmer.net/wp-content/uploads/2023/01/M19_MusicBox_long_BPM78-55.mp3"
music.volume = 0.1
music.loop = true
music.play()

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
    window.speechSynthesis.speak(uttr);
  }
  isStarted = true
});


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

  // 早口
  if (text.indexOf('早口') !== -1) {
      if ('speechSynthesis' in window) {
      // 発言を設定
      const uttr = new SpeechSynthesisUtterance()
      uttr.text = text
      uttr.volume = 0.03
      uttr.rate = 2
      var voices = speechSynthesis.getVoices();
      voices.forEach(function(v, i){
        if(v.name == 'Microsoft Nanami Online (Natural) - Japanese (Japan)') uttr.voice = v;
      });
      // 発言を再生
      window.speechSynthesis.speak(uttr)
    } else {
      alert('大変申し訳ありません。このブラウザは音声合成に対応していません。')
    }
  }

  // ゆっくり
  if (text.indexOf('ゆっくり') !== -1) {
      if ('speechSynthesis' in window) {
      // 発言を設定
      const uttr = new SpeechSynthesisUtterance()
      uttr.text = text
      uttr.volume = 0.03
      uttr.rate = 0.5
      var voices = speechSynthesis.getVoices();
      voices.forEach(function(v, i){
        if(v.name == 'Microsoft Nanami Online (Natural) - Japanese (Japan)') uttr.voice = v;
      });
      // 発言を再生
      window.speechSynthesis.speak(uttr)
    } else {
      alert('大変申し訳ありません。このブラウザは音声合成に対応していません。')
    }
  }

  // ブラウザにWeb Speech API Speech Synthesis機能があるか判定
  if ('speechSynthesis' in window) {
    // 発言を設定
    const uttr = new SpeechSynthesisUtterance()
    uttr.text = text
    uttr.volume = 0.03
    var voices = speechSynthesis.getVoices();
    voices.forEach(function(v, i){
      if(v.name == 'Microsoft Nanami Online (Natural) - Japanese (Japan)') uttr.voice = v;
    });
    // 発言を再生
    window.speechSynthesis.speak(uttr)
  } else {
    alert('大変申し訳ありません。このブラウザは音声合成に対応していません。')
  }
})

let player = 0

// 「～名様いらっしゃい」用のボイス
//MutationObserver（インスタンス）の作成
var mo_player = new MutationObserver(function () {

  // 人がいるときのみ配信終了時刻の監視をする
  element_timer = document.querySelector('#timer p span')
  mo_timer.observe(element_timer, config);



  /* 変更検出時に実行する内容 */
  // エラーチェック
  if (document.querySelector('#room_prop .prop_block p span').innerHTML.substring(0, 1) == undefined || 0) {
    return
  }
  const text = document.querySelector('#room_prop .prop_block p span').innerHTML.substring(0, 2)
  if (player < Number(text)) {
    // ブラウザにWeb Speech API Speech Synthesis機能があるか判定
    if ('speechSynthesis' in window) {
      // 発言を設定
      const uttr = new SpeechSynthesisUtterance()
      uttr.text = text + '名様いらっしゃい。'
      uttr.volume = 0.03
      var voices = speechSynthesis.getVoices();
      voices.forEach(function(v, i){
        if(v.name == 'Microsoft Nanami Online (Natural) - Japanese (Japan)') uttr.voice = v;
      });
      // 発言を再生
      window.speechSynthesis.speak(uttr)
    } else {
      alert('大変申し訳ありません。このブラウザは音声合成に対応していません。')
    }
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
    music.volume = 0.3;
    music.play();
  }
  star = document.querySelector('#room_prop .prop_block:last-of-type span').innerHTML
})

let isVoiced = false
// 「配信終了3分前です」
//MutationObserver（インスタンス）の作成
var mo_timer = new MutationObserver(function () {
  /* 変更検出時に実行する内容 */
  const text = document.querySelector('#timer p span').innerHTML.substring(0, 8)
  // 配信終了3分前の場合
  if (text == "00:57:00") {
    if (isVoiced) { return }
    isVoiced = true
    // ブラウザにWeb Speech API Speech Synthesis機能があるか判定
    if ('speechSynthesis' in window) {
      // 発言を設定
      const uttr = new SpeechSynthesisUtterance()
      uttr.text = "配信終了3分前です。"
      uttr.volume = 0.03
      var voices = speechSynthesis.getVoices();
      voices.forEach(function(v, i){
        if(v.name == 'Microsoft Nanami Online (Natural) - Japanese (Japan)') uttr.voice = v;
      });
      // 発言を再生
      window.speechSynthesis.speak(uttr)
    } else {
      alert('大変申し訳ありません。このブラウザは音声合成に対応していません。')
    }
  }
})


//監視する「もの」の指定（必ず1つ以上trueにする）
var config = {
  childList: true,//「子ノード（テキストノードも含む）」の変化
  attributes: true,//「属性」の変化
  characterData: true,//「テキストノード」の変化
};

mo.observe(element, config);
mo_player.observe(element_player, config);
mo_star.observe(element_star, config);


