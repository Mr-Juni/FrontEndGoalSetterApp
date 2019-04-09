
// ------------------------------------------------------------------------create team
createTeam = _("#createTeam");

if (createTeam) {

    createTeam.addEventListener('submit', function (e) {
        e.preventDefault();

        const team_name = _("#team_name").value;

        var team_change = team_name.toUpperCase();

        var team_name_check1 = "Team";
        var team_name_check1 = team_name_check1.toUpperCase();
        index1 = team_change.indexOf(team_name_check1);
        if (index1 != -1) {
            _("#spin_bx_delete").style.display = "none";
            _("#show_success_team").style.display = "block";
            return _("#show_success_team").innerHTML = `
                    <div class="alert alert-danger design_alert animated fadeIn" role="alert">
                        Name is reserved and can't be used as team name, choose a different name instead!
                    <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                    </div>
                    `;
        }

        var data = team_name.trim();
        index = data.indexOf(' ');
        if (index != -1) {
            _("#spin_bx_delete").style.display = "none";
            _("#show_success_team").style.display = "block";
              return _("#show_success_team").innerHTML = `
                    <div class="alert alert-danger design_alert animated fadeIn" role="alert">
                        Team name cannot have whitespace!${index}
                    <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                    </div>
                    `; 
        }

     
       
        const userData = {
            team_name: team_name
        }

        const token = localStorage.getItem("goaltoken");

        const options = {
            headers: {
                Authorization: token,
            }
        }
        _("#show_success_team").style.display = "none";
        _("#err_team_name").style.display = "none";
        _("#spin_bx_delete").style.display = "block";
        const teamcreateLink = "https://goalsetterapi.herokuapp.com/api/teams/create";

        axios.post(teamcreateLink, userData, options).then(function (response) {
            const team_name = response.data.data.team.team_name

            if (response.data.data.hasOwnProperty("success")) {
                _("#spin_bx_delete").style.display = "none";
                _("#show_success_team").style.display = "block";
                _("#show_success_team").innerHTML = `
                        <div class="alert alert-success design_alert animated fadeIn" role="alert">
                         Team-(${team_name}) Created!
                        <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                        </div>
                        `;  

                setTimeout(() => {
                    _("#show_success_team").style.display = "none";
                    $("#myModacreateTeam").modal("toggle") 
                }, 3000);

                loadTeams();
          
               
            }

        }).catch(function (err) {
            // console.log(err.response)
            setTimeout(function () {

                if (err.response) {
                    _("#spin_bx_delete").style.display = "none";

                    if (err.response.data.hasOwnProperty("team_name")) {
                        let msg = err.response.data.team_name[0];
                        _("#err_team_name").style.display = "block";
                        _('#err_team_name').innerHTML = `${msg}`;
                    }
                    if (err.response.status === 400 || err.response.status === 401 || err.response.status === 404) {
                        let msg = err.response.data.data.message
                        _("#show_success_team").style.display = "block";
                        _("#show_success_team").innerHTML = `
                    <div class="alert alert-danger design_alert" role="alert"> 
                        ${msg}
                        <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                    </div>
                    `;
                    }

                    }

            }, 2000);
            
        })

    })
}

// ------------------------------------------------------------------------create team
loadTeams();
// View Users Profile
function loadTeams() {

    const teamshowUrl = "https://goalsetterapi.herokuapp.com/api/teams/show";

    const token = localStorage.getItem("goaltoken");

    const options = {
        headers: {
            Authorization: token,
        }
    }
    _("#spin_all_my_teams").style.display = "block";
    axios.get(teamshowUrl, options).then(function (response) {
        console.log(response.data)
        
        const team_datas = response.data.data.all_team;
        _("#spin_all_my_teams").style.display = "none";
           if (team_datas == "") {
               _("#my_teams").innerHTML = `
                <div class="no_goal_icon team_empty">
                    <div style="margin:auto; width:80%;"><i style="color:rgb(245, 149, 197);font-size:50px;" class="fa fa-users"></i></div>
                    <p style="color:#3768a0;" id="">You have not created any team yet !</p>
                </div>
                `;
            } else {
               _("#my_teams").innerHTML = ``;
               for (let team_data of team_datas) {
                   _("#my_teams").innerHTML += `
                        <div style="height:10px;"></div>
                            <div class="container-fluid">
                            <div class="row  goal_plate box_part">
                                <div class="col-5" style="margin-top:15px; font-weight: bold;">
                                <span style="border:1px solid rgb(117, 223, 117); padding: 5px;">Team:</span> 
                                ${team_data.team_name}
                                </div>
                                <div id="tiny_font" class="col-5" style="margin-top:15px;font-weight: bold;">
                                <span style="border:1px solid rgb(117, 223, 117); padding: 5px;">Created:</span> 
                                ${new Date(team_data.created_at).toLocaleDateString()}
                                </div>
                                <div class="col col-2" style="margin-top:15px;">
                                <a class="btn" href="team.html?team_id=${team_data.id}">View</a>
                                </div>
                            </div>
                        </div>                   
                      `;
                }
            }
        _("#create_team_btn").innerHTML = `
                <div class="modal-footer">
                    <button type="button" style="border-color: rgb(117, 223, 117);" class="fa fa-pen btn btn-primary" data-toggle="modal"
                    data-target="#myModacreateTeam"> Create Team</button>
                </div>
        `;
    }).catch(function (err) {
            setTimeout(function () {
                _("#spin_all_my_teams").style.display = "none";
                loadTeams();
            }, 2000)
    })

}

