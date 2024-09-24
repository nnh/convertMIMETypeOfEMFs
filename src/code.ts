function getFileExtension_(file: GoogleAppsScript.Drive.File): string {
  // Split the filename with a half-width period and get the last element (extension).
  return file
    .getName()
    .split('.')
    .filter((_, idx, arr) => idx === arr.length - 1)[0];
}
function convertMIMETypeOfEMFs_(): string[] {
  const emfExtension: string = 'emf';
  const desiredMimeType: string = 'application/x-msmetafile';
  const drawingMimeType: string = 'application/vnd.google-apps.drawing';
  const results: string[] = [];
  const timestamp: string = new Date().toLocaleString();
  results.push(`Start time: ${timestamp}`);
  // Get the folder where the script is stored.
  const thisFileId: string = SpreadsheetApp.getActiveSpreadsheet().getId();
  const folder: GoogleAppsScript.Drive.Folder = DriveApp.getFileById(thisFileId)
    .getParents()
    .next();
  const files: GoogleAppsScript.Drive.FileIterator = folder.getFiles();
  while (files.hasNext()) {
    const file: GoogleAppsScript.Drive.File = files.next();
    if (
      getFileExtension_(file) === emfExtension &&
      file.getMimeType() !== desiredMimeType &&
      file.getMimeType() !== drawingMimeType
    ) {
      // Try to get the blob and change MIME type; if error, skip this file.
      try {
        const blob: GoogleAppsScript.Base.Blob = file.getBlob();
        blob.setContentType(desiredMimeType);
        folder.createFile(blob);
        results.push(`Successfully converted: ${file.getName()}`);
      } catch (e: unknown) {
        if (e instanceof Error) {
          results.push(`Error name: ${e.name}`);
          results.push(`Error message: ${e.message}`);
          results.push(`Stack trace: ${e.stack}`);
        } else {
          results.push(`Unexpected error: ${e}`);
        }
        continue;
      }
    }
  }
  if (results.length === 1) {
    results.push(`No EMF files to convert. folder URL: ${folder.getUrl()}`);
  }
  return results; // 処理結果の配列を返す
}
function main(): void {
  const results: string[] = convertMIMETypeOfEMFs_();
  const outputSheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('変換結果');
  if (outputSheet === null) {
    throw new Error('変換結果シートが見つかりません。');
  }
  outputSheet.clear();
  outputSheet
    .getRange(1, 1, results.length, 1)
    .setValues(results.map(e => [e]));
}
function onOpen(): void {
  SpreadsheetApp.getUi()
    .createMenu('EMFファイル変換')
    .addItem('実行', 'main')
    .addToUi();
}
