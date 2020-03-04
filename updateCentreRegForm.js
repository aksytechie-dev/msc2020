/*
* Centre List is a drop Down in the registration form. ID for this element is : 243205282
* List of centres are here : https://docs.google.com/spreadsheets/d/1djfyrBr5Sn4dQPg7eD_WAew1TU-r7cpqEsK-5xdunwc/edit#gid=0
* Form : https://docs.google.com/forms/d/1KXK6GpQHSSSky3OhJashIe0arTb8MNOgyUmGP-4-2ao/edit
* First Column is all the centres, second column is the total centres registered, third column is the centres remaining so this should be our target list
*/
function updateCentreRegForm() {
  var centresList = SpreadsheetApp.openById('1djfyrBr5Sn4dQPg7eD_WAew1TU-r7cpqEsK-5xdunwc');
  var listSheet = centresList.getSheetByName("List");
  var centreRange = listSheet.getRange(1, 3, 150);
  var centreValues = centreRange.getValues();
  var centreValueArray = [];
  for (i=0; i<150 ;i++)
  {
    if(centreValues[i][0] != "")
      centreValueArray[i] = centreValues[i][0];
  } 
  var regForm = FormApp.openById('1KXK6GpQHSSSky3OhJashIe0arTb8MNOgyUmGP-4-2ao');
  var dropDown = regForm.getItemById(243205282).asListItem();
  dropDown.setChoiceValues(centreValueArray);
}
