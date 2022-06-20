
let DomainName = window.location.hostname;
if (DomainName === '') {
    alert('Please Refresh')
}
else {
    console.log(" Domain Name :", DomainName);
    console.log(" SiteKey : ", window.interdeal.siteKey);
    console.log(" User ID : ", window.interdeal.userId);
    const siteKey = window.interdeal.sitekey
    const siteUserId = window.interdeal.userId


    const RunTheTask = async ()=>{
        const resp = await fetch('https://plugin-nodejs-server.herokuapp.com/api/isValidScript',{
            method: 'POST',
            body: JSON.stringify({ domainName: DomainName, userId: siteUserId, siteKey: siteKey }
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
