"use strict"
window.addEventListener("load", main, false);
console.log("koe-koe読み上げ機能起動準備")
var agent = window.navigator.userAgent.toLowerCase();
console.log(agent)

// GoogleFonts追加
let font_link_element = document.createElement('link');
font_link_element.href = 'https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap'
font_link_element.rel = 'stylesheet'
document.querySelector('head').appendChild(font_link_element);

let koeUserNameArray = ['キラ', 'きら', 'rico'];
let userVoiceArray = [];
let nonCommentCounter = 0;
const bgm = new Audio();

// 現在日時
const nowDate = new Date();
const nowDateString = (nowDate.getMonth() + 1) + "月" + nowDate.getDate() + "日" + nowDate.getHours() + "時" + nowDate.getMinutes() + "分"

// メイン音量
let mainVolumeInt = 10
let iOSMusicVolumeInt = 1
let iOSVoiceVolumeInt = 1
let midnightVolumeInt = 1
// 深夜時間帯の音量縮小
if (nowDate.getHours() >= 0 && nowDate.getHours() <= 7) {
  midnightVolumeInt = 0.3
}
// Edgeからの場合はループバックさせるため音量を下げておく
if (agent.indexOf('edg') > -1) {
  mainVolumeInt = 0.9
}
// Edgeからの場合はループバックさせるため音量を下げておく
if (agent.indexOf('iphone') > -1 || agent.indexOf('macintosh') > -1) {
  iOSMusicVolumeInt = 0.01
  iOSVoiceVolumeInt = 200
}

// ヘッダータイトル変更
let header_title = document.querySelector('h1')
console.log(header_title)
header_title.textContent = "LIVE配信"

// 魔改造エリア追加
let main_area = document.querySelector('#main')
main_area.insertAdjacentHTML('beforeend', '<div id="voice_area"/>');

// 配信開始ボタン追加
let start_str_element = document.createElement('span');
start_str_element.textContent = '読み上げツール起動'
let start_btn_div_element = document.createElement('div');
start_btn_div_element.className = 'toggle_button'
let start_btn_input_element = document.createElement('input');
start_btn_input_element.id = 'cast_start'
start_btn_input_element.className = 'toggle_input'
start_btn_input_element.type = 'checkbox'
let start_btn_label_element = document.createElement('label');
start_btn_label_element.for = 'cast_start'
start_btn_label_element.className = 'toggle_label'
document.querySelector('#voice_area').appendChild(start_str_element);
start_btn_div_element.appendChild(start_btn_input_element);
start_btn_div_element.appendChild(start_btn_label_element);
document.querySelector('#voice_area').appendChild(start_btn_div_element);

document.querySelector('#cast_start').addEventListener('change', castStart);
function castStart() {
  if (document.querySelector('#cast_start').checked) {
    console.log('koe-koe読み上げ機能起動実行')
    mainProcess()
  }
}

// 自動読み上げ
let voice_str_element = document.createElement('span');
voice_str_element.textContent = '自動読み上げ'
document.querySelector('#voice_area').appendChild(voice_str_element);
let voice_btn_div_element = document.createElement('div');
voice_btn_div_element.className = 'toggle_button'
let voice_btn_input_element = document.createElement('input');
voice_btn_input_element.id = 'auto_voice'
voice_btn_input_element.className = 'toggle_input'
voice_btn_input_element.type = 'checkbox'
voice_btn_input_element.checked = 'true'
let voice_btn_label_element = document.createElement('label');
voice_btn_label_element.for = 'auto_voice'
voice_btn_label_element.className = 'toggle_label'
document.querySelector('#voice_area').appendChild(voice_str_element);
voice_btn_div_element.appendChild(voice_btn_input_element);
voice_btn_div_element.appendChild(voice_btn_label_element);
document.querySelector('#voice_area').appendChild(voice_btn_div_element);

let isAutoVoice = true
// 自動読み上げボタン切り替え処理
document.querySelector('#auto_voice').addEventListener('change', autoVoice);
function autoVoice() {
  if (!document.querySelector('#auto_voice').checked) {
    console.log('自動読み上げをOFF')
    isAutoVoice = false
  } else {
    console.log('自動読み上げをON')
    isAutoVoice = true
  }
}

// 「何名様いらっしゃい」読み上げ
let voice_people_element = document.createElement('span');
voice_people_element.textContent = '何名様読み上げ'
document.querySelector('#voice_area').appendChild(voice_people_element);
let voice_people_btn_div_element = document.createElement('div');
voice_people_btn_div_element.className = 'toggle_button'
let voice_people_btn_input_element = document.createElement('input');
voice_people_btn_input_element.id = 'auto_people_voice'
voice_people_btn_input_element.className = 'toggle_input'
voice_people_btn_input_element.type = 'checkbox'
voice_people_btn_input_element.checked = 'true'
let voice_people_btn_label_element = document.createElement('label');
voice_people_btn_label_element.for = 'auto_people_voice'
voice_people_btn_label_element.className = 'toggle_label'
document.querySelector('#voice_area').appendChild(voice_people_element);
voice_people_btn_div_element.appendChild(voice_people_btn_input_element);
voice_people_btn_div_element.appendChild(voice_people_btn_label_element);
document.querySelector('#voice_area').appendChild(voice_people_btn_div_element);

let isAutoPeopleVoice = true
// 自動読み上げボタン切り替え処理
document.querySelector('#auto_people_voice').addEventListener('change', autoVoice);
function autoVoice() {
  if (!document.querySelector('#auto_people_voice').checked) {
    console.log('何名様いらっしゃい読み上げをOFF')
    isAutoPeopleVoice = false
  } else {
    console.log('何名様いらっしゃい読み上げをON')
    isAutoPeopleVoice = true
  }
}

// 初回ボイスボタン設定
let init_voice_btn_input_element = document.createElement('input');
init_voice_btn_input_element.id = 'init_voice'
init_voice_btn_input_element.type = 'button'
init_voice_btn_input_element.value = '配信開始時ボイス'
document.querySelector('#voice_area').appendChild(init_voice_btn_input_element);
document.querySelector('#init_voice').addEventListener('click', initVoice);

// 配信開始時のボイス
function initVoice() {
  console.log('initVoice')
  // *********
  // 配信開始時の設定情報
  // *********
  let uttr = new SpeechSynthesisUtterance()
  uttr.text = '配信を開始しました。' + nowDateString + 'からの配信です。'
  uttr.volume = 0.03 * mainVolumeInt * midnightVolumeInt
  let isVoiced = false
  speechSynthesis.addEventListener('voiceschanged', e => {
    if(isVoiced) { return }
    var voices = speechSynthesis.getVoices();
    voices.forEach(function (v, i) {
      if (v.name == 'Google 日本語') uttr.voice = v;
      if (v.name == 'Microsoft Nanami Online (Natural) - Japanese (Japan)') uttr.voice = v;
    });
    // 発言を再生
    console.log(uttr.text)
    window.speechSynthesis.speak(uttr);
    isVoiced = true
  });
}

// 次の読み上げボタン設定
let next_voice_btn_input_element = document.createElement('input');
next_voice_btn_input_element.id = 'next_voice'
next_voice_btn_input_element.type = 'button'
next_voice_btn_input_element.value = '次のボイスへ'
document.querySelector('#voice_area').appendChild(next_voice_btn_input_element);
document.querySelector('#next_voice').addEventListener('click', nextVoice);

function nextVoice() {
  // TODO: 次の読み上げ対象がない場合は非活性にしたい
  // Voice配列にデータが存在する場合
  if (userVoiceArray.length > 0) {
    const isDefault = userVoiceArray[0][0]
    const text = userVoiceArray[0][1]
    const rate = userVoiceArray[0][2]
    const voicevoxId = userVoiceArray[0][3]
    setVoice(isDefault, text, rate, voicevoxId)
    // 読み上げるVoice配列の削除
    userVoiceArray.shift()
  }
}

// BGMリセットボタン設定
let bgm_reset_btn_input_element = document.createElement('input');
bgm_reset_btn_input_element.id = 'bgm_reset'
bgm_reset_btn_input_element.type = 'button'
bgm_reset_btn_input_element.value = 'BGMリセット'
document.querySelector('#voice_area').appendChild(bgm_reset_btn_input_element);
document.querySelector('#bgm_reset').addEventListener('click', bgmReset);

function bgmReset() {
  bgm.pause();
  bgm.play();
  console.log('BGMリセット完了')
}

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
  console.log('setVoice' + text)
  if (!isDefault && !(agent.indexOf('macintosh') > -1)) {
    callVoicevoxApi(text, rate, voicevoxId)
    return
  }
  defaultPlay(text, rate)
}

// デフォルトの読み上げちゃんで読み上げさせる
function defaultPlay(text, rate) {
  if ('speechSynthesis' in window) {
    console.log('defaultPlay')
    // 発言を設定
    const uttr = new SpeechSynthesisUtterance()
    uttr.text = text
    uttr.volume = 0.025 * mainVolumeInt * iOSVoiceVolumeInt * midnightVolumeInt
    uttr.rate = rate
    let isVoiced = false
    console.log('Voice準備')
    if(isVoiced) { return }
    var voices = speechSynthesis.getVoices();
    voices.forEach(function (v, i) {
      if (v.name == 'Google 日本語') uttr.voice = v;
      if (v.name == 'Microsoft Nanami Online (Natural) - Japanese (Japan)') uttr.voice = v;
    });
    // 発言を再生
    console.log(uttr.text)
    window.speechSynthesis.speak(uttr);
    isVoiced = true
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
async function callVoicevoxApi(text, rate, voiceId) {
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
    if (jsonStatus.isAudioReady) {
      const music = new Audio()
      music.src = json.mp3DownloadUrl
      music.volume = 0.05 * mainVolumeInt * midnightVolumeInt
      music.playbackRate = rate
      music.play()
      music.addEventListener("ended", (event) => {
        console.log('VOICEVOX再生完了')
        isVoice = false
      });
      clearInterval(timerid)
    }
    retryCount++
    if (retryCount >= 30) {
      defaultPlay(text, rate)
      console.error("リトライ回数が30回を超えたため、処理を中止します");
      clearInterval(timerid);
    }
  }
    , 1000); //1秒ごとに繰り返す
};

function mainProcess() {
  //監視する要素の指定
  var element = document.querySelector('#comment_show_area')
  var element_player = document.querySelector('#room_prop .prop_block span')
  var element_star = document.querySelector('#room_prop .prop_block:last-of-type span')
  var element_timer = document.querySelector('#timer p span')

  var element_live_name = document.querySelector('#room_info_inner p')

  // 発声練習
  let uttr = new SpeechSynthesisUtterance()
  uttr.text = ''
  uttr.volume = 0
  window.speechSynthesis.speak(uttr);

  //MutationObserver（インスタンス）の作成
  var mo = new MutationObserver(function () {
    /* 変更検出時に実行する内容 */
    // エラーチェック
    if (document.querySelector('.new_post').innerHTML == undefined) {
      return
    }
    nonCommentCounter = 0
    let getText = document.querySelector('.column p').innerText
    // トリップ削除
    let text = getText.replace(/◆.*:/, ':')
    console.log('トリップ削除後:' + text)
    // コメ番読み上げ削除
    text = text.replace(/^(\d+\.\s)/, ':')
    const name = text.match(/:(.*?):/)[1];
    console.log('text:' + text)
    console.log('name:' + name)

    // ログ用
    const date = new Date();
    const logDate = date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2) + '.' + date.getMilliseconds();
    console.log(element_live_name.innerText)
    if (element_live_name.innerText.indexOf('あおにゃ') !== -1) {
      sendJsonData(logDate, element_live_name.innerText, name, text)
    }

    // 「読み上げ再開」が含まれていた場合、再び読み上げられないようにする。
    if (text.indexOf('読み上げ再開') !== -1 || text.indexOf('読上げ再開') !== -1 || text.indexOf('読上再開') !== -1) {
      // 読み上げ再開の人のUserNameを取得して配列から削除する
      koeUserNameArray = koeUserNameArray.filter(function (userName) {
        return userName !== name;
      });
      console.log('読み上げ再開：' + name)
    }
    // 「読み上げ不要」が含まれていた場合読み上げられないようにする。
    if (text.indexOf('読み上げ不要') !== -1 || text.indexOf('読上げ不要') !== -1 || text.indexOf('読上不要') !== -1) {
      // 読み上げ不要の人のUserIDを取得して登録する
      koeUserNameArray.push(name)
      console.log('読み上げ不要：' + name)
    }
    // 読み上げ不要ユーザーの場合は最初から読み上げないようにする
    let isNotRead = false
    koeUserNameArray.forEach(function (userName) {
      if (userName.trim() == name.trim()) {
        console.log('読み上げ不要ユーザーを検知しました。')
        isNotRead = true
        return
      }
    })
    // URLが含まれている場合も読み上げないようにする
    if (text.indexOf('http') !== -1) {
      console.log('URLを検知しました。')
      isNotRead = true
    }
    if (isNotRead) {
      const music = new Audio();
      music.src = "https://soundeffect-lab.info/sound/button/mp3/cursor9.mp3"
      music.volume = 0.07 * mainVolumeInt
      music.play();
      return
    }

    let rate = 1
    // 早口
    if (text.indexOf('早口') !== -1 || text.indexOf('はやくち') !== -1) {
      rate = 2
    }
    // ゆっくり
    if (text.indexOf('ゆっくり') !== -1) {
      rate = 0.5
    }

    // VOICEVOX機能
    if (text.indexOf('ずんだもん') !== -1) {
      let voiceCommand = 3
      // あまあま
      if (text.indexOf('甘々') !== -1 || text.indexOf('あまあま') !== -1 || text.indexOf('好き') !== -1 || text.indexOf('すき') !== -1 || text.indexOf('はあと') !== -1 || text.indexOf('♡') !== -1) {
        voiceCommand = 1
      }
      // セクシー
      if (text.indexOf('セクシー') !== -1 || text.indexOf('あぁん') !== -1 || text.indexOf('えっち') !== -1 || text.indexOf('エッチ') !== -1) {
        voiceCommand = 5
      }
      // ツンツン
      if (text.indexOf('だからね') !== -1 || text.indexOf('ツンツン') !== -1 || text.indexOf('怒') !== -1) {
        voiceCommand = 7
      }
      // ささやき
      if (text.indexOf('囁') !== -1 || text.indexOf('ささや') !== -1 || text.indexOf('ひっそり') !== -1) {
        voiceCommand = 22
      }
      // ヒソヒソ
      if (text.indexOf('ヒソヒソ') !== -1 || text.indexOf('こっそり') !== -1) {
        voiceCommand = 38
      }
      // ヘロヘロ
      if (text.indexOf('ヘロヘロ') !== -1 || text.indexOf('ベロベロ') !== -1) {
        voiceCommand = 75
      }
      // なみだめ
      if (text.indexOf('涙目') !== -1) {
        voiceCommand = 76
      }
      userVoiceArray.push([false, text, rate, voiceCommand])
      return
    }
    if (text.indexOf('四国めたん') !== -1) {
      let voiceCommand = 2
      // あまあま
      if (text.indexOf('甘々') !== -1 || text.indexOf('あまあま') !== -1 || text.indexOf('好き') !== -1 || text.indexOf('すき') !== -1 || text.indexOf('はあと') !== -1 || text.indexOf('♡') !== -1) {
        voiceCommand = 0
      }
      // セクシー
      if (text.indexOf('セクシー') !== -1 || text.indexOf('あぁん') !== -1 || text.indexOf('えっち') !== -1 || text.indexOf('エッチ') !== -1) {
        voiceCommand = 4
      }
      // ツンツン
      if (text.indexOf('だからね') !== -1 || text.indexOf('ツンツン') !== -1 || text.indexOf('怒') !== -1) {
        voiceCommand = 6
      }
      // ささやき
      if (text.indexOf('囁') !== -1 || text.indexOf('ささや') !== -1 || text.indexOf('ひっそり') !== -1) {
        voiceCommand = 36
      }
      // ヒソヒソ
      if (text.indexOf('ヒソヒソ') !== -1 || text.indexOf('こっそり') !== -1) {
        voiceCommand = 37
      }
      userVoiceArray.push([false, text, rate, voiceCommand])
      return
    }
    if (text.indexOf('春日部つむぎ') !== -1) {
      userVoiceArray.push([false, text, rate, 8])
      return
    }
    if (text.indexOf('波音リツ') !== -1) {
      userVoiceArray.push([false, text, rate, 9])
      return
    }
    if (text.indexOf('雨晴はう') !== -1) {
      userVoiceArray.push([false, text, rate, 10])
      return
    }
    if (text.indexOf('玄野武宏') !== -1) {
      userVoiceArray.push([false, text, rate, 11])
      return
    }
    if (text.indexOf('白上虎太郎') !== -1) {
      userVoiceArray.push([false, text, rate, 12])
      return
    }
    if (text.indexOf('青山龍星') !== -1) {
      userVoiceArray.push([false, text, rate, 13])
      return
    }
    if (text.indexOf('九州そら') !== -1) {
      userVoiceArray.push([false, text, rate, 16])
      return
    }
    if (text.indexOf('もち子') !== -1) {
      userVoiceArray.push([false, text, rate, 20])
      return
    }
    if (text.indexOf('剣崎雌雄') !== -1 || text.indexOf('♂') !== -1) {
      userVoiceArray.push([false, text, rate, 21])
      return
    }
    if (text.indexOf('WhiteCUL') !== -1) {
      userVoiceArray.push([false, text, rate, 23])
      return
    }
    if (text.indexOf('後鬼') !== -1) {
      userVoiceArray.push([false, text, rate, 27])
      return
    }
    if (text.indexOf('No.7') !== -1) {
      userVoiceArray.push([false, text, rate, 29])
      return
    }
    if (text.indexOf('ちび式じい') !== -1 || text.indexOf('徳光和夫') !== -1) {
      userVoiceArray.push([false, text, rate, 42])
      return
    }
    if (text.indexOf('櫻歌ミコ') !== -1) {
      userVoiceArray.push([false, text, rate, 43])
      return
    }
    if (text.indexOf('小夜') !== -1) {
      userVoiceArray.push([false, text, rate, 46])
      return
    }
    if (text.indexOf('ナースロボ') !== -1) {
      let voiceCommand = 47
      // 楽々
      if (text.indexOf('楽々') !== -1) {
        voiceCommand = 48
      }
      // 恐怖
      if (text.indexOf('恐怖') !== -1 || text.indexOf('こわ') !== -1) {
        voiceCommand = 49
      }
      // 内緒話
      if (text.indexOf('内緒') !== -1 || text.indexOf('ヒソヒソ') !== -1 || text.indexOf('こっそり') !== -1 || text.indexOf('囁') !== -1 || text.indexOf('ささや') !== -1 || text.indexOf('ひっそり') !== -1) {
        voiceCommand = 50
      }
      userVoiceArray.push([false, text, rate, voiceCommand])
      return
    }
    if (text.indexOf('紅桜') !== -1) {
      userVoiceArray.push([false, text, rate, 51])
      return
    }
    if (text.indexOf('雀松朱司') !== -1) {
      userVoiceArray.push([false, text, rate, 52])
      return
    }
    if (text.indexOf('麒ヶ島宗麟') !== -1) {
      userVoiceArray.push([false, text, rate, 53])
      return
    }
    if (text.indexOf('春歌ナナ') !== -1) {
      userVoiceArray.push([false, text, rate, 54])
      return
    }
    if (text.indexOf('猫使アル') !== -1) {
      userVoiceArray.push([false, text, rate, 55])
      return
    }
    if (text.indexOf('猫使ビィ') !== -1) {
      userVoiceArray.push([false, text, rate, 58])
      return
    }
    if (text.indexOf('中国うさぎ') !== -1) {
      userVoiceArray.push([false, text, rate, 51])
      return
    }
    if (text.indexOf('栗田まろん') !== -1) {
      userVoiceArray.push([false, text, rate, 67])
      return
    }
    if (text.indexOf('あいえるたん') !== -1) {
      userVoiceArray.push([false, text, rate, 68])
      return
    }
    if (text.indexOf('満別花丸') !== -1) {
      userVoiceArray.push([false, text, rate, 69])
      return
    }
    if (text.indexOf('琴詠ニア') !== -1) {
      userVoiceArray.push([false, text, rate, 74])
      return
    }

    userVoiceArray.push([true, text, rate, ''])
    console.log('設定配列：' + text + 'を設定')
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
    if (Number(text) > 5) { return }
    if (player < Number(text) && isAutoPeopleVoice) {
      userVoiceArray.push([true, `${text}名様いらっしゃい`, 1, ''])
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
    if (element_star.innerText.toString().length >= 3 && element_star.innerText.substring(element_star.length - 2) == '00') {
      // 特別演出
      const text = `${element_star.innerText.toString()}いいね、ありがとうなのだ！`
      userVoiceArray.push([false, text, 1, 3])
    } else if (star < document.querySelector('#room_prop .prop_block:last-of-type span').innerHTML) {
      const music = new Audio();
      music.src = "https://soundeffect-lab.info/sound/anime/mp3/pa1.mp3"
      music.volume = 0.09 * mainVolumeInt * midnightVolumeInt
      music.play();
      console.log('いいねをいただきました。')
    }
    star = document.querySelector('#room_prop .prop_block:last-of-type span').innerHTML
  })

  let isBGM = false
  let isEnd = false
  let isEnding = false
  let isEindingVoice = false
  let letHours = nowDate.getHours()
  let isBGMChange = false
  let isVoiceInfo = false
  // タイマー検知
  //MutationObserver（インスタンス）の作成
  var mo_timer = new MutationObserver(function () {
    const nowDate = new Date();
    const nowHours = nowDate.getHours()
    if (letHours != nowHours) {
      isBGMChange = true
      letHours = nowHours
    }
    if (!isBGM) {
      // 枠開始時用設定
      // 枠の自動選曲機能
      let voiceInfo = ""
      if (nowDate.getHours() == 0) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2023/01/M10_Harp_long_BPM95.mp3"
        bgm.volume = 0.035 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「いつかのカフェで – ハープver」です。"
      } else if (nowDate.getHours() == 1) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2023/01/M16_Piano_long_BPM60.mp3"
        bgm.volume = 0.06 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「紫陽花の夢 – ピアノver」です。"
      } else if (nowDate.getHours() == 2) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2023/01/M17_Harp_long_BPM100.mp3"
        bgm.volume = 0.06 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「雨上がりの林道 – ハープver」です。"
      } else if (nowDate.getHours() == 3) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2023/01/M14_Harp_long_BPM72.mp3"
        bgm.volume = 0.07 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「また、あした。 ハープバージョン」です。"
      } else if (nowDate.getHours() == 4) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2023/01/M02_Harp_long_BPM80.mp3"
        bgm.volume = 0.016 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「いつかの夏休み – ハープver」です。"
      } else if (nowDate.getHours() == 5) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2023/01/351_long_BPM67.mp3"
        bgm.volume = 0.016 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「想ひ出語り」です。"
      } else if (nowDate.getHours() == 6) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2021/11/63_BPM66_LONG.mp3"
        bgm.volume = 0.016 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「Lunar Eclipse – Technique」です。"
      } else if (nowDate.getHours() == 7) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2021/05/084_long_BPM80.mp3"
        bgm.volume = 0.012 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「おやすみをいうまえに」です。"
      } else if (nowDate.getHours() == 8) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2021/12/209_long_BPM80.mp3"
        bgm.volume = 0.008 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「夕暮れコスモス」です。"
      } else if (nowDate.getHours() == 9) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2022/03/239_long_BPM88.mp3"
        bgm.volume = 0.006 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「夢うつつバイパス」です。"
      } else if (nowDate.getHours() == 10) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2023/01/355_long_BPM128.mp3"
        bgm.volume = 0.006 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「快晴都市」です。"
      } else if (nowDate.getHours() == 11) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2021/05/054_long_BPM128.mp3"
        bgm.volume = 0.014 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「Hello World」です。"
      } else if (nowDate.getHours() == 12) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2021/05/012_long_BPM117.mp3"
        bgm.volume = 0.015 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「スキップでいこう」です。"
      } else if (nowDate.getHours() == 13) {
        bgm.src = "https://storage.googleapis.com/koelive-project.appspot.com/%E6%9C%88%E3%81%A8%E7%8C%AB.mp3"
        bgm.volume = 0.016 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、今日一さん作、「月と猫」です。"
      } else if (nowDate.getHours() == 14) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2022/03/230_long_BPM166.mp3"
        bgm.volume = 0.013 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「キッズキッチンカー」です。"
      } else if (nowDate.getHours() == 15) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2022/03/237_long_BPM152.mp3"
        bgm.volume = 0.01 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「夢見るターミナル」です。"
      } else if (nowDate.getHours() == 16) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2022/05/280_long_BPM125.mp3"
        bgm.volume = 0.012 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「角砂糖をもうひとつ」です。"
      } else if (nowDate.getHours() == 17) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2021/05/066_long_BPM66.mp3"
        bgm.volume = 0.014 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「淡々と流れていく時間」です。"
      } else if (nowDate.getHours() == 18) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2024/02/LT107_BPM81_LONG.mp3"
        bgm.volume = 0.012 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「Chill Zombie – Soothing Drops」です。"
      } else if (nowDate.getHours() == 19) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2021/11/46_BPM86_LONG.mp3"
        bgm.volume = 0.018 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「Zodd – Youth movie」です。"
      } else if (nowDate.getHours() == 20) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2021/11/11_BPM90_LONG.mp3"
        bgm.volume = 0.016 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「Lunar Eclipse – Dreambox」です。"
      } else if (nowDate.getHours() == 21) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2024/02/LT126_BPM85_LONG.mp3"
        bgm.volume = 0.012 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「Daryl Beat – Dimmed Serenity」です。"
      } else if (nowDate.getHours() == 23) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2021/11/58_BPM81_LONG.mp3"
        bgm.volume = 0.018 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「Chilled Cow – 1989」です。"
      } else if (nowDate.getHours() == 1) {        bgm.src = "https://bgmer.net/wp-content/uploads/2024/02/LT107_BPM81_LONG.mp3"
        bgm.volume = 0.011 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「Chill Zombie – Soothing Drops」です。"
      } else {
        bgm.src = "https://bgmer.net/wp-content/uploads/2023/01/M19_MusicBox_long_BPM78-55.mp3"
        bgm.volume = 0.055 * mainVolumeInt * iOSMusicVolumeInt
        voiceInfo = "続いての曲は、ビージーエマーより、「メリーゴーランド オルゴールバージョン」です。"
      }
      bgm.loop = true
      bgm.play()
      isBGM = true
      if (isVoiceInfo) {
        userVoiceArray.push([true, voiceInfo, 1, ''])
      }
      console.log('BGMの再生を開始')
    } else if (isBGMChange && !isEnd) {
      isBGMChange = false
      console.log('BGM切り替え')
      userVoiceArray.push([true, `【時報です。】ただいま${letHours}時になりました。`, 1, ''])
      isVoiceInfo = true
      // BGMフェードアウト
      let timerid = setInterval(() => {
        // ボリュームが0になったら終了
        if (bgm.volume <= 0.001) {
          bgm.volume = 0;
          bgm.pause();
          clearInterval(timerid);  //タイマー解除
          isBGM = false
        }
        // 0.1ずつボリュームを減らしていく
        else {
          bgm.volume -= 0.001;
        }
      }
      , 100); //0.1秒ごとに繰り返す
    } else if (isEnd) {
      console.log('まもなく配信終了となります。')
      // BGMフェードアウト
      let timerid = setInterval(() => {
        // ボリュームが0になったら終了
        if (bgm.volume <= 0.001) {
          bgm.volume = 0;
          bgm.pause();
          clearInterval(timerid);  //タイマー解除
          if (isEnding) { return }
          // エンディングソング
          const music = new Audio();
          music.src = "https://bgmer.net/wp-content/uploads/2023/01/352_long_BPM81.mp3"
          music.volume = 0.024 * mainVolumeInt * iOSMusicVolumeInt
          music.loop = true
          music.play()
          isEnding = true
        }
        // 0.1ずつボリュームを減らしていく
        else {
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
      userVoiceArray.push([true, '配信終了3分前です。', 1, ''])
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
    if (!isAutoVoice) { return }
    // Voice配列にデータが存在する場合
    if (userVoiceArray.length > 0) {
      const isDefault = userVoiceArray[0][0]
      const text = userVoiceArray[0][1]
      const rate = userVoiceArray[0][2]
      const voicevoxId = userVoiceArray[0][3]
      setVoice(isDefault, text, rate, voicevoxId)
      // 読み上げるVoice配列の削除
      userVoiceArray.shift()
    }
  }, 1000); //1秒ごとに繰り返す
}

/*-----------------------------
    JSONデータを送信する
    引数：なし
    戻値：なし
--------------------------------*/
function sendJsonData(date, liveName, name, comment) {
  console.log("sendJson")
	// 送信するJSON
	let data =
    {
      "action": "insert",
      "sheetName": "DB",
      "rows": [
        {"日時": date,
        "枠名": liveName,
        "名前": name,
        "コメント": comment}
      ]
    }
  console.log(JSON.stringify(data))
	// Fetch APIでデータ送信
	fetch('https://script.google.com/macros/s/AKfycbyAzUWj6faRyJHkONwohY6AtrHWWKNPwRzoMVYYbOsPfa8QTnOeRXPHYi86MTaKrkWmyQ/exec', {
    method: 'post', // 通信メソッド
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json', // JSON形式のデータのヘッダー
    },
		body: JSON.stringify(data) // JSON形式のデータ
	})
	.then(response => response.text())
	.then(data => {
		console.log(data);
	});
}

/*-----------------------------
    ポン出し機能
--------------------------------*/
let digitNum = 1
const pongBtnName = document.querySelector('#comment_header_area input')
pongBtnName.value = `NG初期化
1.「よ、よろしくお願いします」
2.「もう…だめ…」
3.「よろしくお願いしますわ」
4.「なんだザコかあ」
5.「か、体がいうことを…」
6.「やるじゃないか！」
7.ドン
8.ドドン
9.チーン
`
document.onkeydown = function (e) {
  const se = new Audio();
  if (e.code == "Digit1") {
    pongBtnName.value = `NG初期化
1.「よ、よろしくお願いします」
2.「もう…だめ…」
3.「よろしくお願いしますわ」
4.「なんだザコかあ」
5.「か、体がいうことを…」
6.「やるじゃないか！」
7.ドン
8.ドドン
9.チーン
`
    digitNum = 1
  }
  if (e.code == "Digit2") {
    pongBtnName.value = `NG初期化
1.歓声と拍手
2.スタジアムの歓声
3.黄色い悲鳴
4.自主規制ピー音
5.男衆「始めいッ！」
6.爆発1
7.キラッ1
8.キラッ2
9.ピューンと逃げる
`
    digitNum = 2
  }
  if (e.code == "Digit3") {
    pongBtnName.value = `NG初期化
1.間抜け1 ドジ
2.間抜け3 えっ？
3.間抜け5 気の抜ける音
4.間抜け7 ほわんほわん
5.お寺の鐘
6.ショック2
7.目が点になる
8.ひらめく1
9.ポカンとげんこつ
`
    digitNum = 3
  }
  if (e.code == "Digit4") {
    pongBtnName.value = `NG初期化
1.クイズ出題1
2.クイズ正解2 鉄琴
3.クイズ不正解1
4.制限時間タイマー
5.ちゃんちゃん♪1
6.ちゃんちゃん♪2
7.ちゃんちゃん♪3
8.男衆「イヤッホー！」
9.ドンドンパフパフ
`
    digitNum = 4
  }
  if (e.code == "Digit5") {
    pongBtnName.value = `NG初期化
1.「なんでやねん！」
2.「ええかげんにせんかい！」
3.「もうええわ」
4.「おおきに」
5.「アカン！」
6.「もうかりまっか？」
7.「えー…」
8.「えーーーっ！？」
9.「うぅっ…」
`
    digitNum = 5
  }
  if (e.code == "Digit6") {
    pongBtnName.value = `NG初期化
1.「ダメージ1 あぁん」
2.「ダメージ2 だぁめ」
3.「ダメージ3 らぁめ」
4.「おいたはダメよ？」
5.「怒っちゃうぞ」
6.「キツイの行くわよ」
7.「痛いかしら？」
8.「あらあら2」
9.「一緒にさぼろっか」
`
    digitNum = 6
  }
  if (e.code == "Digit7") {
    pongBtnName.value = `NG初期化
1.「ダメージ1 うっ」
2.「ダメージ2 ひゃあ」
3.「ダメージ3 いたい」
4.「ダメージ4 はぁ」
5.「ご褒美になでなでしてくれる？」
6.「ちょっとヤバいかも」
7.「ちょっとキツイや」
8.「終わっちゃうの」
9.「もう動けないや…」
`
    digitNum = 7
  }
  if (e.code == "Digit8") {
    pongBtnName.value = `NG初期化
1.「痛くはしませんわ」
2.「美味しそう」
3.「吸血1 ジュルュジュ」
4.「吸血2 チュル」
5.「吸血3 ッハァ」
6.「君は生ゴミみたいな匂いがするにゃぁ」
7.「生ごみにゃ！生ごみにゃ！」
8.「へぇ」
9.「はいはい、どーもにゃ」
`
    digitNum = 8
  }
  if (e.code == "Digit9") {
    pongBtnName.value = `NG初期化
1.「絶対泣かせちゃうもんね！」
2.「こんなの聞いてないよ！？」
3.「なめんなよ！」
4.「べ～だ！」
5.「タンマ！」
6.「うわああ！」
7.「うわーーーー！」
8.「ちくしょー、覚えてろよぉ！」
9.「へへん、どうだ！」
`
    digitNum = 9
  }
  if (digitNum == 1) {
    // テンキー1
    console.log(e.code)
    if (e.code == "Numpad1") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/healer-greeting1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー2
    if (e.code == "Numpad2") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/healer-death1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー3
    if (e.code == "Numpad3") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/witch-greeting1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー4
    if (e.code == "Numpad4") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-start1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー5
    if (e.code == "Numpad5") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/wizard-faint1.mp3"
      se.volume = 0.04 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー6
    if (e.code == "Numpad6") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/swordman-guard2.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー7
    if (e.code == "Numpad7") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/drum-japanese1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー8
    if (e.code == "Numpad8") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/drum-japanese2.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー9
    if (e.code == "Numpad9") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/tin1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
  }
  if (digitNum == 2) {
    // テンキー1
    console.log(e.code)
    if (e.code == "Numpad1") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/people/people-performance-cheer1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー2
    if (e.code == "Numpad2") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/people/people-stadium-cheer1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー3
    if (e.code == "Numpad3") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/people/people-studio-kyaa1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー4
    if (e.code == "Numpad4") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/self-regulation1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー5
    if (e.code == "Numpad5") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/mens-hajimei1.mp3"
      se.volume = 0.04 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー6
    if (e.code == "Numpad6") {
      se.src = "https://soundeffect-lab.info/sound/battle/mp3/bomb1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー7
    if (e.code == "Numpad7") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/kira1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー8
    if (e.code == "Numpad8") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/kira2.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー9
    if (e.code == "Numpad9") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/flee1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
  }
  if (digitNum == 3) {
    // テンキー1
    console.log(e.code)
    if (e.code == "Numpad1") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/stupid1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー2
    if (e.code == "Numpad2") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/stupid3.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー3
    if (e.code == "Numpad3") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/stupid5.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー4
    if (e.code == "Numpad4") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/stupid7.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー5
    if (e.code == "Numpad5") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/temple-bell1.mp3"
      se.volume = 0.04 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー6
    if (e.code == "Numpad6") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/shock2.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー7
    if (e.code == "Numpad7") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/stunned1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー8
    if (e.code == "Numpad8") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/flash1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー9
    if (e.code == "Numpad9") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/strike1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
  }
  if (digitNum == 4) {
    // テンキー1
    console.log(e.code)
    if (e.code == "Numpad1") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/question1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー2
    if (e.code == "Numpad2") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/correct2.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー3
    if (e.code == "Numpad3") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/incorrect1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー4
    if (e.code == "Numpad4") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/quiz-timer1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー5
    if (e.code == "Numpad5") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/chan-chan1.mp3"
      se.volume = 0.04 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー6
    if (e.code == "Numpad6") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/chan-chan2.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー7
    if (e.code == "Numpad7") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/chan-chan3.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー8
    if (e.code == "Numpad8") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/mens-yahoo1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー9
    if (e.code == "Numpad9") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/dondonpafupafu1.mp3"
      se.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
    }
  }
  if (digitNum == 5) {
    // テンキー1
    console.log(e.code)
    if (e.code == "Numpad1") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-nandeyanen1.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー267
    if (e.code == "Numpad2") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-eekagennnisenkai1.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー3
    if (e.code == "Numpad3") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-moueewa1.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー4
    if (e.code == "Numpad4") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-ookini1.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー5
    if (e.code == "Numpad5") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-akan1.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー6
    if (e.code == "Numpad6") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-moukarimakka1.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー7
    if (e.code == "Numpad7") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-ee2.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー8
    if (e.code == "Numpad8") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-ee1.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー9
    if (e.code == "Numpad9") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-uu1.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
  }
  if (digitNum == 6) {
    // テンキー1
    console.log(e.code)
    if (e.code == "Numpad1") {
      se.src = "https://blog-imgs-116.fc2.com/s/p/a/spaluna/zyosei2-damegi1.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー2
    if (e.code == "Numpad2") {
      se.src = "https://blog-imgs-116.fc2.com/s/p/a/spaluna/zyosei2-damegi2.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー3
    if (e.code == "Numpad3") {
      se.src = "https://blog-imgs-116.fc2.com/s/p/a/spaluna/zyosei2-damegi3.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー4
    if (e.code == "Numpad4") {
      se.src = "https://blog-imgs-116.fc2.com/s/p/a/spaluna/zyosei2-oitahadameyo.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー5
    if (e.code == "Numpad5") {
      se.src = "https://blog-imgs-116.fc2.com/s/p/a/spaluna/zyosei2-okocchauzo.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー6
    if (e.code == "Numpad6") {
      se.src = "https://blog-imgs-116.fc2.com/s/p/a/spaluna/zyosei2-kituinoikuwayo.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー7
    if (e.code == "Numpad7") {
      se.src = "https://blog-imgs-116.fc2.com/s/p/a/spaluna/zyosei2-itaikashira.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー8
    if (e.code == "Numpad8") {
      se.src = "https://blog-imgs-116.fc2.com/s/p/a/spaluna/zyosei2-araara2.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー9
    if (e.code == "Numpad9") {
      se.src = "https://blog-imgs-118.fc2.com/s/p/a/spaluna/zyosei2-issyonisaborokka.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
  }
  if (digitNum == 7) {
    // テンキー1
    console.log(e.code)
    if (e.code == "Numpad1") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo8-damege1.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー2
    if (e.code == "Numpad2") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo8-damege2.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー3
    if (e.code == "Numpad3") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo8-damege3.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー4
    if (e.code == "Numpad4") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo8-damege4.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー5
    if (e.code == "Numpad5") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo8-gohoubininadenade.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー6
    if (e.code == "Numpad6") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo8-tyottoyabaikaom.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー7
    if (e.code == "Numpad7") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo8-tyottokituiya.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー8
    if (e.code == "Numpad8") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo8-owattyauno.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー9
    if (e.code == "Numpad9") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo8-mouugokenaiya.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
  }
  if (digitNum == 8) {
    // テンキー1
    console.log(e.code)
    if (e.code == "Numpad1") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo11-itakuhasimasennwa.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー2
    if (e.code == "Numpad2") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo11-oisiso.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー3
    if (e.code == "Numpad3") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo11-kyuuketu.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー4
    if (e.code == "Numpad4") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo11-kyuuketu2.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー5
    if (e.code == "Numpad5") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo11-kyuuketu3.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー6
    if (e.code == "Numpad6") {
      se.src = "https://blog-imgs-119.fc2.com/s/p/a/spaluna/syozyo13-kimihanamagomimitaina.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー7
    if (e.code == "Numpad7") {
      se.src = "https://blog-imgs-119.fc2.com/s/p/a/spaluna/syozyo13-namagominya.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー8
    if (e.code == "Numpad8") {
      se.src = "https://blog-imgs-119.fc2.com/s/p/a/spaluna/syozyo13-he-.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー9
    if (e.code == "Numpad9") {
      se.src = "https://blog-imgs-119.fc2.com/s/p/a/spaluna/syozyo13-haihaidomonya.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
  }
  if (digitNum == 9) {
    // テンキー1
    console.log(e.code)
    if (e.code == "Numpad1") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-special2.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー2
    if (e.code == "Numpad2") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-start2.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー3
    if (e.code == "Numpad3") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-attack3.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー4
    if (e.code == "Numpad4") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-guard1.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー5
    if (e.code == "Numpad5") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-guard2.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー6
    if (e.code == "Numpad6") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-damage2.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー7
    if (e.code == "Numpad7") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-death1.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー8
    if (e.code == "Numpad8") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-lose1.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
    // テンキー9
    if (e.code == "Numpad9") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-win1.mp3"
      se.volume = 0.12 * mainVolumeInt * iOSMusicVolumeInt
    }
  }
  se.play()
};
