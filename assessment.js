'use-strict'; // 厳格モード呼び出し

// HTML要素取得
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

// テキストフィールド上でEnter押下時
userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        // 診断ボタンクリック時と同じ処理
        assessmentButton.onclick();
    }
}

// 診断ボタンクリック時
// ES6以降は、無名関数をアロー関数で書くことができる
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        // 名前が空の時は処理終了
        return;
    }
    
    // div要素の子要素をすべて削除
    removeAllChildren(resultDivided);
    removeAllChildren(tweetDivided);

    // 診断結果エリア作成
    // div要素の子要素としてh3とpを追加
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName); // 診断処理
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // ツイートエリア作成
    // div要素の子要素としてaとscriptを追加
    const anchor = document.createElement('a');
    // URIエンコードで、日本語文字列を変換する
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + 
        encodeURIComponent('あなたのいいところ') + 
        '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button'; // idとclassは専用プロパティに直接値指定可能
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
}

// 回答を格納した定数配列
const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
'{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param (string) userName ユーザーの名前
 * @return (string) 診断結果
 */
function assessment(userName) {
    // 全文字の文字コードを取得して足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    // 文字のコード番号の合計を回答の数で割ったあまりを求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    // 正規表現を利用してユーザー名を代入する
    result = result.replace(/\{userName\}/g, userName);

    return result;
}

/**
 * 指定した要素の子要素をすべて削除する関数
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        // 子要素がある限り削除
        element.removeChild(element.firstChild);
    }
}

// テスト用コード
console.assert(
    assessment('一花') ===
        '一花のいいところはまなざしです。一花に見つめられた人は、気になって仕方がないでしょう。',
        '診断結果の文言の特定部分を名前に置き換える処理が正しくありません。'
);

// テスト用コード2
console.assert(
    assessment('二乃') ===
        assessment('二乃'),
        '同じ名前に対して同じ結果を出力する処理が正しくありません。'
);
