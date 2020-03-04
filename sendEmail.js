function sendEmail(emailID,subject,body) {
    var mscLogoUrl = "http://mayapursummercamp.com/wp-content/uploads/2019/03/MSC-Email-Logo.png";
    var mscBlob = UrlFetchApp.fetch(mscLogoUrl).getBlob().setName("mscLogoBlob");
    MailApp.sendEmail(
        {
         to : emailID.toString(),
         subject : subject,
          htmlBody : body,
         inlineImages :
          {
            mscLogo : mscBlob
          }
        });
}
