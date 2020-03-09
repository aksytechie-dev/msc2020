/*
Calculates the required values for all the new entries
First Concerned sheet is the filled up sheet
1. Camp ID
2. Name
3. Contact Number
4. Particpant Type
5. Camp 1
6. Camp 2
7. Camp 3
8. First Meal Date
9. First Meal Type
10. Arrival Date
11. Arrival Time
12. Last Meal Date
13. Last Meal Type
14. Departure Date
15. Departure Time

Calculation Part
Per Day Misc Charge for Each Camp : 80
Per Day Prasadam Charge : 175 [45,90,40]
For Utkarsha : If Attending 1-6 Days AC Charges are Linear, Post That it is Fixed: 600
For BRC No Camp Cost, No Prasdam Cost
For Facilitators only Prasdam Charges
*/

function calculate(sheetUrl)
{
  var cSheetMain = SpreadsheetApp.openByUrl(sheetUrl);
  var cSheet = cSheetMain.getSheetByName("List");
  var cSheetLastRow = cSheet.getLastRow();
  var cSheetRange = cSheet.getRange(1, 1, cSheetLastRow, 26);
  var cSheetValues = cSheetRange.getValues();

  var totalDays;
  const perDayPRASAD = 175;
  const perDayMISC = 80;
  var fmDate;
  var lmDate;
  var firstMeal;
  var lastMeal;
  var participantType;
  var name;
  var camp1;
  var camp2;
  var camp3;
  var camp1SD = new Date("5/22/2020");
  var camp1ED = new Date("5/28/2020");
  var camp2SD = new Date("5/29/2020");
  var camp2ED = new Date("5/31/2020");
  var camp3SD = new Date("6/01/2020");
  var camp3ED = new Date("6/07/2020");
  var camp1CD=0;
  var camp2CD=0;
  var camp3CD=0;
  var totalCost=0;
  var prasadamReqd = cSheetValues[9][17];
  var pCount = {BrC:0,UtC1:0,FC1:0,SC1:0,NC:0,GBVjC:0,GBVsC:0,UC:0,UtC2:0,FC2:0,SC2:0,OC1:0,OC2:0,OC3:0};
  var costs = {AC:0, Prasad:0, Misc:0, Penalty:0};
  var i=1;
  var pid = (cSheetValues[i][0]).toString();
  var code;
  var arrDayCost;
  var depDayCost;
  pid = pid.slice(1,7);
  var cid = pid - 1;
  var penalty;
  //Runs Through all the Partipants in the sheet and Calculates the Cost to be paid By Each Participant and add it to the TotalCost
  for(i=1;i<cSheetLastRow;i++)
  {
    var participantCost=0;
    participantType = cSheetValues[i][3];
    name = cSheet.getRange(i+1,2);
    camp1 = cSheetValues[i][4];
    camp2 = cSheetValues[i][5];
    camp3 = cSheetValues[i][6];
    firstMeal = cSheetValues[i][8];
    penalty = cSheetValues[i][24];
    fmDate = new Date((cSheetValues[i][7]).toString());
    lastMeal = cSheetValues[i][12];
    lmDate = new Date((cSheetValues[i][11]).toString());
    code = cSheetValues[i][25];
    if(participantType == "" || camp1 == "" || camp2 == "")
      continue;
    else if ((firstMeal == "" || fmDate == "" || lastMeal =="" || lmDate =="") && code != "C")
    {
      computeCount(participantType,camp1,camp2,camp3,pCount);
      continue;
    }
    else if(code =="C" && prasadamReqd == "No")
    {
      participantCost = 100;
      var acCost=0;
      if(penalty != "")
      {
        participantCost = participantCost + penalty;
        costs.Penalty = costs.Penalty + penalty;
      }
      costs.Penalty = costs.Penalty + participantCost;
      //TODO : If AC Cost collected has to be charged even after cancellation, add code here
      costs.AC = costs.AC + acCost;
      cSheet.getRange(i+1, 16).setValue(participantCost);
      totalCost = totalCost + participantCost;
      continue;
    }
    else if(code == "C")
    {
      participantCost = 200;
      var acCost=0;
      if(penalty != "")
      {
        participantCost = participantCost + penalty;
        costs.Penalty = costs.Penalty + penalty;
      }
      costs.Penalty = costs.Penalty + participantCost;
      //TODO : If AC Cost collected has to be charged even after cancellation, add code here 
      costs.AC = costs.AC + acCost;
      cSheet.getRange(i+1, 15).setValue(participantCost);
      totalCost = totalCost + participantCost;
      continue;
    }
    else if(code == "PC" && prasadamReqd == "No")
    {
      if(penalty != "")
       participantCost = participantCost + penalty;
      participantCost = participantCost + 100;
      costs.Penalty = costs.Penalty + participantCost;
    }
    else if(code == "PC")
    {
      if(penalty != "")
       participantCost = participantCost + penalty;
      participantCost = participantCost + 200;
      costs.Penalty = costs.Penalty + participantCost;
    }
    else if(code == "LRM" || code == "LR")
    {
      if(penalty != "")
       participantCost = participantCost + penalty;
      participantCost = participantCost + 100;
      costs.Penalty = costs.Penalty + participantCost;
    }
    else if(code == "B" && penalty != "") //TODO: What is B?
    {
      participantCost = participantCost + penalty;
      costs.Penalty = costs.Penalty + participantCost;
    }
    else if(code == "" && penalty !="")
    {
      participantCost = participantCost + penalty;
      costs.Penalty = costs.Penalty + participantCost;
    }
    //The Below Block gives the no Of Days Excluding the arrival and Departure Date
    var timeDiff = Math.abs(lmDate.getTime() - fmDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    var mealDays = diffDays - 1;

    if(fmDate<= camp1ED && lmDate >= camp3SD)
    {
      timeDiff = Math.abs(camp1ED.getTime() - fmDate.getTime());
      diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      camp1CD = diffDays + 1;
      camp2CD = 3;
      timeDiff = Math.abs(lmDate.getTime() - camp3SD.getTime());
      diffDays = Math.ceil(timeDiff/ (1000 * 3600 * 24));
      camp3CD = diffDays + 1;
    }
    else if(fmDate <=camp2ED && lmDate >= camp3SD)
    {
      camp1CD = 0; 
      timeDiff = Math.abs(camp2ED.getTime() - fmDate.getTime());
      diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      camp2CD = diffDays + 1;
      timeDiff = Math.abs(lmDate.getTime() - camp3SD.getTime());
      diffDays = Math.ceil(timeDiff/ (1000 * 3600 * 24));
      camp3CD = diffDays + 1;
    }
    else if(fmDate <= camp1ED && lmDate >= camp2SD )
    {
      timeDiff = Math.abs(camp1ED.getTime() - fmDate.getTime());
      diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      camp1CD = diffDays + 1;
      timeDiff = Math.abs(lmDate.getTime() - camp2SD.getTime());
      diffDays = Math.ceil(timeDiff/ (1000 * 3600 * 24));
      camp2CD = diffDays + 1;
      camp3CD = 0;
    }
    else
    {
      timeDiff = Math.abs(lmDate.getTime() - fmDate.getTime());
      diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if(lmDate <= camp1ED)
      {
        camp1CD = diffDays + 1;
        camp2CD = 0;
        camp3CD = 0;
      }
      else if (lmDate <= camp2ED)
      {
        camp1CD = 0;
        camp2CD = diffDays + 1;  
        camp3CD = 0;
      }
      else
      {
         camp1CD = 0;
         camp2CD = 0;
         camp3CD = diffDays + 1; 
      } 
    }
    if(fmDate.getDate() == 21) //Since on 21 There is no Camp so Misc Cost shoudn't be applied.
      camp1CD = camp1CD - 1;
    Logger.log(" Camp 1 Cost Days "+camp1CD+" Camp 2 Cost Days " +camp2CD + " Camp 3 Cost Days "+camp3CD );

    arrDayCost = computeSpillCostOld(firstMeal,0);
    depDayCost = computeSpillCostOld(lastMeal,1);

    var prasadCost=0;
    var miscCost=0;
    var ACCost=0;

    if(prasadamReqd == "No")
    {
      arrDayCost = 0;
      depDayCost = 0;
      mealDays = 0;
    }
    if(participantType == "Brahmacari")
    {
      participantCost = participantCost + 0;
      pCount.BrC = ++pCount.BrC;
    }
    else if(participantType == "Camp Participant" || participantType == "Facilitator")
    {
      prasadCost = mealDays*perDayPRASAD;
      prasadCost = prasadCost + arrDayCost;
      prasadCost = prasadCost + depDayCost;
      switch(camp1)
      {
        case "Utkarsha 1":
          if(camp1CD < 6)
            ACCost = ACCost + camp1CD*100;
          else
            ACCost = ACCost + 600;
          pCount.UtC1 = ++pCount.UtC1;  
          break;  
        case "FEC 1":
          pCount.FC1= ++pCount.FC1;
          break;
        case "Sharnagati 1":
          pCount.SC1 = ++pCount.SC1;
          break;
        case "Nistha":
          pCount.NC = ++pCount.NC;
          break;
        case "Not Present":
          camp1CD=0;
          break;
        case "Facilitator" :
        case "Available for Services":
        case "Present":
          camp1CD=0; 
          pCount.OC1 = ++pCount.OC1; //Those who are present during Camp 1 but not attending
        break;
      }
      miscCost = miscCost + camp1CD*80;
      switch(camp2)
      {
        case "Utsah":
          ACCost = ACCost + camp2CD * 100;
          pCount.UC = ++pCount.UC;
          break;
        case "GBV (2nd & 3rd Yr)":
          pCount.GBVjC = ++pCount.GBVjC;
          break;
        case "GBV (4th Yr, Working)":
          pCount.GBVsC = ++pCount.GBVsC;
          break;
        case "Not Present":
          camp2CD=0;
          break;
        case "Facilitator" :
        case "Available for Services":
        case "Present":
          camp2CD=0;
          pCount.OC2 = ++pCount.OC2; //Those who are present during Camp 2 but not attending
        break;
      }
      miscCost = miscCost + camp2CD*80;
      switch(camp3)
      {
        case "Utkarsha 2":
          if(camp3CD < 6)
            ACCost = ACCost + camp1CD*100;
          else
            ACCost = ACCost + 600;
          pCount.UtC2 = ++pCount.UtC2;  
          break;  
        case "FEC 2":
          pCount.FC2= ++pCount.FC2;
          break;
        case "Sharnagati 2":
          pCount.SC2 = ++pCount.SC2;
          break;
        case "Not Present":
          camp3CD=0;
          break;
        case "Facilitator" :
        case "Available for Services":
        case "Present":
          camp3CD=0; 
          pCount.OC3 = ++pCount.OC3; //Those who are present during Camp 3 but not attending
        break;
      }
      miscCost = miscCost + camp3CD*80;
    }
    participantCost = participantCost+ prasadCost + miscCost + ACCost;
    totalCost = totalCost + participantCost;
    Logger.log("Prasad Cost "+prasadCost+" Arr Day Cost" + fmDate+" Dep Day Cost"+lmDate+" Misc Cost " + miscCost + " ACCost "+ACCost+" Participant Cost"+participantCost);
    cSheet.getRange(i+1, 16).setValue(participantCost);
    costs.AC = costs.AC + ACCost;
    costs.Prasad = costs.Prasad + prasadCost;
    costs.Misc = costs.Misc + miscCost;
  }
  cSheet.getRange(9,18).setValue(totalCost);
  var rObj = [totalCost,pCount, costs];
  return rObj;
}

function computeSpillCost(MealType,columnKey)
  {
    var costArray = [[175,45],[130,135],[40,175]];
    var rowKey = 0 ;
    if(MealType == "Breakfast")
      rowKey = 0;
    else if(MealType == "Lunch")
      rowKey = 1;
    else if(MealType == "Dinner")
      rowKey = 2;
    return dayCost = costArray[rowKey][columnKey];
  }

function computeCount(participantType,camp1,camp2,camp3,pCount)
{
  if(participantType == "Brahmacari")
    {
      pCount.BrC = ++pCount.BrC;
    }
    else if(participantType == "Camp Participant" || participantType == "Facilitator")
    {
      switch(camp1)
      {
        case "Utkarsha 1":
          pCount.UtC1 = ++pCount.UtC1;  
          break;  
        case "FEC 1":
          pCount.FC1= ++pCount.FC1;
          break;
        case "Sharnagati 1":
          pCount.SC1 = ++pCount.SC1;
          break;
        case "Nistha":
          pCount.NC = ++pCount.NC;
          break;
        case "Not Present":
          camp1CD=0;
          break;
        case "Facilitator" :
        case "Available for Services":
        case "Present":
          camp1CD=0; 
          pCount.OC1 = ++pCount.OC1; //Those who are present during Camp 1 but not attending
        break;
      }
      switch(camp2)
      {
        case "Utsah":
          pCount.UC = ++pCount.UC;
          break;
        case "GBV (2nd & 3rd Yr)":
          pCount.GBVjC = ++pCount.GBVjC;
          break;
        case "GBV (4th Yr, Working)":
          pCount.GBVsC = ++pCount.GBVsC;
          break;
        case "Not Present":
          camp2CD=0;
          break;
        case "Facilitator" :
        case "Available for Services":
        case "Present":
          camp2CD=0;
          pCount.OC2 = ++pCount.OC2; //Those who are present during Camp 2 but not attending
        break;
      }
      switch(camp3)
      {
        case "Utkarsha 2":
          pCount.UtC2 = ++pCount.UtC2;  
          break;  
        case "FEC 2":
          pCount.FC2= ++pCount.FC2;
          break;
        case "Sharnagati 2":
          pCount.SC2 = ++pCount.SC2;
          break;
        case "Not Present":
          camp3CD=0;
          break;
        case "Facilitator" :
        case "Available for Services":
        case "Present":
          camp3CD=0; 
          pCount.OC3 = ++pCount.OC3; //Those who are present during Camp 3 but not attending
        break;
      }
   }
}