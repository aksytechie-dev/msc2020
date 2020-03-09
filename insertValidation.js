/* Since while filling the sheet devotees are copying the columns, so this paricular will apply validation accross Four Fields
1. Camp 1
2. Camp 2
3. Camp 3
4. First Meal Type
*/

function insertVal(sheetUrl) {
    var master = SpreadsheetApp.openByUrl(sheetUrl);
    var list = master.getSheetByName("List");
    var fmval = master.getSheetByName("FMVal");
    var c1val = master.getSheetByName("CampVal");
    var c2val = master.getSheetByName("Camp2Val");
    var c3val = master.getSheetByName("Camp3Val");
    var ref= master.getSheetByName("Ref");
    
    //Participant Type
    for(var i=1;i<50;i++)
    {
        var cellArr = list.getRange(i+1,4);
        var rangeArr = ref.getRange(2,8,3,1);
        var ruleArr = SpreadsheetApp.newDataValidation().requireValueInRange(rangeArr).build();
        cellArr.setDataValidation(ruleArr);
    }
    
    //First Meal Date
    for(var i=1;i<50;i++)
    {
        var cellArr = list.getRange(i+1,8);
        var rangeArr = ref.getRange(2,2,16,1);
        var ruleArr = SpreadsheetApp.newDataValidation().requireValueInRange(rangeArr).build();
        cellArr.setDataValidation(ruleArr);
    }

    //First Meal Type
    for(var i=1;i<50;i++)
    {
        var cellArr = list.getRange(i+1,9);
        var rangeArr = fmval.getRange(i,3,1,3);
        var ruleArr = SpreadsheetApp.newDataValidation().requireValueInRange(rangeArr).build();
        cellArr.setDataValidation(ruleArr);
    }

    //Last Meal Date
    for(var i=1;i<50;i++)
    {
        var cellArr = list.getRange(i+1,12);
        var rangeArr = ref.getRange(2,3,16,1);
        var ruleArr = SpreadsheetApp.newDataValidation().requireValueInRange(rangeArr).build();
        cellArr.setDataValidation(ruleArr);
    }

    //Last Meal Type
    for(var i=1;i<50;i++)
    {
        var cellArr = list.getRange(i+1,13);
        var rangeArr = ref.getRange(2,1,3,1);
        var ruleArr = SpreadsheetApp.newDataValidation().requireValueInRange(rangeArr).build();
        cellArr.setDataValidation(ruleArr);
    }

    //Arrival Date
    for(var i=1;i<50;i++)
    {
        var cellArr = list.getRange(i+1,10);
        var rangeArr = ref.getRange(2,2,16,1);
        var ruleArr = SpreadsheetApp.newDataValidation().requireValueInRange(rangeArr).build();
        cellArr.setDataValidation(ruleArr);
    }

    //Arrival Time
    for(var i=1;i<50;i++)
    {
        var cellArr = list.getRange(i+1,11);
        var rangeArr = ref.getRange(2,4,96,1);
        var ruleArr = SpreadsheetApp.newDataValidation().requireValueInRange(rangeArr).build();
        cellArr.setDataValidation(ruleArr);
    }

    //Departure Date
    for(var i=1;i<50;i++)
    {
        var cellArr = list.getRange(i+1,14);
        var rangeArr = ref.getRange(2,3,16,1);
        var ruleArr = SpreadsheetApp.newDataValidation().requireValueInRange(rangeArr).build();
        cellArr.setDataValidation(ruleArr);
    }

    //Departure Time
    for(var i=1;i<50;i++)
    {
        var cellArr = list.getRange(i+1,15);
        var rangeArr = ref.getRange(2,4,96,1);
        var ruleArr = SpreadsheetApp.newDataValidation().requireValueInRange(rangeArr).build();
        cellArr.setDataValidation(ruleArr);
    }

     //Camp 1 
    for(var i=1;i<50;i++)
    {
        var cellArr = list.getRange(i+1,5);
        var rangeArr = c1val.getRange(i,4,1,7);
        var ruleArr = SpreadsheetApp.newDataValidation().requireValueInRange(rangeArr).build();
        cellArr.setDataValidation(ruleArr);
    }
    
    //Camp 2 
    for(var i=1;i<50;i++)
    {
        var cellArr = list.getRange(i+1,6);
        var rangeArr = c2val.getRange(i,4,1,6);
        var ruleArr = SpreadsheetApp.newDataValidation().requireValueInRange(rangeArr).build();
        cellArr.setDataValidation(ruleArr);
    }

    //Camp 3 
    for(var i=1;i<50;i++)
    {
        var cellArr = list.getRange(i+1,7);
        var rangeArr = c3val.getRange(i,4,1,6);
        var ruleArr = SpreadsheetApp.newDataValidation().requireValueInRange(rangeArr).build();
        cellArr.setDataValidation(ruleArr);
    }
}

function validateAndCorrect(sheetUrl)
{
    var master = SpreadsheetApp.openByUrl(sheetUrl);
    var list = master.getSheetByName("List");
    var listLastRow = master.getLastRow();
    var listRange = list.getRange(1, 1, listLastRow, 15);
    var listValues = listRange.getValues();
    for(var i=1; i<listLastRow; i++)
    {
        var fmDate = new Date((listValues[i][7]).toString());
        var lmDate = new Date((listValues[i][11]).toString());
        var fmType = listValues[i][8];
        //First Meal Date is less than 21 TODO : Shift to 21 and Meal Type Breakfast
        if(fmDate.getDate() < 21 && fmDate.getDate() > 7)
        {    
            list.getRange(i+1,8).setValue("21/05/2020");
            list.getRange(i+1,9).setValue("Dinner");
        }
        //First Meal Date is 21 and Meal Type is not Dinner : Shift Meal Type to Dinner
        if(fmDate.getDate() == 21 && fmType != "Dinner")
        {
            list.getRange(i+1,9).setValue("Dinner");
        }
        //Last Meal Date is Beyond 7 June : Shift to 7 June and Meal Type Dinner
        if(lmDate.getDate() > 7 && lmDate.getDate() < 20)
        {
            list.getRange(i+1,12).setValue("7/06/2020");
            list.getRange(i+1,13).setValue("Dinner")
        }
    }
}
