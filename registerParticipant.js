function registerParticipant() {
  var pocs = SpreadsheetApp.openById('1SWZDwZMEB8Ui5hExt6VgEJt1l_J9xgHp0bf1w8hDaE8');
  var pocSheet = pocs.getSheetByName("Form Responses 1");
  var pocLastRow = pocSheet.getLastRow();
  var pocRange = pocSheet.getRange(pocLastRow,1, pocLastRow,8);
  var pocValues = pocRange.getValues();
  var pocEmail = pocValues[0][1];
  var pocName = pocValues[0][2];
  var centreName = pocValues[0][4];
  var centerNumber = 200000 + 50*(pocLastRow-2);
  var pocSheetId = createParticipantSheet(pocEmail, centreName, centerNumber);
  var pocSheetLink = "https://docs.google.com/spreadsheets/d/" + pocSheetId+"/edit";
  var centreID = "M"+ centerNumber.toString();
  Logger.log("Center ID "+centreID+" Sheet Link "+pocSheetLink);
  pocSheet.getRange(pocLastRow, 6).setValue(centreID);
  pocSheet.getRange(pocLastRow, 8).setValue(pocSheetLink);
  var subject = "Maypur Summer Camp Registration";
  var body = "Hare Krishna, <br><br>"+"Thank you for registration. Your Center Registration Id is : "
          +centreID+".<br> <b> Participant Details are required to be filled here </b> "+pocSheetLink+" "
          +"<br> For guidance on how to fill the details please see : http://mayapursummercamp.com/sheet-fill"
          +" For any further details please check our website www.mayapursummercamp.com <br>"
          +"For further queries please reach out to us through the contact details on our website. <br>"+"Our Team will keep you notified of important dates. <br>"
          +"In Your Service, <br>"+"Mayapur Summer Camp Registration Team<br><img src='cid:mscLogo' width='128'>";
  sendEmail(pocEmail,subject,body);
  pocSheet.getRange(pocLastRow, 7).setValue("Registered");
}

function createParticipantSheet(pocEmail, centreName, centerNumber) {
  var referenceSheetId = "1FAb0GdFmz3oYgyCI70sHilRAzrAhD3FCD0COxbpTTPY";
  var newFile = DriveApp.getFileById(referenceSheetId.toString()).makeCopy(centreName);
  var fileIterator = DriveApp.getFilesByName(centreName.toString());
  var sheetId = newFile.getId();
  Logger.log(sheetId);
  var pSheet = SpreadsheetApp.openById(sheetId.toString());
  var sheet = pSheet.getSheetByName("List");
  pSheet.addEditor(pocEmail.toString());
  pSheet.addEditor("mscreg.2k20@gmail.com")
  for(j=1;j<50;j++)
  {
    sheet.getRange(j+1,1).setValue("M"+String(++centerNumber));
  }
  return sheetId;
}
