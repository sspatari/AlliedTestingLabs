/**
 * Created by strongheart on 11/19/16.
 */
if (window.XMLHttpRequest) {
    xobj = new XMLHttpRequest();
}
else {
    xobj = new ActiveXObject("Microsoft.XMLDOM");
}
xobj.overrideMimeType("application/json")
xobj.open('GET', './official_exchange_rates.json', false);
xobj.send();
jsonDoc = xobj.responseText;


myJsonData = JSON.parse(jsonDoc);
valuteArray = myJsonData.ValCurs.Valute;
document.write("Output from Json:" + "<br>");
for (i = 0; i < valuteArray.length; ++i) {
    document.write("NumCode : " + valuteArray[i].NumCode + "<br>");
    document.write("CharCode : " + valuteArray[i].CharCode + "<br>");
    document.write("Nominal : " + valuteArray[i].Nominal + "<br>");
    document.write("Name : " + valuteArray[i].Name + "<br>");
    document.write("Value : " + valuteArray[i].Value + "<br><br>");
}