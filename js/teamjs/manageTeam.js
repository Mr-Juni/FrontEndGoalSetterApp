// This will get the id of the goal from the url
// https://some.site/?id=123
const parsedUrl = new URL(window.location.href);

const team_id = parsedUrl.searchParams.get("team_id");





loadTeamData();
// Show Team single
function loadTeamData() {
    _("#team_title").innerHTML = `<img id="goal_icon" src="images/text_loader.gif">`;
    _(".stat_name").innerHTML = `<img id="goal_icon" src="images/text_loader.gif">`;
    const teamshowUrl = "https://goalsetterapi.herokuapp.com/api/teams/" + team_id + "/show";

    const token = localStorage.getItem("goaltoken");

    const options = {
        headers: {
            Authorization: token,
        }
    }
    axios.get(teamshowUrl, options).then(function (response) {
        console.log(response.data)

        const one_team = response.data.data.one_team;
        _("#team_title").innerHTML = `
         Team ${one_team.team_name} <i style="font-size:15px;" class="fa fa-arrow-right" aria-hidden="true"></i> Members
        `;
        _(".stat_name").innerHTML = `
         Team ${one_team.team_name} <i style="font-size:15px;" class="fa fa-arrow-right" aria-hidden="true"></i> Statistics
        `;
       

    }).catch(function (err) {
        setTimeout(function () {
            _("#spin_bx_del_goal").style.display = "none";
            loadTeamData();
        }, 2000)
    })

}


// ------------------------------------------------------------------------create team
editTeam = _("#editTeam");

if (editTeam) {

    editTeam.addEventListener('submit', function (e) {
        e.preventDefault();

        const team_name = _("#edit_title").value;

        const userData = {
            team_name: team_name
        }

        const token = localStorage.getItem("goaltoken");

        const options = {
            headers: {
                Authorization: token,
            }
        }
        _("#spin_bx_add_goal").style.display = "block";
        _("#err_edit_title").style.display = "none";
        const teameditLink = "https://goalsetterapi.herokuapp.com/api/teams/"+team_id+"/edit";

        axios.put(teameditLink, userData, options).then(function (response) {
            console.log(response.data)
            const team_name = response.data.data.team.team_name

            if (response.data.data.hasOwnProperty("success")) {
                _("#show_goal_dash").style.display = "block";
                _("#spin_bx_add_goal").style.display = "none";
                _("#show_goal_dash").innerHTML = `
                        <div class="alert alert-success design_alert animated fadeIn" role="alert">
                         Team name updated to (${team_name})!
                        <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                        </div>
                        `;

                loadTeams();
            }

        }).catch(function (err) {
            // console.log(err.response)
            setTimeout(function () {

                if (err.response) {
                    _("#spin_bx_add_goal").style.display = "none";
                    

                    if (err.response.data.hasOwnProperty("team_name")) {
                        let msg = err.response.data.team_name[0];
                        _("#err_edit_title").style.display = "block";
                        _('#err_edit_title').innerHTML = `${msg}`;
                    }
                    if (err.response.status === 400 || err.response.status === 401 || err.response.status === 404) {
                        let msg = err.response.data.data.message
                        _("#show_goal_dash").style.display = "block";
                        _("#show_goal_dash").innerHTML = `
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

//Delete A Team
delete_team = _("#delete_team");

if (delete_team) {

    delete_team.addEventListener('submit', function (e) {
        e.preventDefault();

        const token = localStorage.getItem("goaltoken");

        const options = {
            headers: {
                Authorization: token,
            }
        }

        _("#spin_bx_del_goal").style.display = "block";
        const deleteLink = "https://goalsetterapi.herokuapp.com/api/teams/" + team_id + "/delete";
        console.log(deleteLink)

        axios.delete(deleteLink, options).then(function (response) {

            _("#spin_bx_del_goal").style.display = "none";

            location.replace("dashboard.html")

            //   $('#myModal4').modal('toggle')
        }).catch(function (err) {

        })

    })

}


