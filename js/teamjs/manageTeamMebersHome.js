const dash_image = localStorage.getItem("dash_image");
const name = localStorage.getItem("name");

_('#user_dash_name_goal').innerHTML = `${name}`;
_('#user_dash_img_goal').innerHTML = ` 
    <a id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">
    <img src="http://res.cloudinary.com/getfiledata/image/upload/w_40,c_thumb,ar_4:4,g_face/${dash_image}">
    </a>`;
// ------------------------------------------------------------------------create team
member();

// View Users Profile
function member() {

    const teamshowUrl = "https://goalsetterapi.herokuapp.com/api/teams/" + team_id + "/members/show";

    const token = localStorage.getItem("goaltoken");

    const options = {
        headers: {
            Authorization: token,
        }
    }
    axios.get(teamshowUrl, options).then(function (response) {

        const team_memebers = response.data.data.team_memebers;
        _("#spin_all_my_teams").style.display = "none";
        if (team_memebers == "") {
            _("#team_members").innerHTML = `
                <div class="no_goal_icon team_empty">
                    <div style="margin:auto; width:80%;"><i style="color:rgb(245, 149, 197);font-size:50px;" class="fa fa-users"></i></div>
                    <p style="color:#3768a0;" id="">You do not have any team member yet! !</p>
                </div>
                `;
        } else {
            _("#team_members").innerHTML = ``;
            for (let counter = 0; counter < team_memebers.length; counter++) {
                _("#team_members").innerHTML += `
                        <div style="height:10px;"></div>
                            <div class="container-fluid">
                            <div class="row  goal_plate box_part">
                                <div class="col-5" style="margin-top:5px; font-weight: bold;">
                                <span>
                                <!-- <div style="position:absolute; padding:5px; width:10px; border-radius:200px; background: red;"></div> -->
                                 <div style="position:absolute;padding:5px; width:10px; border-radius:200px; background: lightgreen;"></div>
                                 <img style="border-radius: 50px;" src="http://res.cloudinary.com/getfiledata/image/upload/w_40,c_thumb,ar_4:4,g_face/${team_memebers[counter][0].user_image}" />
                                </span>
                                <span style="border:1px solid rgb(117, 223, 117); padding: 5px;">Member name :</span> 
                                ${team_memebers[counter][0].name}
                                </div>
                                <div id="tiny_font" class="col-5" style="margin-top:15px;font-weight: bold;">
                                <span style="border:1px solid rgb(117, 223, 117); padding: 5px;">Created at :</span> 
                                ${new Date(team_memebers[counter][1].created_at).toLocaleDateString()}
                                </div>
                                  <div id="btn_reduce" class="col col-2" style="margin-top:15px;">
                                    <a class="btn member_view"  data-getrelid="${team_memebers[counter][1].id}"   data-getmemid="${team_memebers[counter][1].member_id}" data-getname="${team_memebers[counter][0].name}" 
                                    data-phone="${team_memebers[counter][0].phone_number}" data-email="${team_memebers[counter][0].email}" data-userimage="${team_memebers[counter][0].user_image}"  
                                    data-getadded="${new Date(team_memebers[counter][1].created_at).toLocaleDateString()}" 
                                    data-toggle="modal" data-target="#memberInfo">View</a>
                                    </div>
                            </div>
                        </div>                   
                      `;
            }
        }
        _("#create_team_btn").innerHTML = `
            <div class="modal-footer">
              <button type="button" style="" class="fa fa-pen btn btn-primary" data-toggle="modal"
              data-target="#memberstat"> Statistics </button>
           </div>
        `;
    }).catch(function (err) {

    })

}




// ------------------------------------------------------------------------search team members
    search_term.addEventListener('keyup', function (e) {
        e.preventDefault();

        const search_term = _("#search_term").value;

        const userData = {
            search_term: search_term
        }

        const token = localStorage.getItem("goaltoken");

        const options = {
            headers: {
                Authorization: token,
            }
        }
        _("#spin_add_task").style.display = "block";
        _("#err_search_term").style.display = "none";
        _("#all_search_term").innerHTML = ``;
        const searchLink = "https://goalsetterapi.herokuapp.com/api/teams/members/search";

        axios.post(searchLink, userData, options).then(function (response) {
            const add_members = response.data.data.add_members
            _("#err_search_term").style.display = "none";
            _("#spin_add_task").style.display = "none";
            if (add_members == "") {
                _("#all_search_term").innerHTML = `
                    <div class="no_goal_icon team_empty">
                        <div style="margin:auto; width:80%;"><i style="color:#a4af09cc; font-size:50px;" class="fa fa-user-friends"></i></div>
                        <p style="color:#3768a0;" id="">No Result Found!</p>
                    </div>
                `;
            } else {
                _("#all_search_term").innerHTML = ``;
                for (let add_member of add_members) {
                    _("#all_search_term").innerHTML += `
                        <div style="height:10px;"></div>
                            <div class="container-fluid">
                            <div class="row  goal_plate box_part">
                                <div class="col-5" style="margin-top:5px; font-weight: bold;">
                                <span>
                                 <img style="border-radius: 50px;" src="http://res.cloudinary.com/getfiledata/image/upload/w_40,c_thumb,ar_4:4,g_face/${add_member.user_image}"
                                </span> 
                                <span style="border:1px solid rgb(117, 223, 117); padding: 5px;">Name:</span> 
                                ${add_member.name}
                                </div>
                                <div id="tiny_font" class="col-5" style="font-size:10px;margin-top:15px;font-weight: bold;">
                                ${add_member.email}
                                </div>
                                <div class="col col-2" style="margin-top:15px;">
                                <a class="btn" id="addMember" data-getmemid="${add_member.id}">Add</a>
                                </div>
                            </div>
                        </div>                   
                      `;
                }
            }

        }).catch(function (err) {
                if (err.response) {
                    _("#spin_add_task").style.display = "none";
                    if (err.response.data.hasOwnProperty("search_term")) {
                        let msg = err.response.data.search_term[0];
                        _("#err_search_term").style.display = "block";
                        _("#all_search_term").innerHTML += ``;
                        _('#err_search_term').innerHTML = `${msg}`;
                    }

                }

        })

    })
// -----------------------------Add New Member
function addNewMember(member_id) {
    const token = localStorage.getItem("goaltoken");
    const userData = {
        member_id: member_id
    }

    const options = {
        headers: {
            Authorization: token,
        }
    }
    _("#spin_add_task").style.display = "block";
    const addLink = "https://goalsetterapi.herokuapp.com/api/teams/" + team_id + "/member/add";

    axios.post(addLink, userData, options).then(function (response) {
        console.log(response.data)

        if (response.data.data.hasOwnProperty("success")) {
            const msg = response.data.data.message;
            _("#spin_add_task").style.display = "none";
            _("#show_task_dash").style.display = "block";
            _("#show_task_dash").innerHTML = `
                <div class="alert alert-success design_alert animated fadeIn" role="alert">
                    (${msg})
                <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                </div>
                `;
        }
        member();
    }).catch(function (err) {
        if (err.response) {
            _("#spin_add_task").style.display = "none";
            _("#show_task_dash").style.display = "block";
            if (err.response.status === 400 || err.response.status === 401 || err.response.status === 404) {
                let msg = err.response.data.data.message

                if (msg) {
                    _("#show_task_dash").innerHTML = `
                            <div class="alert alert-danger design_alert" role="alert"> 
                                ${msg}
                                <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                            </div>
                            `;
                } else {
                    _("#show_task_dash").innerHTML = `
                            <div class="alert alert-danger design_alert" role="alert"> 
                                An error occured, please refresh and try again !
                                <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                            </div>
                            `;
                }

            }

        }

    })
}

//Delete A Team Member
delete_member = _("#delete_member");

if (delete_member) {

    delete_member.addEventListener('submit', function (e) {
        e.preventDefault();
        const rel_id = _("#rel_id_delete").value;


        const token = localStorage.getItem("goaltoken");

        const options = {
            headers: {
                Authorization: token,
            }
        }

        _("#spin_bx_task_delete").style.display = "block"; 
        const deleteLink = "https://goalsetterapi.herokuapp.com/api/teams/member/"+rel_id+"/delete";


        axios.delete(deleteLink, options).then(function (response) {
        
            if (response.data.data.hasOwnProperty("success")) {
                const msg = response.data.data.message;
                _("#spin_bx_task_delete").style.display = "none";
                _("#show_member_del").style.display = "block";
                _("#show_member_del").innerHTML = `
                    <div class="alert alert-success design_alert animated fadeIn" role="alert">
                        ${msg}
                    </div>
                    `;
            }
            setTimeout(() => {
                _("#show_member_del").style.display = "none";
                $("#delMember").modal("toggle");
                $("#memberInfo").modal("toggle")
                member();
            }, 3000);

          
        }).catch(function (err) {


            
        })

    })

}
setInterval(() => {
    member();
}, 30000);