// Login User
newpassForm = _("#newpassForm");

if (newpassForm) {

    newpassForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const verify_code = _("#verify_code").value;
        const password = _("#password").value;
        const password_confirmation= _("#password_confirmation").value;

        const userData = {
            verify_code: verify_code,
            password: password,
            password_confirmation: password_confirmation

        }

        _("#loader").style.display = "block";

        const newPassUrl = "https://goalsetterapi.herokuapp.com/api/reset/password";

        axios.put(newPassUrl, userData).then(function (response) {

            console.log(response.data);
            console.log(response.data.data.message);


            if (response.data) {

                _("#loader").style.display = "none";
                _("#show_success").style.display = "block";

            }
            if (response.data.data.hasOwnProperty("success")) {
                let msg = response.data.data.message;
                _("#show_success").innerHTML = `
                    <div class="alert alert-success design_alert" role="alert">
                       ${msg}
                      Loading Login...
                   </div>
                `;
            }
            setTimeout(function () {
                location.replace("login.html");
            }, 5000);


        }).catch(function (err) {
            // console.log(err.response)
            setTimeout(function () {
                
                if (err.response) {
                    _("#loader").style.display = "none";
                }
                if (err.response.data.hasOwnProperty("verify_code")) {
                    let msg = err.response.data.verify_code[0];
                    _("#err_verify_code").style.display = "block";
                    _('#err_verify_code').innerHTML = `${msg}`;
                }
                if (err.response.data.hasOwnProperty("password")) {
                    let msg = err.response.data.password[0];
                    _("#err_pwd").style.display = "block";
                    _('#err_pwd').innerHTML = `${msg}`;
                }

                if (err.response.hasOwnProperty("status")) {
                    if (err.response.status === 500) {
                        _("#show_success").style.display = "block";
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
