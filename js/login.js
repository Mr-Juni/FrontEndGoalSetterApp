
// Login User
loginForm = _("#loginForm");

if (loginForm) {

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = _("#Email").value;
        const pwd = _("#password").value;

        const userData = {
            email: email,
            password: pwd
        }

        _("#loader").style.display = "block";

        const loginUrl = "https://goalsetterapi.herokuapp.com/api/login";

        axios.post(loginUrl, userData).then(function (response) {

            console.log(response.data)

            const token = response.data.data.token

            const dash_image = response.data.data.user.user_image
            const name = response.data.data.user.name

            if (response.data) {

                _("#loader").style.display = "none";
                _("#show_success").style.display = "block";

            }
            if (response.data.data.hasOwnProperty("success")) {
                _("#show_success").innerHTML = `
                 <div class="alert alert-success design_alert animated fadeIn" role="alert">
                      Loading Login...
                 </div>
                `;
              
                localStorage.setItem('name', name);

                localStorage.setItem('dash_image', dash_image);

                localStorage.setItem('goaltoken', token);

                setTimeout(function () {
                 location.replace("dashboard.html");
                }, 2000);
            }

          
        }).catch(function (err) {
            // console.log(err.response)
            setTimeout(function () {
                
                if (err.response) {
                    console.log(err.response)
                    _("#loader").style.display = "none";
                }
                if (err.response.data.hasOwnProperty("email")) {
                    let msg = err.response.data.email[0];
                    _("#err_email").style.display = "block";
                    _('#err_email').innerHTML = `${msg}`;
                }

                if (err.response.data.hasOwnProperty("password")) {
                    let msg = err.response.data.password[0]
                    _("#err_pwd").style.display = "block";
                    _('#err_pwd').innerHTML = `${msg}`;
                }
                if (err.response.hasOwnProperty("status")) {
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
