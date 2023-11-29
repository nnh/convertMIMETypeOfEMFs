function getFileExtension_(file) {
  // Split the filename with a half-width period and get the last element (extension).
  return file
    .getName()
    .split('.')
    .filter((_, idx, arr) => idx === arr.length - 1)[0];
}
function convertMIMETypeOfEMFs() {
  const emfExtension = 'emf';
  const desiredMimeType = 'application/x-msmetafile';
  const drawingMimeType = 'application/vnd.google-apps.drawing';
  // Get the folder where the script is stored.
  const folder = DriveApp.getFileById(ScriptApp.getScriptId())
    .getParents()
    .next();
  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    if (
      getFileExtension_(file) === emfExtension &&
      file.getMimeType() !== desiredMimeType &&
      file.getMimeType() !== drawingMimeType
    ) {
      // Try to get the blob and change MIME type; if error, skip this file.
      try {
        console.log(`convert MimeType :${file.getName()}`);
        console.log(file.getMimeType());
        const blob = file.getBlob();
        blob.setContentType(desiredMimeType);
        folder.createFile(blob);
      } catch (e) {
        console.log(`Error processing file${file.getName()}: ${e.toString()}`);
        continue; // Skip this file and move to the next one.
      }
    }
  }
}
