const newPasswordSaveButton = document.getElementById("newPasswordSaveButton")
const newPasswordInput = document.getElementById("newPasswordInput")

newPasswordSaveButton.addEventListener("click",newPasswordSave)

const request = new Request();
const ui = new Ui()

function newPasswordSave() {
    let newPassword = newPasswordInput.value 
    
    request.put("http://eraftek.appspot.com/api/auth/resetpassword",{"password":newPassword})
    .then(res => {
        if (res.success) {
            console.log(res);
            ui.modalMessageNewPassword(res.message,"success")
            setTimeout(() => {
                window.location.href="http://eraftek.appspot.com"
            }, 2500);
        } else {
            ui.modalMessageNewPassword(res.message,"danger")
        }
    })
    .catch(err => console.log(err))
    }