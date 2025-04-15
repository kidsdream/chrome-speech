/*-----------------------------
    ポン出し機能
--------------------------------*/
export function playSePong(e) {
  const se = new Audio();
  if (e.code == "Digit1") {
    window.pongBtnName.value = `NG初期化
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
    window.digitNum = 1
  }
  if (e.code == "Digit2") {
    window.pongBtnName.value = `NG初期化
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
    window.digitNum = 2
  }
  if (e.code == "Digit3") {
    window.pongBtnName.value = `NG初期化
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
    window.digitNum = 3
  }
  if (e.code == "Digit4") {
    window.pongBtnName.value = `NG初期化
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
    window.digitNum = 4
  }
  if (e.code == "Digit5") {
    window.pongBtnName.value = `NG初期化
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
    window.digitNum = 5
  }
  if (e.code == "Digit6") {
    window.pongBtnName.value = `NG初期化
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
    window.digitNum = 6
  }
  if (e.code == "Digit7") {
    window.pongBtnName.value = `NG初期化
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
    window.digitNum = 7
  }
  if (e.code == "Digit8") {
    window.pongBtnName.value = `NG初期化
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
    window.digitNum = 8
  }
  if (e.code == "Digit9") {
    window.pongBtnName.value = `NG初期化
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
    window.digitNum = 9
  }
  if (window.digitNum == 1) {
    // テンキー1
    console.log(e.code)
    if (e.code == "Numpad1") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/healer-greeting1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー2
    if (e.code == "Numpad2") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/healer-death1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー3
    if (e.code == "Numpad3") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/witch-greeting1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー4
    if (e.code == "Numpad4") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-start1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー5
    if (e.code == "Numpad5") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/wizard-faint1.mp3"
      se.volume = 0.04 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー6
    if (e.code == "Numpad6") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/swordman-guard2.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー7
    if (e.code == "Numpad7") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/drum-japanese1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー8
    if (e.code == "Numpad8") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/drum-japanese2.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー9
    if (e.code == "Numpad9") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/tin1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
  }
  if (window.digitNum == 2) {
    // テンキー1
    console.log(e.code)
    if (e.code == "Numpad1") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/people/people-performance-cheer1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー2
    if (e.code == "Numpad2") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/people/people-stadium-cheer1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー3
    if (e.code == "Numpad3") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/people/people-studio-kyaa1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー4
    if (e.code == "Numpad4") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/self-regulation1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー5
    if (e.code == "Numpad5") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/mens-hajimei1.mp3"
      se.volume = 0.04 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー6
    if (e.code == "Numpad6") {
      se.src = "https://soundeffect-lab.info/sound/battle/mp3/bomb1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー7
    if (e.code == "Numpad7") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/kira1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー8
    if (e.code == "Numpad8") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/kira2.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー9
    if (e.code == "Numpad9") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/flee1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
  }
  if (window.digitNum == 3) {
    // テンキー1
    console.log(e.code)
    if (e.code == "Numpad1") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/stupid1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー2
    if (e.code == "Numpad2") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/stupid3.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー3
    if (e.code == "Numpad3") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/stupid5.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー4
    if (e.code == "Numpad4") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/stupid7.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー5
    if (e.code == "Numpad5") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/temple-bell1.mp3"
      se.volume = 0.04 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー6
    if (e.code == "Numpad6") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/shock2.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー7
    if (e.code == "Numpad7") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/stunned1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー8
    if (e.code == "Numpad8") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/flash1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー9
    if (e.code == "Numpad9") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/strike1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
  }
  if (window.digitNum == 4) {
    // テンキー1
    console.log(e.code)
    if (e.code == "Numpad1") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/question1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー2
    if (e.code == "Numpad2") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/correct2.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー3
    if (e.code == "Numpad3") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/incorrect1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー4
    if (e.code == "Numpad4") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/quiz-timer1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー5
    if (e.code == "Numpad5") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/chan-chan1.mp3"
      se.volume = 0.04 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー6
    if (e.code == "Numpad6") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/chan-chan2.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー7
    if (e.code == "Numpad7") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/chan-chan3.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー8
    if (e.code == "Numpad8") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/mens-yahoo1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー9
    if (e.code == "Numpad9") {
      se.src = "https://soundeffect-lab.info/sound/anime/mp3/dondonpafupafu1.mp3"
      se.volume = 0.03 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
  }
  if (window.digitNum == 5) {
    // テンキー1
    console.log(e.code)
    if (e.code == "Numpad1") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-nandeyanen1.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー267
    if (e.code == "Numpad2") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-eekagennnisenkai1.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー3
    if (e.code == "Numpad3") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-moueewa1.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー4
    if (e.code == "Numpad4") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-ookini1.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー5
    if (e.code == "Numpad5") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-akan1.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー6
    if (e.code == "Numpad6") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-moukarimakka1.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー7
    if (e.code == "Numpad7") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-ee2.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー8
    if (e.code == "Numpad8") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-ee1.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー9
    if (e.code == "Numpad9") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-uu1.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
  }
  if (window.digitNum == 6) {
    // テンキー1
    console.log(e.code)
    if (e.code == "Numpad1") {
      se.src = "https://blog-imgs-116.fc2.com/s/p/a/spaluna/zyosei2-damegi1.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー2
    if (e.code == "Numpad2") {
      se.src = "https://blog-imgs-116.fc2.com/s/p/a/spaluna/zyosei2-damegi2.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー3
    if (e.code == "Numpad3") {
      se.src = "https://blog-imgs-116.fc2.com/s/p/a/spaluna/zyosei2-damegi3.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー4
    if (e.code == "Numpad4") {
      se.src = "https://blog-imgs-116.fc2.com/s/p/a/spaluna/zyosei2-oitahadameyo.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー5
    if (e.code == "Numpad5") {
      se.src = "https://blog-imgs-116.fc2.com/s/p/a/spaluna/zyosei2-okocchauzo.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー6
    if (e.code == "Numpad6") {
      se.src = "https://blog-imgs-116.fc2.com/s/p/a/spaluna/zyosei2-kituinoikuwayo.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー7
    if (e.code == "Numpad7") {
      se.src = "https://blog-imgs-116.fc2.com/s/p/a/spaluna/zyosei2-itaikashira.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー8
    if (e.code == "Numpad8") {
      se.src = "https://blog-imgs-116.fc2.com/s/p/a/spaluna/zyosei2-araara2.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー9
    if (e.code == "Numpad9") {
      se.src = "https://blog-imgs-118.fc2.com/s/p/a/spaluna/zyosei2-issyonisaborokka.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
  }
  if (window.digitNum == 7) {
    // テンキー1
    console.log(e.code)
    if (e.code == "Numpad1") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo8-damege1.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー2
    if (e.code == "Numpad2") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo8-damege2.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー3
    if (e.code == "Numpad3") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo8-damege3.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー4
    if (e.code == "Numpad4") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo8-damege4.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー5
    if (e.code == "Numpad5") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo8-gohoubininadenade.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー6
    if (e.code == "Numpad6") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo8-tyottoyabaikaom.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー7
    if (e.code == "Numpad7") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo8-tyottokituiya.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー8
    if (e.code == "Numpad8") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo8-owattyauno.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー9
    if (e.code == "Numpad9") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo8-mouugokenaiya.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
  }
  if (window.digitNum == 8) {
    // テンキー1
    console.log(e.code)
    if (e.code == "Numpad1") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo11-itakuhasimasennwa.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー2
    if (e.code == "Numpad2") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo11-oisiso.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー3
    if (e.code == "Numpad3") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo11-kyuuketu.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー4
    if (e.code == "Numpad4") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo11-kyuuketu2.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー5
    if (e.code == "Numpad5") {
      se.src = "https://blog-imgs-117.fc2.com/s/p/a/spaluna/syozyo11-kyuuketu3.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー6
    if (e.code == "Numpad6") {
      se.src = "https://blog-imgs-119.fc2.com/s/p/a/spaluna/syozyo13-kimihanamagomimitaina.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー7
    if (e.code == "Numpad7") {
      se.src = "https://blog-imgs-119.fc2.com/s/p/a/spaluna/syozyo13-namagominya.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー8
    if (e.code == "Numpad8") {
      se.src = "https://blog-imgs-119.fc2.com/s/p/a/spaluna/syozyo13-he-.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー9
    if (e.code == "Numpad9") {
      se.src = "https://blog-imgs-119.fc2.com/s/p/a/spaluna/syozyo13-haihaidomonya.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
  }
  if (window.digitNum == 9) {
    // テンキー1
    console.log(e.code)
    if (e.code == "Numpad1") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-special2.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー2
    if (e.code == "Numpad2") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-start2.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー3
    if (e.code == "Numpad3") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-attack3.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー4
    if (e.code == "Numpad4") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-guard1.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー5
    if (e.code == "Numpad5") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-guard2.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー6
    if (e.code == "Numpad6") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-damage2.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー7
    if (e.code == "Numpad7") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-death1.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー8
    if (e.code == "Numpad8") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-lose1.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
    // テンキー9
    if (e.code == "Numpad9") {
      se.src = "https://soundeffect-lab.info/sound/voice/mp3/game/thief-boy-win1.mp3"
      se.volume = 0.12 * window.mainVolumeInt * window.iOSMusicVolumeInt
    }
  }
  se.play()
};
