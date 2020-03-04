function registerParticipant() {
  var pocs = SpreadsheetApp.openById('1SWZDwZMEB8Ui5hExt6VgEJt1l_J9xgHp0bf1w8hDaE8');
  var pocSheet = pocs.getSheetByName("Form Responses 1");
  var pocLastRow = pocSheet.getLastRow();
  var pocRange = pocSheet.getRange(pocLastRow,1, pocLastRow,8);
  var pocValues = pocRange.getValues();
  var pocEmail = pocValues[pocLastRow-1][1];
  var pocName = pocValues[pocLastRow-1][2];
  var centreName = pocValues[pocLastRow-1][4];
  var centerNumber = 200000 + 50*(pocLastRow-2);
  var pocSheetId = createParticipantSheet(pocEmail, centreName, centerNumber);
  var pocSheetLink = "https://docs.google.com/spreadsheets/d/" + pocSheetId+"/edit";
  var centreID = "M"+ toString(centerNumber);
  pocSheet.getRange(pocLastRow, 6).setValue(centreID);
  pocSheet.getRange(pocLastRow, 8).setValue(pocSheetLink);
}

function createParticipantSheet(pocEmail, centreName, centerNumber) {
  var referenceSheetId = "1FAb0GdFmz3oYgyCI70sHilRAzrAhD3FCD0COxbpTTPY";
  DriveApp.getFileById(referenceSheetId.toString()).makeCopy(centreName);
  var fileIterator = DriveApp.getFilesByName(centreName.toString());
  var sheetId;
  while(fileIterator.hasNext())
  {
    sheetId = fileIterator.next().getId();
    Logger.log("Sheet Id "+sheetId);
  }
  Logger.log(sheetId);
  var pSheet = SpreadsheetApp.openById(sheetId.toString());
  var sheet = cSheet.getSheetByName("List");
  pSheet.addEditor(pocEmail.toString());
  for(j=1;j<50;j++)
  {
    sheet.getRange(j+1,1).setValue("M"+String(++centerNumber));
  }
  return sheetId;
}
