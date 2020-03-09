/*
* What does this do?
* - Runs accross all the centres and updates their sheet amount and partcipant costs based on the entered data
* - Updates the total cost to be paid by each center in the master sheet
* - Update the participant Count in the Master Sheet
* - Registered : Sheet Link Generated and Mail Sent
*/
function masterUpdate()
{
  var pocs = SpreadsheetApp.openById("https://docs.google.com/spreadsheets/d/1SWZDwZMEB8Ui5hExt6VgEJt1l_J9xgHp0bf1w8hDaE8/edit");
  var pocSheet = pocs.getSheetByName("Form Responses 1");
  var pocLastRow = pocSheet.getLastRow();
  var pocRange = pocSheet.getRange(1, 1, pocLastRow, 22);
  var pocValues = pocRange.getValues();
  var pocProcessedStatus = "No";
  var centerSheetUrl;
  var pCount = {BrC:0,UtC1:0,FC1:0,SC1:0,NC:0,GBVjC:0,GBVsC:0,UC:0,UtC2:0,FC2:0,SC2:0,OC1:0,OC2:0,OC3:0};
  var costs = {AC:0, Prasad:0, Misc:0, Penalty:0};
  var ACCost = 0;
  var PrasadCost = 0;
  var miscCost = 0;
  var Penalty = 0;
  var totalCost = 0;
  var statusObj = [totalCost, pCount, costs];
  for(var z=1; z <pocLastRow ; z++)
  {
    var pocProcessedStatus = pocValues[z][6];
    pCount = {BrC:0,UtC1:0,FC1:0,SC1:0,NC:0,GBVjC:0,GBVsC:0,UC:0,UtC2:0,FC2:0,SC2:0,OC1:0,OC2:0,OC3:0};
    totalCost = 0;
    if( pocProcessedStatus != "Y" && pocProcessedStatus != "Not Coming")
    {
      centerSheetUrl = pocSheet.getRange(z+1,8).getValue();
      //TODO : Add insertValidation
      //TODO : Add validateAndCorrect
      statusObj = calculate(centerSheetUrl);
      pCount = statusObj[1];
      costs = statusObj[2];
      pocSheet.getRange(z+1,9).setValue(statusObj[0]);
      pocSheet.getRange(z+1,11).setValue(pCount.BrC);
      pocSheet.getRange(z+1,12).setValue(pCount.UtC1);
      pocSheet.getRange(z+1,13).setValue(pCount.FC1);
      pocSheet.getRange(z+1,14).setValue(pCount.SC1);
      pocSheet.getRange(z+1,15).setValue(pCount.NC);
      pocSheet.getRange(z+1,16).setValue(pCount.UC);
      pocSheet.getRange(z+1,17).setValue(pCount.GBVjC);
      pocSheet.getRange(z+1,18).setValue(pCount.GBVsC);
      pocSheet.getRange(z+1,19).setValue(pCount.UtC2);
      pocSheet.getRange(z+1,20).setValue(pCount.FC2);
      pocSheet.getRange(z+1,21).setValue(pCount.SC2);
      pocSheet.getRange(z+1,22).setValue(pCount.OC1);
      pocSheet.getRange(z+1,23).setValue(pCount.OC2);
      pocSheet.getRange(z+1,24).setValue(pCount.OC3);
      ACCost = ACCost + costs.AC;
      PrasadCost = PrasadCost + costs.Prasad;
      miscCost = miscCost + costs.Misc;
      Penalty = Penalty + costs.Penalty;
    }
    else
    {
        pocSheet.getRange(z+1,9).setValue(statusObj[0]);
        pocSheet.getRange(z+1,11).setValue(pCount.BrC);
        pocSheet.getRange(z+1,12).setValue(pCount.UtC1);
        pocSheet.getRange(z+1,13).setValue(pCount.FC1);
        pocSheet.getRange(z+1,14).setValue(pCount.SC1);
        pocSheet.getRange(z+1,15).setValue(pCount.NC);
        pocSheet.getRange(z+1,16).setValue(pCount.UC);
        pocSheet.getRange(z+1,17).setValue(pCount.GBVjC);
        pocSheet.getRange(z+1,18).setValue(pCount.GBVsC);
        pocSheet.getRange(z+1,19).setValue(pCount.UtC2);
        pocSheet.getRange(z+1,20).setValue(pCount.FC2);
        pocSheet.getRange(z+1,21).setValue(pCount.SC2);
        pocSheet.getRange(z+1,22).setValue(pCount.OC1);
        pocSheet.getRange(z+1,23).setValue(pCount.OC2);
        pocSheet.getRange(z+1,24).setValue(pCount.OC3);
    }
    Logger.log("AC Cost " +ACCost+" Prasad Cost "+PrasadCost+" Misc Cost "+miscCost+" Penalty "+Penalty);
 }
}