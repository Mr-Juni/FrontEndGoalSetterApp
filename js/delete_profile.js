delete_profile = _("#delete_profile");

if (delete_profile) {

    delete_profile.addEventListener('submit', function (e) {
        e.preventDefault();
        const pwd = _("#pwd_del").value;

        const token = localStorage.getItem("goaltoken");


        console.log(token)

        const options = {
            headers: {
                Authorization: token,
            }
        }

        _("#spin_bx_delete").style.display = "block";
        const deleteLink = "https://goalsetterapi.herokuapp.com/api/profile/delete?password="+pwd;
        console.log(deleteLink)

        axios.delete(deleteLink, options).then(function (response) {

            console.log(response.data);
                _("#spin_bx_delete").style.display = "none";

                    localStorage.removeItem('user');
                    localStorage.removeItem('goaltoken');
                    localStorage.removeItem('dash_image');

                    location.replace("index.html")

            //   $('#myModal4').modal('toggle')
        }).catch(function (err) {

                if (err.response) {
                    // _("#loader").style.display = "none";
                    _("#spin_bx_delete").style.display = "none";

                    console.log(err.response)

                    if (err.response.data.hasOwnProperty("password")) {
                        let msg = err.response.data.password[0];
                        _("#err_pwd_del").innerHTML = `${msg}`;
                    }

                    if (err.response.data.hasOwnProperty("error")) {
                        let msg = err.response.data.data.message
                        _("#show_success").style.display = "block";
                        _("#show_success").innerHTML = `
                        <div class="alert alert-danger design_alert" role="alert"> 
                            ${msg}
                        </div>
                        `;
                    }

                }


        })

    })

}