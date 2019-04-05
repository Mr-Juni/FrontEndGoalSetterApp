// For registration
regForm = _("#addPost");

if (regForm) {
    

    addPost.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = _("#name").value;
        const email = _("#email").value;
        const phone = _("#phone_number").value;
        const type = _("#accounttype").value;
        const pwd = _("#password").value;
        const cpwd = _("#confirm_password").value;
   
        const userData = {
            name: name,
            email: email,
            phone_number: phone,
            account_type: type,
            password: pwd,
            password_confirmation: cpwd
        }
       _("#loader").style.display = "block";
        const registerUrl = "https://goalsetterapi.herokuapp.com/api/register";

        axios.post(registerUrl, userData).then(function (response) {

            if (response.data) {
                _("#loader").style.display = "none";
                _("#show_success").style.display = "block";
            }
            if (response.data.data.hasOwnProperty("success")) {
                 let msg = response.data.data.message;
                let email_link = response.data.data.email_link;
                _("#show_success").innerHTML = `
                 <div class="alert alert-success design_alert animated fadeIn" role="alert">
                      ${msg} <a href="http://${email_link}" target="_blank">Open Mail</a>
                 </div>
                `;
            }

        }).catch(function (err) {
            //console.log(err.response);
            setTimeout(function () {
                
                if (err.response) {
                    _("#loader").style.display = "none";
                    _("#show_success").style.display = "block";
                }

                if (err.response.data.hasOwnProperty("name")) {
                    let msg = err.response.data.name[0];
                    _("#err_name").style.display = "block";
                    _('#err_name').innerHTML = `${msg}`;
                }

                if (err.response.data.hasOwnProperty("email")) {
                    let msg = err.response.data.email[0];
                    _("#err_email").style.display = "block";
                    _('#err_email').innerHTML = `${msg}`;
                }

                if (err.response.data.hasOwnProperty("phone_number")) {
                    let msg = err.response.data.phone_number[0];
                    _("#err_number").style.display = "block";
                    _('#err_number').innerHTML = `${msg}`;
                }

                if (err.response.data.hasOwnProperty("password")) {
                    let msg = err.response.data.password[0]
                    _("#err_pwd").style.display = "block";
                    _('#err_pwd').innerHTML = `${msg}`;
                }
                if (err.response.hasOwnProperty("status")) {
                    _("#show_success").style.display = "block";
                    if (err.response.status === 500) {
                        _("#show_success").innerHTML = `
                        <div class="alert alert-danger design_alert" role="alert"> 
                          TimeOut.. Refresh and try again   
                        </div>
                        `;
                    }
                if (err.response.status === 400 || err.response.status === 401 || err.response.status === 404) {
                        let msg = err.response.data.data.message
                   _("#show_success").style.display = "block";
                        _("#show_success").innerHTML = `
                        <div class="alert alert-danger design_alert" role="alert"> 
                            ${msg}
                        </div>
                        `;
                    }

                }

            }, 2000);
        })




    })

}
