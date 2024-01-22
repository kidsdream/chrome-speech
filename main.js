"use strict"
var tabid

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#cast_start').addEventListener('change', castStart);
});

// Tab情報を取得する。複数取得しようとするが、配信サイトは1つだけ開いているはず
function getTab(tabs) {
  tabid = tabs[0].id
}

// サイト(koekoe配信サイト)にJavaScriptを挿入する
function insertJs() {
  chrome.scripting
  .executeScript({
    target: {tabId : tabid},
    files: [ "script.js" ],
  })
  .then(() => console.log("script injected"));
}

function onError(error) {
  console.log(`Error: ${error}`);
}

// koekoe配信サイトを取得する。取得できたら後続処理を実行する。
// TODO: 接続先を配信サイトへ修正
// TODO: 自動実行させているため一旦コメントアウト
function castStart() {
  if (document.querySelector('#cast_start').checked) {
    var querying = chrome.tabs.query({ url: "*://*.koe-koe.com/*" })
    querying
      .then(getTab, onError)
      .then(insertJs, onError)
  }
}
