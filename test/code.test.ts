function testMain() {
  deleteOutputFiles();
  main();
}

function deleteOutputFiles() {
  try {
    const thisFileId: string = SpreadsheetApp.getActiveSpreadsheet().getId();
    const folder: GoogleAppsScript.Drive.Folder = DriveApp.getFileById(
      thisFileId
    )
      .getParents()
      .next();
    const files: GoogleAppsScript.Drive.FileIterator = folder.getFiles();
    let deletedFiles: boolean = false;
    while (files.hasNext()) {
      const file: GoogleAppsScript.Drive.File = files.next();

      if (file.getMimeType() === 'application/x-msmetafile') {
        console.log('削除対象ファイル: ' + file.getName());
        file.setTrashed(true); // ゴミ箱に移動
        deletedFiles = true;
      }
    }

    if (!deletedFiles) {
      console.log('指定されたMIMEタイプのファイルはフォルダ内に存在しません。');
    } else {
      console.log('指定されたMIMEタイプのファイルの削除が完了しました。');
    }

    console.log('削除が完了しました。');
  } catch (e: any) {
    console.error('エラーが発生しました: ' + e.message);
  }
}
