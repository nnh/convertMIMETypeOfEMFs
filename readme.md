# EMFファイルのMIMEタイプ変換スクリプト

## 概要

このスクリプトは、指定されたGoogle Driveフォルダ内のEMF（Enhanced Metafile）ファイルのMIMEタイプを`application/x-msmetafile`に変換します。  
CloudConvertでemfファイルに変換した際、Google図形描画で開くことができない事象に対する暫定対応のスクリプトです。

## 動作原理

スクリプトは以下の手順を実行します：

1. スクリプトが格納されている親フォルダ内のすべてのファイルを反復処理します。
1. ファイルの拡張子を基にEMFファイルを識別します。
1. 各EMFファイルのMIMEタイプが`application/x-msmetafile`でも`application/vnd.google-apps.drawing`でもない場合、MIMEタイプを`application/x-msmetafile`に変換した新しいファイルを保存します。
1. 処理中にエラーが発生した場合は、ファイルをスキップします。

## 使用方法

1. Googleドライブで「EMFファイル変換」を検索し、検索結果の中から「EMFファイル変換」という名前のGoogleスプレッドシートを開いてください。見つからない場合はチャットの「情報システム問い合わせ(ISR)」までご連絡ください。
1. 「使用方法」シートの記載を参照して処理を実行してください。不明点等ありましたらチャットの「情報システム問い合わせ(ISR)」までご連絡ください。
