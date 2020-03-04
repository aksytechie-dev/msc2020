/* Since while filling the sheet devotees are copying the columns, so this paricular will apply validation accross Four Fields
1. Camp 1
2. Camp 2
3. Camp 3
4. First Meal Type
*/

function insertVal() {
    var master = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1FAb0GdFmz3oYgyCI70sHilRAzrAhD3FCD0COxbpTTPY/edit');
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
