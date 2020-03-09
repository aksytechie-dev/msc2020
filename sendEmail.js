function sendEmail(emailID,subject,body) {
    var mscLogoUrl = "http://mayapursummercamp.com/wp-content/uploads/2019/03/MSC-Email-Logo.png";
    var mscBlob = UrlFetchApp.fetch(mscLogoUrl).getBlob().setName("mscLogoBlob");
  GmailApp.sendEmail(emailID,subject,body.toString(), {inlineImages : {mscLogo : mscBlob }, htmlBody:body});
}