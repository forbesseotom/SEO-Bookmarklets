let links = document.querySelectorAll("nav a");;
let arrayOfBrokenURLs = [];

async function processLinks(linksArray) {
    if(!linksArray.length){ 
        alert("No links found");
        return 
    }
    setupModal(arrayOfBrokenURLs);

    for (const [index,link] of linksArray.entries()) {
        if (link.href) {
            let remainder = linksArray.length - index;
            await testLink(link,remainder);
        }
    }
}

async function testLink(link,remainder) {
  let request = new Request(link.href);
  try {
    await fetch(request, {
      method: "GET"
    }).then((response) => {
        remainingURLs(remainder);  
      if (response.ok && response.redirected == false) {
        link.style.color = "green";
      } else {
        link.style.color = "red";
        arrayOfBrokenURLs.push(link.href);
        updateModalCount(arrayOfBrokenURLs.length);
        appendBrokenURLs(link.href,link.innerText,"#brokenLinksList");
        addCloseEventListener()
      }
    });
  } catch (e) {
    console.log(e);
  }
}

function setupModal(arrayOfBrokenURLs){
    console.log("Setting up modal");
    let modalElement = `
    <div class="metaBlockModal" >
        <span class="metaBlockModal-closeButton" ></span>
        <p>Number of non-200 URLs found: <span class="count">0</span> out of ${links.length}</p>
        <p>Remaining URLs: <span class="remaining"></span> </p>
        <ul id="brokenLinksList">

        </ul>
    <style>
        .metaBlockModal{
            display: block;
            width: 100%;
            background-color: lightgray;
            z-index: 100000000;
            padding: 30px 0px 20px 30%;
            position:relative;
            line-height: 18px;
            font-size: 16px;
            font-family: helvetica,serif;
        }
        .metaBlockModal p{
            margin-bottom: 10px;
        }
        .metaBlockModal-closeButton{
            position: absolute;
            top: 20px;
            right: 20px;
            border: 1px solid black;
            padding: 10px 15px;
            border-radius:50%;
            cursor:pointer;
            background-color: white;
            
        }
        .metaBlockModal-closeButton:after{
            content: "+";
            font-size: 1rem;
        }
        .metaBlockModal-closeButton:hover{
            transform: rotate(45deg);
            background-color: black;
            color: white;
        }
    </style>
    </div>
`;

document.body.insertAdjacentHTML("afterbegin",modalElement);
}

function updateModalCount(index) {
    if(document.querySelector(".metaBlockModal .count")){
        document.querySelector(".metaBlockModal .count").innerText = index;
    }
}

function appendBrokenURLs(brokenLinkAsText,anchorText,mountPoint){
    let li = document.createElement("li");
    li.textContent = anchorText + " - " + brokenLinkAsText.toString();
    document.querySelector(mountPoint).insertAdjacentElement("beforeend",li);
}

function addCloseEventListener() {
    document.querySelector(".metaBlockModal-closeButton").addEventListener("click",(e)=>{
        document.querySelector(".metaBlockModal").remove();
    })
}

function remainingURLs(remainder){
    document.querySelector(".remaining").innerText = remainder;
}

processLinks(links);
