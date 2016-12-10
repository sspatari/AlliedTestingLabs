/**
 * Created by strongheart on 11/19/16.
 */
if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
}
else {
    xmlhttp = new ActiveXObject("Microsoft.XMLDOM");
}
xmlhttp.open('GET', './official_exchange_rates.xml', false);
xmlhttp.send();
xmlDoc = xmlhttp.responseXML;
console.log(xmlDoc);

x = xmlDoc.getElementsByTagName("Name");
console.log(x);
for (i = 0; i < x.length; ++i) {
    document.write("NumCode : " + xmlDoc.getElementsByTagName("NumCode")[i].childNodes[0].nodeValue + "<br>");
    document.write("CharCode : " + xmlDoc.getElementsByTagName("CharCode")[i].childNodes[0].nodeValue + "<br>");
    document.write("Nominal : " + xmlDoc.getElementsByTagName("Nominal")[i].childNodes[0].nodeValue + "<br>");
    document.write("Name : " + xmlDoc.getElementsByTagName("Name")[i].childNodes[0].nodeValue + "<br>");
    document.write("Value : " + xmlDoc.getElementsByTagName("Value")[i].childNodes[0].nodeValue + "<br><br>");
}
