let afterLoginMenu = document.getElementById("afterLoginMenu")
let afterLoginMenuContainer = document.getElementById("afterLoginMenuContainer")
let willToggleDiv  = document.getElementById("willToggleDiv")
let willToggleDiv2 = document.getElementById("willToggleDiv2")
let willToggleDiv3 = document.getElementById("willToggleDiv3")
let willToggleDiv4 = document.getElementById("willToggleDiv4")
let cardGroups = document.getElementById("cardGroups")
const cardGroupsAdaylar = document.getElementById("cardGroupsAdaylar")
var cardGroupsGetUsers = document.getElementById("cardGroupsGetUsers")



class Ui {

    constructor(){
        this.alertDiv = document.getElementsByClassName("row justify-content-end")[0]
        this.alertSpan = document.getElementById("alertSpan")
    }

    runAlert(message){
        this.alertSpan.textContent = message

        setTimeout(()=>{
            this.alertSpan.textContent = ""
        },1500);
    }

    
    modalMessage(message,type){
        let forgetModalDiv = document.getElementById("forgetModalDiv")

        forgetModalDiv.innerHTML += `
            <div class="alert alert-${type}" role="alert">
            ${message}
            </div>`

        setTimeout(()=>{
            forgetModalDiv.innerHTML = ""
        },2000);

    }

    modalMessageNewPassword(message,type){
        let forgetModalDiv = document.getElementById("newPasswordAlert")

        forgetModalDiv.innerHTML += `
            <div class="alert alert-${type}" role="alert">
            ${message}
            </div>`

        setTimeout(()=>{
            forgetModalDiv.innerHTML = ""
        },2000);

    }
    modalAddCandidateMessage(message,type){
        let addCandidateModalFooter = document.getElementById("addCandidateModalFooter")

        addCandidateModalFooter.innerHTML += `
            <div class="alert alert-${type}" role="alert">
            ${message}
            </div>`

        setTimeout(()=>{
            addCandidateModalFooter.innerHTML = ""
        },4000);

    }

    
    loginProcess(name,pimage){
        let names = name
        let pimages = pimage

        willToggleDiv.style.display  = "none"
        willToggleDiv2.style.display = "none"
        willToggleDiv3.style.display = "none"
        willToggleDiv4.style.display = "none"
        afterLoginMenu.innerHTML += `
        <div class="container mt-2" style="width: 500px;" id="afterLoginMenuContainer">
        <div class="row justify-content-center">
          <div class="col-6 mt-3">
        <h5 class="float-end">${names}</h5>
          </div>
          <div class="col-2">
            <img src="public/upload/${pimages}" width="55" height="55" style="border-radius: 25px;">
          </div>
          <div class="col-4 mt-2">
            <button type="button" class="btn btn-primary mb-3 ms-3" id="logoutButton">Çıkış</button>
              </div>
        </div>
        </div>`

        const logoutButton = document.getElementById("logoutButton")
        logoutButton.addEventListener("click",ui.logoutProcess)
    }
    

    logoutProcess() {
       let get=(async(url)=>(await fetch(url)).json())
        get("http://localhost/api/auth/logout")
        .then(res=>{
            if (res.success) {
                afterLoginMenu.innerHTML = ""
                willToggleDiv.style.display  = "block"
                willToggleDiv2.style.display = "block"
                willToggleDiv3.style.display = "block"
                willToggleDiv4.style.display = "block"
            }else {
                ui.runAlert(res.message)
            }
        })
        .catch(err => console.log(err));
    }

    
    checkCookie(){
        let name = localStorage.getItem("name")
        let pimage = localStorage.getItem("pimage")
    
        if (document.cookie.startsWith("access_token=")) {
            ui.loginProcess(name,pimage)
        }
    }

    sendCardToUI(res){
        res.data.forEach(element => {
            cardGroups.innerHTML += `
            <div class="col">
            <div class="card">
              <a href="localhost.com"> <img src="public/upload/${element.profile_image}" class="card-img-top" alt="zzz"></a>
              <div class="card-body">
                <a href="localhost.com" class="text-decoration-none"><h5 class="card-title">${element.name}</h5></a></a>
                <p class="card-text">${element.alarm}</p>
                <p class="card-text">${element.alarmNote}</p>
                <p class="card-text">${element.no}</p>
              </div>
            </div>
          </div>`
        });

    }

    
    sendCandidatesToUI(res){
        res.data.forEach(element => {
            cardGroupsAdaylar.innerHTML += `
            <div class="col">
            <div class="card">
              <a href="localhost.com"> <img src="public/upload/${element.profile_image}" class="card-img-top" alt="zzz"></a>
              <div class="card-body">
                <a href="localhost.com" class="text-decoration-none"><h5 class="card-title">${element.name}</h5></a></a>
                <p class="card-text">${element.alarm}</p>
                <p class="card-text">${element.alarmNote}</p>
                <p class="card-text">${element.no}</p>
              </div>
            </div>
          </div>`
        });

    }
    sendUsersToUI(res){
        res.data.forEach(element => {
            cardGroupsGetUsers.innerHTML += `
            <div class="col">
            <div class="card">
              <a href="localhost.com"> <img src="public/upload/${element.profile_image}" class="card-img-top" alt="zzz"></a>
              <div class="card-body">
                <a href="localhost.com" class="text-decoration-none"><h5 class="card-title">${element.name}</h5></a></a>
                <p class="card-text" style="font-size: 80%;">${element.email}</p>
                <p class="card-text">${element.role}</p>
              </div>
            </div>
          </div>`
        });

    }

}


