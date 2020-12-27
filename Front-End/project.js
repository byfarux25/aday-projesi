const loginButton = document.getElementsByClassName("btn btn-primary mb-3 ms-2")[0]
const emailInput = document.getElementById("floatingInput")
const passwordInput = document.getElementById("floatingPassword")
const forgetFloatingInput = document.getElementById("forgetFloatingInput")
const btnforgetsend = document.getElementById("btn-forget")
const candidateSaveButton = document.getElementById("candidateSaveButton")
const candidateName       = document.getElementById("nameInput")
const candidateMail       = document.getElementById("emailInput")
const candidateLinkedin   = document.getElementById("linkedinInput")
const candidateNo         = document.getElementById("noInput")
const candidateAlarm      = document.getElementById("alarmInput")
const candidateNote       = document.getElementById("noteInput")
const usersButton = document.getElementsByClassName("badge bg-secondary ms-0")[0]


const request = new Request();
const ui = new Ui()

window.addEventListener('DOMContentLoaded',ui.checkCookie)

function allEventListeners() {

    loginButton.addEventListener("click",login)
    btnforgetsend.addEventListener("click",forget)
    candidateSaveButton.addEventListener("click",candidateAdd)
    usersButton.addEventListener("click",loadAdminPage)


}allEventListeners()


function login() {
    
    let email = emailInput.value
    let password = passwordInput.value
    let name
    let pimage
    
    request.post("https://eraftek.appspot.com/api/auth/login",{email,password})
    .then(res => {
        if (res.success) {
            name = res.data.name
            pimage = res.data.profile_image
            ui.loginProcess(name,pimage)
            localStorage.setItem("name",name)
            localStorage.setItem("pimage",pimage)
        } else {
            ui.runAlert(res.message)
        }

    })
    .catch(err => console.log(err))
}

function forget() {
    let forgetEmail = forgetFloatingInput.value

    request.post("https://eraftek.appspot.com/api/auth/forgotpassword",{"email":forgetEmail})
    .then(response => {
        if (!response.success) {
            ui.modalMessage(response.message,"danger")
        } else {
            ui.modalMessage(response.message,"success")
        }
    })
    .catch(err => console.log(err))
}


function candidateAdd() {

let name = candidateName.value      
let email = candidateMail.value      
let linkedin = candidateLinkedin.value  
let no = candidateNo.value        
let alarm = candidateAlarm.value     
let alarmNote = candidateNote.value   
 
request.post("https://eraftek.appspot.com/api/candidate/addcandidate",
{"name":name,"email":email,"linkedin":linkedin,"no":no,"alarm":alarm,"alarmNote":alarmNote})
.then(res =>{
    if (res.success) {
        console.log(res);
        ui.modalAddCandidateMessage(res.message,"success")
    } else {
        ui.modalAddCandidateMessage(res.message,"danger")
    }
})
.catch(err => console.log(err))
}


function getComimgCandidates() {
request.get("https://eraftek.appspot.com/api/candidate/comingcandidates")
.then(res=>ui.sendCardToUI(res))
.catch(err=>console.log(err))
}


function getAllCandidates() {
    request.get("https://eraftek.appspot.com/api/candidate")
.then(res=>ui.sendCandidatesToUI(res))
.catch(err => console.log(err))
}

function getAllUsers() {
    request.get("https://eraftek.appspot.com/api/user")
.then(res=>ui.sendUsersToUI(res))
.catch(err=>console.log(err))
}


function loadAdminPage() {
    request.get("https://eraftek.appspot.com/api/admin")
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
}


$(document).ready(function(){
    $("#inputsearch").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#cardGroupsAdaylar div").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });


function newPasswordSave() {
let newPassword = newPasswordInput.value 
request.put("https://eraftek.appspot.com/api/auth/resetpassword",{"password":newPassword})
.then(res => {
    if (res.success) {
        console.log(res);
        ui.modalMessageNewPassword(res.message,"success")
    } else {
        ui.modalMessageNewPassword(res.message,"danger")
    }
})
.catch(err => console.log(err))
}