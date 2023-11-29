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

1. [Google Apps Script Editor](https://script.google.com/)を開きます。
1. 新しいプロジェクトをクリックします。元々書かれている関数はサンプルなので消してください。
1. [スクリプトの内容](https://raw.githubusercontent.com/nnh/convertMIMETypeOfEMFs/master/dist/code.js)を全て選択してコピーして貼り付け、プロジェクトを保存します。
1. マイドライブに「無題のプロジェクト」が保存されます。変換したいファイルのあるフォルダにこのファイルを移動してください。
1. ダブルクリックでファイルを開き、「実行」をクリックしてください。「このプロジェクトがあなたのデータへのアクセス権限を必要としています。」と言うポップアップメッセージが出た場合、指示に従って権限を確認し、アクセスを許可してください。
