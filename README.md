# MoroWare
MoroWareは、特定のフォルダをソフトウェア起動時に暗号化する、マルウェアです。

## 何をするソフトウェア(ウイルス)か
このソフトウェアの挙動についてです。
このソフトウェアを利用、実行等するときは、このソフトの挙動を理解しているはずです。
この挙動は、現状のソースに基づいています。

- このソフトウェアを起動することにより、そのソフトウェアが配置されているディレクトリ内の`./data`ディレクトリ内に含まれる全てのファイルが暗号化されます。また、`./data`ディレクトリ内に`README.md`及び`virus.json`が作成されます。
- `README.md`に記述してあるパスワードをソフトウェアに入力し、「復号!!」ボタンをクリックすることにより暗号化されたファイルが復号化されます。暗号化及び復号化処理にバグがないように気を付けていますが、復号化できない可能性があります。
システムに影響を及ぼす大きな挙動は以上ですが、詳細な挙動はこのプロジェクトのソースコードを確認してください。

## 免責事項
このソフトウェアを使ったことによるいかなる損害や責任は、作者は負わないものとします。
完全な自己責任でお願いします。