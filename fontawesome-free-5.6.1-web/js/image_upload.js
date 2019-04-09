
// upload_img
upload_img = _("#upload_img");

if (upload_img) {

    upload_img.addEventListener('submit', function (e) {
        e.preventDefault();
          const user_image = _("#user_image").files[0];

          let fd = new FormData()

          fd.append('user_image', user_image)

            const token = localStorage.getItem("goaltoken");


            console.log(token)

            const options = {
                headers: {
                    Authorization: token,
                    'content-type': 'multipart/form-data'
                    
                }
            }
        
        _("#spin_bx").style.display = "block";
        const UploadUrl = "https://goalsetterapi.herokuapp.com/api/profile/upload";

        axios.post(UploadUrl, fd, options ).then(function (response) {

            console.log(response.data)
            // if (response.data) {

            //     _("#loader").style.display = "none";
            //     _("#show_success").style.display = "block";

            // }
               let afterWork = setTimeout(function () {
                    if (response.data.data.hasOwnProperty("success")) {
                        _("#show_success").style.display = "block";
                        _("#show_success").innerHTML = `
                        <div class="alert alert-success design_alert animated fadeIn" role="alert">
                        New Photo Updated!
                        <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                        </div>
                        `;
                        localStorage.removeItem('dash_image');

                        const dash_image = response.data.data.user_image

                        localStorage.setItem('dash_image', dash_image);

                        profileUser();
                    }
                }, 1000);

            if (afterWork) {
                    _("#spin_bx").style.display = "none";
                    _("#registe").style.display = "block";
                    _("#img_save").style.display = "none";
                    _("#box_set").style.display = "block";
                    
                }


        }).catch(function (err) {
            setTimeout(function () {

                if (err.response) {
                    // _("#loader").style.display = "none";
                    _("#spin_bx").style.display = "none";
                    _("#registe").style.display = "block";
                    _("#img_save").style.display = "none";
                    _("#box_set").style.display = "block";

                    console.log(err.response)
                    console.log(err.response.data.data.message)
                   
                    if (err.response.data.hasOwnProperty("error")) {
                            let msg = err.response.data.data.message
                            _("#show_success").style.display = "block";
                            _("#show_success").innerHTML = `
                                <div class="alert alert-danger design_alert" role="alert"> 
                                    ${msg}
                                </div>
                                `;
                        }
                    if (err.response.data) {
                        let msg = err.response.data
                        _("#show_success").style.display = "block";
                        _("#show_success").innerHTML = `
                            <div class="alert alert-danger design_alert" role="alert"> 
                                ${msg} Access, you need to be logged in first!
                                <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                            </div>
                            `;
                    }
                    
                    if (err.response.status === 422) {
                        if (err.response.data.hasOwnProperty("user_image")) {
                            let msg = err.response.data.user_image
                            _("#show_success").style.display = "block";
                            _("#show_success").innerHTML = `
                                    <div class="alert alert-danger design_alert" role="alert"> 
                                        ${msg}
                                        <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                                    </div>
                                `;
                        }
                    } 
                    
                   
                }

            }, 2000);
        })


    })
}
