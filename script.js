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
const nonCommentArray = ['ずんだもんは暇なのだ', '誰か、ずんだもんの相手をしてほしいのだ', 'もしもーし。ずんだもんなのだ。'];
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
  mainVolumeInt = 1
}
// Edgeからの場合はループバックさせるため音量を下げておく
if (agent.indexOf('iphone') > -1 || agent.indexOf('macintosh') > -1) {
  iOSMusicVolumeInt = 0.001
  iOSVoiceVolumeInt = 100
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
      isVoice = false
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
    if (text.indexOf('剣崎雌雄') !== -1) {
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
    if (text.indexOf('ちび式じい') !== -1) {
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
      userVoiceArray.push([false, text, rate, 47])
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
    if (player < Number(text)) {
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
  // タイマー検知
  //MutationObserver（インスタンス）の作成
  var mo_timer = new MutationObserver(function () {
    // TODO: あまり必要性を感じなかったので一旦不要
    // nonCommentCounter++
    // ずんだもんの独り言機能
    // if (nonCommentCounter >= 600) {
    //   const text = nonCommentArray[Math.floor(Math.random() * nonCommentArray.length)]
    //   console.log('ずんだもんの独り言' + text)
    //   userVoiceArray.push([false, text, 1, 3])
    //   nonCommentCounter = 0
    // }
    const nowDate = new Date();
    const nowHours = nowDate.getHours()
    if (letHours != nowHours) {
      isBGMChange = true
      letHours = nowHours
    }
    if (!isBGM) {
      // 枠開始時用設定
      // 枠の自動選曲機能
      if (nowDate.getHours() == 0) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2023/01/M15_MusicBox_long_BPM92.mp3"
        bgm.volume = 0.04 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 1) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2023/01/M20_Marimba_long_BPM80-65.mp3"
        bgm.volume = 0.07 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 2) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2023/01/M13_Harp_long_BPM73.mp3"
        bgm.volume = 0.06 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 3) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2023/01/M14_Harp_long_BPM72.mp3"
        bgm.volume = 0.07 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 4) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2022/05/287_long_BPM95.mp3"
        bgm.volume = 0.008 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 5) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2021/12/212_long_BPM132.mp3"
        bgm.volume = 0.006 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 6) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2021/12/210_long_BPM105.mp3"
        bgm.volume = 0.018 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 7) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2022/03/216_long_BPM65.mp3"
        bgm.volume = 0.03 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 8) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2021/12/209_long_BPM80.mp3"
        bgm.volume = 0.008 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 9) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2022/03/239_long_BPM88.mp3"
        bgm.volume = 0.006 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 10) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2023/01/340_long_BPM80.mp3"
        bgm.volume = 0.007 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 11) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2022/05/284_long_BPM120.mp3"
        bgm.volume = 0.007 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 12) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2021/05/063_long_BPM204.mp3"
        bgm.volume = 0.007 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 13) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2022/05/271_long_BPM110.mp3"
        bgm.volume = 0.006 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 14) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2022/03/243_long_BPM181.mp3"
        bgm.volume = 0.005 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 15) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2022/05/277_long_BPM120.mp3"
        bgm.volume = 0.006 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 16) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2021/09/149_long_BPM100.mp3"
        bgm.volume = 0.006 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 17) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2022/05/294_long_BPM88.mp3"
        bgm.volume = 0.009 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 18) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2021/12/65_BPM93_LONG.mp3"
        bgm.volume = 0.01 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 19) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2022/05/297_long_BPM85.mp3"
        bgm.volume = 0.007 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 20) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2024/02/420_long_BPM108.mp3"
        bgm.volume = 0.005 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 21) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2021/12/LT098_LONG.mp3"
        bgm.volume = 0.007 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 22) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2022/05/296_long_BPM85.mp3"
        bgm.volume = 0.018 * mainVolumeInt * iOSMusicVolumeInt
      } else if (nowDate.getHours() == 23) {
        bgm.src = "https://bgmer.net/wp-content/uploads/2024/02/LT101_BPM90_LONG.mp3"
        bgm.volume = 0.011 * mainVolumeInt * iOSMusicVolumeInt
      } else {
        bgm.src = "https://bgmer.net/wp-content/uploads/2023/01/M19_MusicBox_long_BPM78-55.mp3"
        bgm.volume = 0.055 * mainVolumeInt * iOSMusicVolumeInt
      }
      bgm.loop = true
      bgm.play()
      isBGM = true
      console.log('BGMの再生を開始')
    } else if (isBGMChange && !isEnd) {
      isBGMChange = false
      console.log('BGM切り替え')
      userVoiceArray.push([true, `【時報です。】ただいま${letHours}時になりました。`, 1, ''])
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
          music.src = "https://bgmer.net/wp-content/uploads/2021/12/206_long_BPM172.mp3"
          music.volume = 0.015 * mainVolumeInt * iOSMusicVolumeInt
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
