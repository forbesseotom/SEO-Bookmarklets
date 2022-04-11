javascript:(function()%7Blet links %3D document.querySelectorAll("nav a")%3Blet arrayOfBrokenURLs %3D %5B%5D%3Blet consoleMessage %3D %5B%5D%3Bwindow.copyMessage %3D %5B%5D%3Basync function processLinks(linksArray) %7Bfor (const link of linksArray) %7Bif (link.href) %7Bawait testLink(link)%3B%7D%7Dif (arrayOfBrokenURLs.length) %7BarrayOfBrokenURLs.forEach((brokenLink) %3D> %7BcopyMessage.push(%60%5Cn Anchor%3A %24%7BbrokenLink.innerText%7D - Href%3A %24%7BbrokenLink.href%7D %60)%3BconsoleMessage.push(%60%5Cn Anchor%3A %24%7BbrokenLink.innerText%7D - Href%3A %24%7BbrokenLink.href%7D%60)%3B%7D)%3Bconsole.log(consoleMessage)%3BcreateButton()%3B%7D%7Dasync function testLink(link) %7Blet request %3D new Request(link)%3Blet headers %3D new Headers(%7B "User-Agent"%3A "MY-UA-STRING" %7D)%3Btry %7Bawait fetch(request%2C %7Bmethod%3A "GET"%2Cheaders%3A headers%2C%7D).then((response) %3D> %7Bif (response.ok %26%26 response.redirected %3D%3D false) %7Blink.style.color %3D "green"%3B%7D else %7Blink.style.color %3D "red"%3BarrayOfBrokenURLs.push(link)%3B%7D%7D)%3B%7D catch (e) %7Bconsole.log(e)%3B%7D%7Dif(!window.copyToClipboard)%7Bwindow.copyToClipboard %3D function(str)%7Bconst el %3D document.createElement("textarea")%3Bel.value %3D str%3Bdocument.body.appendChild(el)%3Bel.select()%3Bdocument.execCommand("copy")%3Bdocument.body.removeChild(el)%3Bconsole.log("Broken Links Copied")%3B%7D%7Dfunction createButton() %7Bconst copyButton %3D %60<div><button style%3D"display%3Ablock%3B margin-left%3Aauto%3B margin-top%3A20px%3B" type%3D"submit" onclick%3D"copyToClipboard(copyMessage)%3B">Copy<%2Fbutton<%2Fdiv>%60%3Bdocument.body.insertAdjacentHTML("afterbegin"%2C copyButton)%3B%7DprocessLinks(links)%7D)()
