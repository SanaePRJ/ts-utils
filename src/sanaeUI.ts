/* --------------------------------------------------------------------------------------------------
    このライブラリは SanaeProject の webサイト で使用される共通ライブラリです。
    
    DelayPrint       : ゆっくりとタイピングするように表記できます。
    ReadFileBySelect : Select されたファイルの内容を取得します。
    ReadFile         : 他のファイルを取得します。

    Copyright 2024 SanaeProject.
-------------------------------------------------------------------------------------------------- */

// 書き込み中のエレメント
let writingElements: Array<HTMLElement> = [];

// ゆっくりと表示するメソッド
// <p id='helloWorld'>hello</p>
// -----------------------------
// 1文字500ミリ秒でゆっくりと表示する。
//
// let element = document.getElementById('helloWorld');
// 上書き: delayPrint(element,'helloWorld',500);      // -> helloWorld
// 追記  : delayPrint(element,'helloWorld',500,true); // -> hellohelloWorld
export async function delayPrint(
  element: HTMLElement,
  text: string,
  interval: number,
  add: boolean = false,
): Promise<void> {
  // 指定された element が書き込み中でないかを確かめるラムダ式
  const is_existing = (): boolean => {
    return writingElements.includes(element);
  };
  // element の文字数を取得するラムダ式
  const get_length = (): number => {
    return element?.textContent?.length ?? 0;
  };

  // 書き込む文字列
  let writeContent: string = element.textContent ?? '';
  // 書き込んだ文字数
  let writeCount: number = 0;

  // 書き込み中であれば interval[ms] 待って再度確認する。
  while (is_existing())
    await new Promise((resolve) => setTimeout(resolve, interval));

  // 書き込み中にする。
  writingElements.push(element);

  // 追記
  if (add) {
    writeContent += text;
    writeCount = get_length();
  }
  // 上書き
  else writeContent = text;

  // 書き込みを行う
  const printInterval = setInterval(() => {
    if (writeCount < writeContent.length) {
      // 文字を少しずつ表示させていく。
      element.textContent = writeContent.substring(0, writeCount) + '_';

      // カウント増加
      writeCount++;
    } else {
      // tag も反映させる。
      element.innerHTML = writeContent;

      // interval 削除
      clearInterval(printInterval);

      // 書き込み終了
      writingElements = writingElements.filter(
        (elements) => elements !== element,
      );
    }
  }, interval);
}
