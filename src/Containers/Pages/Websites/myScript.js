
let DomainName = window.location.hostname;
let FinalDomain = DomainName;

if (DomainName === '') {
    alert('Please Refresh')
} else if (DomainName.includes('www')) {
    const splitName = DomainName.split('.')
    const edit = splitName.shift()
    FinalDomain = splitName.join('.')
} else {
    console.log(" Final Domain Name :", FinalDomain);
    console.log(" SiteKey : ", window.interdeal.sitekey);
    console.log(" User ID : ", window.interdeal.userId);
    const siteKey = window.interdeal.sitekey
    const siteUserId = window.interdeal.userId


    const RunTheTask = async () => {
        const resp = await fetch('https://plugin-nodejs-server.herokuapp.com/api/isValidScript', {
            method: 'POST',
            body: JSON.stringify({ domainName: FinalDomain, userId: siteUserId, siteKey: siteKey }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log("response By API ===", res)
        }).catch((e) => console.log("Error in Connecting to the API", e))
    }
    RunTheTask()

}


// let outerCircle = document.createElement('div');
// outerCircle.style.backgroundColor='red';
// outerCircle.style.position='fixed';
// outerCircle.style.bottom='5%';
// outerCircle.style.left='5%';
// outerCircle.style.height='50px';
// outerCircle.style.width='50px';
// outerCircle.style.borderRadius='50%';

// let inner = document.createElement('p')
// inner.style.display = 'flex';
// inner.style.alignItems= 'center';
// outerCircle.append(inner);
// document.body.appendChild(outerCircle)

// (function(doc, head, body){
//     let script;
//     body ? body.appendChild(script) : head.appendChild(script)
// })(document, document.head, document.body)

    // =============Script for demo.iqasimmughal.com

    {/* <script> window.interdeal = {"sitekey": "62b2de441d7ad7c9e6bc1791", "userId": "62a210133dee6af1b5e167df", "Menulang": "EN", "domains": {"js": "https://cdn.equalweb.com/", "acc": "https://access.equalweb.com/" }, "btnStyle": {"vPosition": [ "80%", null ], "scale": [ "0.8", "0.8" ], "icon": {"type": 7, "shape": "semicircle", "outline": false } } }; (function(doc, head, body){ var coreCall = doc.createElement('script'); coreCall.src = 'https://iqasimmughal.com/test.js'; coreCall.defer = true; coreCall.integrity = 'sha512-73oZhkzO+7F1r8AXT5BtChHyVvx8GMuB3Pokx6jdnP5Lw7xyBUO4L5KKi7BwqovhoqOWjNmkah1iCiMniyt6Kw=='; coreCall.crossOrigin = 'anonymous'; coreCall.setAttribute('data-cfasync', true ); body? body.appendChild(coreCall) : head.appendChild(coreCall); })(document, document.head, document.body); </script> */ }