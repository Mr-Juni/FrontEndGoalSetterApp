// Login User
recoverForm = _("#recoverForm");

if (recoverForm) {

    recoverForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = _("#Email").value;

        const userData = {
            email: email
        }

        _("#loader").style.display = "block";

        const recoverUrl = "https://goalsetterapi.herokuapp.com/api/verify/email";

        axios.post(recoverUrl, userData).then(function (response) {

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
                      Email is valid, ${msg}
                   </div>
                `;
            }
               setTimeout(function () {
                    location.replace("new_password.html");
                }, 7000);


        }).catch(function (err) {
            // console.log(err.response)
            setTimeout(function () {

                if (err.response) {
                    _("#loader").style.display = "none";
                    _("#show_success").style.display = "block";
                }
                if (err.response.data.hasOwnProperty("email")) {
                    let msg = err.response.data.email[0];
                    _("#err_email").style.display = "block";
                    _('#err_email').innerHTML = `${msg}`;
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
