javascript:(function()%7Blet links %3D document.querySelectorAll("nav a")%3B%3Blet arrayOfBrokenURLs %3D %5B%5D%3Basync function processLinks(linksArray) %7Bif(!linksArray.length)%7Balert("No links found")%3Breturn%7DsetupModal(arrayOfBrokenURLs)%3Bfor (const %5Bindex%2Clink%5D of linksArray.entries()) %7Bif (link.href) %7Blet remainder %3D linksArray.length - index%3Bawait testLink(link%2Cremainder)%3B%7D%7D%7Dasync function testLink(link%2Cremainder) %7Blet request %3D new Request(link.href)%3Btry %7Bawait fetch(request%2C %7Bmethod%3A "GET"%7D).then((response) %3D> %7BremainingURLs(remainder)%3Bif (response.ok %26%26 response.redirected %3D%3D false) %7Blink.style.color %3D "green"%3B%7D else %7Blink.style.color %3D "red"%3BarrayOfBrokenURLs.push(link.href)%3BupdateModalCount(arrayOfBrokenURLs.length)%3BappendBrokenURLs(link.href%2Clink.innerText%2C"%23brokenLinksList")%3BaddCloseEventListener()%7D%7D)%3B%7D catch (e) %7Bconsole.log(e)%3B%7D%7Dfunction setupModal(arrayOfBrokenURLs)%7Bconsole.log("Setting up modal")%3Blet modalElement %3D %60<div class%3D"metaBlockModal" ><span class%3D"metaBlockModal-closeButton" ><%2Fspan><p>Number of non-200 URLs found%3A <span class%3D"count">0<%2Fspan> out of %24%7Blinks.length%7D<%2Fp><p>Remaining URLs%3A <span class%3D"remaining"><%2Fspan> <%2Fp><ul id%3D"brokenLinksList"><%2Ful><style>.metaBlockModal%7Bdisplay%3A block%3Bwidth%3A 100%25%3Bbackground-color%3A lightgray%3Bz-index%3A 100000000%3Bpadding%3A 30px 0px 20px 30%25%3Bposition%3Arelative%3Bline-height%3A 18px%3Bfont-size%3A 16px%3Bfont-family%3A helvetica%2Cserif%3B%7D.metaBlockModal p%7Bmargin-bottom%3A 10px%3B%7D.metaBlockModal-closeButton%7Bposition%3A absolute%3Btop%3A 20px%3Bright%3A 20px%3Bborder%3A 1px solid black%3Bpadding%3A 10px 15px%3Bborder-radius%3A50%25%3Bcursor%3Apointer%3Bbackground-color%3A white%3B%7D.metaBlockModal-closeButton%3Aafter%7Bcontent%3A "%2B"%3Bfont-size%3A 1rem%3B%7D.metaBlockModal-closeButton%3Ahover%7Btransform%3A rotate(45deg)%3Bbackground-color%3A black%3Bcolor%3A white%3B%7D<%2Fstyle><%2Fdiv>%60%3Bdocument.body.insertAdjacentHTML("afterbegin"%2CmodalElement)%3B%7Dfunction updateModalCount(index) %7Bif(document.querySelector(".metaBlockModal .count"))%7Bdocument.querySelector(".metaBlockModal .count").innerText %3D index%3B%7D%7Dfunction appendBrokenURLs(brokenLinkAsText%2CanchorText%2CmountPoint)%7Blet li %3D document.createElement("li")%3Bli.textContent %3D anchorText %2B " - " %2B brokenLinkAsText.toString()%3Bdocument.querySelector(mountPoint).insertAdjacentElement("beforeend"%2Cli)%3B%7Dfunction addCloseEventListener() %7Bdocument.querySelector(".metaBlockModal-closeButton").addEventListener("click"%2C(e)%3D>%7Bdocument.querySelector(".metaBlockModal").remove()%3B%7D)%7Dfunction remainingURLs(remainder)%7Bdocument.querySelector(".remaining").innerText %3D remainder%3B%7DprocessLinks(links)%7D)()
