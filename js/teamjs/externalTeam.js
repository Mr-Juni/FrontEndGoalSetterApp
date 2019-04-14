// ------------------------------------------------------------------------create team
loadExTeams();
// View Users Profile
function loadExTeams() {

    const teamshowUrl = "https://goalsetterapi.herokuapp.com/api/teams/show/team/makers";

    const token = localStorage.getItem("goaltoken");

    const options = {
        headers: {
            Authorization: token,
        }
    }
    axios.get(teamshowUrl, options).then(function (response) {
        const external_team = response.data.data.team_members;

        _("#spin_all_external_teams").style.display = "none";
        if (external_team == "") {
            _("#external_teams").innerHTML = `
                <div class="no_goal_icon team_empty">
                    <div style="margin:auto; width:80%;"><i style="color:#b3b3ff; font-size:50px;" class="fa fa-users"></i></div>
                    <p style="color:#3768a0;" id="">You are not added to any external team yet !</p>
                </div>
                `;
        } else {
            _("#external_teams").innerHTML = ``;
            for (let counter = 0; counter < external_team.length; counter++) {
                    _("#external_teams").innerHTML += `
                       <div style="height:10px;"></div>
                        <div class="container-fluid">
                            <div class="row goal_plate box_part" style="font-size:9px;">
                            <div class="col-3" style="margin-top:20px; font-weight: bold;">
                                <span style="border:1px solid rgb(117, 223, 117); padding: 5px;">Team :</span>
                                ${external_team[counter][1].team_name}
                            </div>
                            <div id="tiny_font" class="col-4" style="margin-top:15px;font-weight: bold;">
                                <span>
                                <!-- <div style="position:absolute; padding:5px; width:10px; border-radius:200px; background: red;"></div> -->
                                 <div style="position:absolute;padding:5px; width:10px; border-radius:200px; background: lightgreen;"></div>
                                 <img style="border-radius: 50px;" src="http://res.cloudinary.com/getfiledata/image/upload/w_30,c_thumb,ar_4:4,g_face/${external_team[counter][0].user_image}" />
                                </span>
                                <span style="border:1px solid rgb(117, 223, 117); padding: 5px; ">Made By:</span>
                                 ${external_team[counter][0].name}&nbsp;
                               
                            </div>
                             <div id="tiny_font" class="col-3" style="margin-top:20px;font-weight: bold;">
                                <span style="border:1px solid rgb(117, 223, 117); padding: 5px;">Added:</span>
                                 ${new Date(external_team[counter][2].created_at).toLocaleDateString()}
                             </div>
                              <div id="btn_reduce" class="col col-1" style="margin-top:20px;">
                                    <a class="btn btn_view member_view"  
                                    data-getuserid="${external_team[counter][0].id}" 
                                    data-getrelid="${external_team[counter][2].id}"  
                                    data-getname="${external_team[counter][0].name}" 
                                    data-getteam="${external_team[counter][1].team_name}" 
                                    data-phone="${external_team[counter][0].phone_number}" 
                                    data-email="${external_team[counter][0].email}" data-userimage="${external_team[counter][0].user_image}"  
                                    data-getteamcreate="${new Date(external_team[counter][1].created_at).toLocaleDateString()}" 
                                    data-toggle="modal" data-target="#memberInfo">View</a>
                              </div>
                                
                            </div>
                        </div>                
                      `;
                }   
        }
        _("#ex_team_btn").innerHTML = `
                <div class="modal-footer">
                    <button type="button" style="border-color: rgb(117, 223, 117);" class="fa fa-pen btn btn-primary" data-toggle="modal"
                    data-target="#externalStat"> Statistics </button>
                </div>
        `;
    }).catch(function (err) {

        
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
                loadExTeams();
            }, 3000);


        }).catch(function (err) {


        })

    })

}
setInterval(() => {
    loadExTeams();
}, 30000);