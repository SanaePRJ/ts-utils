# ts-utils

**ts-utils**は`TypeScript`で書かれたライブラリであり、Webサイト開発をサポートします。

このリポジトリではGitHubでの開発の練習も行っています。


## 貢献方法
他の開発者がプロジェクトに貢献する方法を説明します。

### 貢献
1. リポジトリをフォークします。
2. 新しいブランチを作成します (`git checkout -b feature/新機能`).
3. 変更をコミットします (`git commit -m 'Add some 新機能'`).
4. ブランチにプッシュします (`git push origin feature/新機能`).
5. プルリクエストを作成します。

> [!CAUTION]
> コードをコミットする前に、必ず`eslint`と`prettier`を実行してください。

## CodeStyle

ts-utilsに`eslint`と`prettier`を導入します。

### 参考記事

1. [ESLint と Prettier の導入 - zenn.dev](https://zenn.dev/takaya39/articles/0a8a9fae99001f)
2. [フロントエンドやるなら入れておくべきESlintってなに？ - qiita](https://qiita.com/mzmz__02/items/63f2624e00c02be2f942)
3. [コードフォーマッター「Prettier」を初心者にも分かりやすく解説 - qiita](https://qiita.com/Junpei_Takagi/items/3983cc735e71ea3917fd)

### Node.jsのインストール

#### 参考記事

4. [Linux 環境に Node.js インストール - qiita](https://qiita.com/nanbuwks/items/ed8adb2d4324c939a349)

> [!NOTE]
> このプロジェクトを使用/開発するためには`Node.js`をインストールしていなければなりません。

#### Windows

```
winget install node.js
```

インストール後コマンドプロンプトを再起動して以下のコマンドが通れば成功。

```
npm --version
```

#### Linux

```
sudo apt update
sudo apt install nodejs npm
```

インストール後コマンドプロンプトを再起動して以下のコマンドが通れば成功。

```
npm -v
```

### ESLintのインストール

#### 開発依存関係としてインストールする。

> 依存関係 (dependencies): 本番環境でも必要なライブラリやツール。

> 開発依存関係 (devDependencies): 開発中にのみ必要なライブラリやツール。

```
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

> @typescript-eslint/parser: TypeScriptコードを解析するためのパーサー

> @typescript-eslint/eslint-plugin: TypeScript特有のルールを提供するプラグイン

> eslint-config-prettier: PrettierとESLintの競合を防ぐための設定

#### ESLintの初期化

```
npx eslint --init
```

を実行するとメッセージが表示されここでは`y`を入力して続行する。  
以下は選択

> How would you like to use ESLint? ...`

- [ ] To check syntax only
- [x] To check syntax and find problems

> What type of modules does your project use? ...

- [x] JavaScript modules (import/export)
- [ ] CommonJS (require/exports)
- [ ] None of these

> Which framework does your project use? ...`

- [ ] React
- [ ] Vue.js
- [x] None of these

> Does your project use TypeScript? ...

- [ ] No
- [x] Yes

> Where does your code run? ...

- [x] Browser
- [ ] Node

> The config that you've selected requires the following dependencies:
> eslint, globals, @eslint/js, typescript-eslint
> ? Would you like to install them now? »

- [ ] No
- [x] Yes

> Which package manager do you want to use? ...

- [x] npm
- [ ] yarn
- [ ] pnpm
- [ ] bun

すると`eslint.config.mjs`が生成される。  
`package.json`を作成し以下のコードを書き込む。

```json
{
  "scripts": {
    "lint": "eslint \"src/*.{js,ts}\""
  }
}
```

これで`src`フォルダ直下の`.js`または`.ts`ファイルをチェックの対象にする。

#### 実行
```
npm run lint
```

### Prettierのインストール
```
npm install --save-dev prettier
```
`.prettierrc `ファイルを作成し以下のコードを書き込む
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2
}
```
#### 実行
```
npx prettier --write .
```
### ESLintと結合
ESLintとTypeScript、および関連するツールをインストールします。
```
npm install --save-dev eslint @eslint/js @typescript-eslint/parser @typescript-eslint/eslint-plugin
```
`eslint.config.mjs`に以下のコードを追加する。
```diff javascript
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
+ import prettierConfig from 'eslint-config-prettier';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
+  prettierConfig,
+  {
+    rules: {
+      // ここにカスタムルールを追加
+    },
+  },
];
```
`.prettierrc`ファイルを以下のコードに書き換えます。
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2
}
```
#### 実行する
```
npx eslint . --fix
npx prettier --write .
```
