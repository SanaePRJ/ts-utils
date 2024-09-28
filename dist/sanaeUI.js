"use strict";
/* --------------------------------------------------------------------------------------------------
    このライブラリは SanaeProject の webサイト で使用される共通ライブラリです。
    
    DelayPrint       : ゆっくりとタイピングするように表記できます。
    ReadFileBySelect : Select されたファイルの内容を取得します。
    ReadFile         : 他のファイルを取得します。

    Copyright 2024 SanaeProject.
-------------------------------------------------------------------------------------------------- */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delayPrint = delayPrint;
// 書き込み中のエレメント
let writingElements = [];
// ゆっくりと表示するメソッド
// <p id='helloWorld'>hello</p>
// -----------------------------
// 1文字500ミリ秒でゆっくりと表示する。
// 
// let element = document.getElementById('helloWorld');
// 上書き: delayPrint(element,'helloWorld',500);      // -> helloWorld
// 追記  : delayPrint(element,'helloWorld',500,true); // -> hellohelloWorld
function delayPrint(element_1, text_1, interval_1) {
    return __awaiter(this, arguments, void 0, function* (element, text, interval, add = false) {
        var _a;
        // 指定された element が書き込み中でないかを確かめるラムダ式
        const is_existing = () => { return writingElements.includes(element); };
        // element の文字数を取得するラムダ式
        const get_length = () => { var _a, _b; return (_b = (_a = element === null || element === void 0 ? void 0 : element.textContent) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0; };
        // 書き込む文字列
        let writeContent = (_a = element.textContent) !== null && _a !== void 0 ? _a : '';
        // 書き込んだ文字数
        let writeCount = 0;
        // 書き込み中であれば interval[ms] 待って再度確認する。
        while (is_existing())
            yield new Promise(resolve => setTimeout(resolve, interval));
        // 書き込み中にする。
        writingElements.push(element);
        // 追記
        if (add) {
            writeContent += text;
            writeCount = get_length();
        }
        // 上書き
        else
            writeContent = text;
        // 書き込みを行う
        let printInterval = setInterval(() => {
            if (writeCount < writeContent.length) {
                // 文字を少しずつ表示させていく。
                element.textContent = writeContent.substring(0, writeCount) + "_";
                // カウント増加
                writeCount++;
            }
            else {
                // tag も反映させる。
                element.innerHTML = writeContent;
                // interval 削除
                clearInterval(printInterval);
                // 書き込み終了
                writingElements = writingElements.filter(elements => elements !== element);
            }
        }, interval);
    });
}
//# sourceMappingURL=sanaeUI.js.map