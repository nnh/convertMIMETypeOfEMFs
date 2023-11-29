function betterConvertMIMETypeOfEMFs() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const targetMimeType = 'image/emf';
  const desiredMimeType = 'application/x-msmetafile';
  const query =
    'mimeType != "' +
    desiredMimeType +
    '" and fileExtension = "emf" and modifiedDate > "' +
    oneWeekAgo.toISOString() +
    '"';
  const files = DriveApp.searchFiles(query);
  while (files.hasNext()) {
    const file = files.next();
    const parents = file.getParents();
    if (parents.hasNext()) {
      const folder = parents.next();
      if (
        file.getOwner().getEmail() === 'mariko.ohtsuka@nnh.go.jp' &&
        file.getName() === 'コピーFigure_OS_total.emf'
      ) {
        const test = file.getName();
        console.log(test);
        // Try to get the blob and change MIME type; if error, skip this file
        try {
          const blob = file.getBlob();
          blob.setContentType(desiredMimeType);
          folder.createFile(blob);
        } catch (e) {
          console.log(
            'Error processing file ' + file.getName() + ': ' + e.toString()
          );
          continue; // Skip this file and move to the next one
        }
      }
    }
  }
  /* 

  while (files.hasNext() && count < maxFilesToConvert) {
    var file = files.next();

    // Check if file has parents before attempting to retrieve
    var parents = file.getParents();
    if (parents.hasNext()) {
      var folder = parents.next();
     
      // Try to get the blob and change MIME type; if error, skip this file
      try {
        var blob = file.getBlob();
        blob.setContentType(desiredMimeType);
        folder.createFile(blob);
        count++;
      } catch (e) {
        Logger.log("Error processing file " + file.getName() + ": " + e.toString());
        continue;  // Skip this file and move to the next one
      }
    }
  }

  if (count === 0) {
    Logger.log('No recent EMF files needing conversion were found.');
  } else {
    Logger.log(count + ' recent EMF files converted to desired MIME type.');
  }
*/
}
