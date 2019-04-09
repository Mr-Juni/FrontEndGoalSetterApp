

function _(str) {
  return document.querySelector(str);
}


// the path we dont want just anyone to see
if(location.pathname == "/dashboard.html") {
// check if there is a token
const checkToken = !! localStorage.getItem("goaltoken");

    // if there's jo token, redirect the user to login
    if(!checkToken) {
    location.replace('/login.html');
    }

}

profileUser();
// View Users Profile
function profileUser(allow = "") {

  profile = _("#profile");

  if (profile) {
    const dash_image = localStorage.getItem("dash_image");
    const name = localStorage.getItem("name");

    _('#user_dash_name').innerHTML = `${name}`;
    _('#user_dash_img').innerHTML = ` 
             <a id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">
              <img src="http://res.cloudinary.com/getfiledata/image/upload/w_40,c_thumb,ar_4:4,g_face/${dash_image}">
              </a>`;

    const profileUrl = "https://goalsetterapi.herokuapp.com/api/profile";

    const token = localStorage.getItem("goaltoken");

    const options = {
      headers: {
        Authorization: token,
      }
    }
    if (allow == "1") {
      _('#show_image').style.display = "block";
    }
    _("#show_image").innerHTML = `<div style="height:30px;"></div><img id="img_loader" src="images/text_loader.gif">`;
    _("#show_image_edit").innerHTML = `<div style="height:30px;"></div><img  id="img_loader" src="images/text_loader.gif">`;

    axios.get(profileUrl, options).then(function (response) {
      _('#show_image').style.display = "block";
      const user = response.data.data.user;
      localStorage.setItem('user', user)
      if(user) {
        _('#spin_profile').style.display = "none";
        
      }

      _('#bigName').innerHTML = `Name: ${user.name}`;
          _("#show_image").innerHTML = `
          <div style="height:10px;"></div>
          <img style="border-radius:10px;" src="http://res.cloudinary.com/getfiledata/image/upload/w_150,c_fill,ar_4:4,g_face/${user.user_image}">
          `;
          _("#show_image_edit").innerHTML = `
          <img style="border-radius:10px;" src="http://res.cloudinary.com/getfiledata/image/upload/w_111,c_fill,ar_4:4,g_face/${user.user_image}">
          `;
          _("#user_details").innerHTML = `
            <tr>
              <td>EMAIL</td>
              <td>${user.email}</td>
            </tr>
            <tr>
              <td>MOBILE</td>
              <td>${user.phone_number}</td>
            </tr>
            <tr>
              <td>ACCOUNT TYPE</td>
              <td>${user.account_type} </td>
            </tr>

            <tr>
              <td>DATE CREATED</td>
              <td>${new Date(user.created_at).toLocaleDateString()}</td>
            </tr> 

          `;
          _('#edit_profile').innerHTML = ` 
             <div class="modal-footer">
                <button type="button" class="fa fa-pen btn btn-primary" data-toggle="modal" data-target="#myModal5"> Edit Profile</button>
                <button type="button" style="border-color: tomato; color:tomato;" class="fa fa-pen btn btn-primary" data-toggle="modal" data-target="#myModal6"> Delete Profile</button>
             </div>`;

      _('#name_edit').value = `${user.name}`;
      _('#email_edit').value = `${user.email}`;
      _('#phone_number_edit').value = `${user.phone_number}`;
          
    }).catch(function (err) {
    
    })
  }
}


logoutForm = _("#logoutForm");

if (logoutForm) {

  logoutForm.addEventListener('click', function (e) {
    e.preventDefault();

      localStorage.removeItem('goaltoken');
      localStorage.removeItem('dash_image');

      location.replace("index.html")
    

  })
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
