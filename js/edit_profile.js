edit = _("#edit");

if (edit) {

    edit.addEventListener('submit', function (e) {
        e.preventDefault();
    
      const name = _("#name_edit").value;
      const email = _("#email_edit").value;
      const phone = _("#phone_number_edit").value;
      const pwd = _("#password").value;
      const cpwd = _("#password_confirmation").value;

      const userData = {
          name: name,
          email: email,
          phone_number: phone,
          password: pwd,
          password_confirmation: cpwd
      }

    const token = localStorage.getItem("goaltoken");

    const options = {
      headers: {
        Authorization: token,
      }
    }
     _("#spin_bx").style.display = "block";
     const editLink = "https://goalsetterapi.herokuapp.com/api/profile/edit";

     axios.put(editLink, userData, options).then(function (response) {

         const msg = response.data.data.message;
         _("#show_edit").style.display = "block";
                 _("#show_edit").innerHTML = `
                    <div class="alert alert-success design_alert animated fadeIn" role="alert">
                    ${msg}
                    <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                    </div>
                    `;
                 localStorage.removeItem('name');

                 const name = response.data.data.user.name;

                 localStorage.setItem('name', name);

                var allow = "1";

                profileUser(allow);

         _("#spin_bx").style.display = "none";

     }).catch(function (err) {
         setTimeout(function () {
             if (err.response) {
                 // _("#loader").style.display = "none";
                 _("#spin_bx").style.display = "none";

                 console.log(err.response)

                 if (err.response.data.hasOwnProperty("name")) {
                     let msg = err.response.data.name[0];
                     _("#err_name_edit").innerHTML = `${msg}`;
                 }

                 if (err.response.data.hasOwnProperty("email")) {
                     let msg = err.response.data.email[0];
                     _("#err_email_edit").innerHTML = `${msg}`;
                 }

                 if (err.response.data.hasOwnProperty("phone_number")) {
                     let msg = err.response.data.phone_number[0];
                     _("#err_phone_edit").innerHTML = `${msg}`;
                 }
                 if (err.response.data.hasOwnProperty("password")) {
                     let msg = err.response.data.password[0];
                     _("#err_pwd_edit").innerHTML = `${msg}`;
                 }
                 
                 if (err.response.data.hasOwnProperty("error")) {
                     let msg = err.response.data.data.message
                     _("#show_edit").style.display = "block";
                     _("#show_edit").innerHTML = `
                        <div class="alert alert-danger design_alert" role="alert"> 
                            ${msg}
                            <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                        </div>
                        `;
                 }
                 if (err.response.data.status == 500) {
                     let msg = err.response.data
                     _("#show_edit").style.display = "block";
                     _("#show_edit").innerHTML = `
                            <div class="alert alert-danger design_alert" role="alert"> 
                                ${msg} Access, you need to be logged in first!
                                <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                            </div>
                            `;
                 }

             }

         }, 2000);
    
 
    })
    
  })

}