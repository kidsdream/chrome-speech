/*-----------------------------
  JSONデータを送信する
--------------------------------*/
export function sendJsonData(date, time, liveName, name, comment, id) {
    console.log("sendJson")
    // 送信するJSON
    let data =
    {
      "action": "insert",
      "sheetName": "DB",
      "rows": [
        {
        "日時": date,
        "コメント時間": time,
        "枠名": liveName,
        "名前": name,
        "コメント": comment,
        "ID": id}
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
