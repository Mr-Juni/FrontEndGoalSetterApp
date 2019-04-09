const dash_image = localStorage.getItem("dash_image");
const name = localStorage.getItem("name");

_('#user_dash_name_goal').innerHTML = `${name}`;
_('#user_dash_img_goal').innerHTML = ` 
    <a id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">
    <img src="http://res.cloudinary.com/getfiledata/image/upload/w_40,c_thumb,ar_4:4,g_face/${dash_image}">
    </a>`;


// This will get the id of the goal from the url
// https://some.site/?id=123
const parsedUrl = new URL(window.location.href);
const goal_id = parsedUrl.searchParams.get("goal");
console.log(parsedUrl.searchParams.get("goal")); 


//View One goal
oneGoalget();

function oneGoalget() {

    const viewgoalsUrl = "https://goalsetterapi.herokuapp.com/api/goals/"+goal_id;

    const token = localStorage.getItem("goaltoken");


    console.log(token)

    const options = {
        headers: {
            Authorization: token,
        }
    }
    _('#spin').style.display = "block";
    axios.get(viewgoalsUrl, options).then(function (response) {


        if (response.data) {
            _('#spin').style.display = "none";
            console.log(response.data)

        }
        const goal = response.data.data.goal;

        console.log(response.data.data.goal);

        _("#edit_title").value = `${goal.title}`;
        _("#edit_description").value = `${goal.description}`;
        _("#edit_begin_date").value = `${goal.begin_date}`;
        _("#edit_due_date").value = `${goal.due_date}`;
        _("#edit_level").value = `${goal.level}`;


        if (goal.goal_status == 0) {
            var status = "<p style='color:tomato;'>Not Completed</p>"
        } else if (goal.goal_status == 1) {
            var status = "<p style='color:green;'>Completed</p>"
        }
        //Insert the goal status into the complete hidden input 
        _('#goal_status').value = `${goal.goal_status}`;

        _('#goalName').innerHTML = `${goal.title}`;
        _("#goal_detail").innerHTML = `
            <tr>
              <td>BEGIN DATE</td>
              <td>${goal.begin_date}</td>
            </tr>
            <tr>
              <td>DUE DATE</td>
              <td>${goal.due_date}</td>
            </tr>
            <tr>
              <td>LEVEL</td>
              <td>${goal.level}</td>
            </tr>
            <tr>
              <td>STATUS</td>
              <td>${status}</td>
            </tr>
            <tr>
              <td>DATE CREATED</td>
              <td>${new Date(goal.created_at).toLocaleDateString()}</td>
            </tr> 
          `;

        _('#desc').innerHTML = ` 
         <tr>
              <p style="color:darkcyan; margin-left:10px;">ACHIEVEMENT PLAN</p>
             <div class="description_box">
                ${goal.description}
             </div>
        </tr>`;
         
        _('#btn_active').innerHTML = ` 
             <div class="modal-footer">
                <button type="button" style="font-weight:bold;" class="far fa-chart-bar btn btn-primary" data-toggle="modal" data-target="#stat"> Statistics</button>
                <button type="button" class="fas fa-clipboard-list btn btn-primary" data-toggle="modal" data-target="#complete" style="border:1px solid green; color:green;"> Mark Completed</button>
             </div>`;


    }).catch(function (err) {

    })
}
//EDIT THE GOAL 

getGoal = _("#getGoal");

if (getGoal) {

    getGoal.addEventListener("submit", function (e) {
        e.preventDefault();
        const title = _("#edit_title").value;
        const description = _("#edit_description").value;
        const begin_date = _("#edit_begin_date").value;
        const due_date = _("#edit_due_date").value;
        const level = _("#edit_level").value;
        
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var today_check = new Date(date);
        var begin_date_check = new Date(begin_date);



        if (begin_date_check < today_check) {

            _("#show_goal_dash").style.display = "block";
            return _("#show_goal_dash").innerHTML = `
                <div class="alert alert-danger design_alert" role="alert"> 
                    The begin date cannot be less than the current date! ${date}
                    <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                </div>
                `;

        }


        const token = localStorage.getItem("goaltoken");
   

        console.log(token)

        const options = {
            headers: {
                Authorization: token,
            }
        }

        const goalData = {
            title: title,
            description: description,
            begin_date: begin_date,
            due_date: due_date,
            level: level
        }
        _("#spin_bx_add_goal").style.display = "block";
        const goalLink = "https://goalsetterapi.herokuapp.com/api/goals/"+goal_id+"/edit";

        axios.put(goalLink, goalData, options).then(function (response) {

            console.log(response.data);

            _("#spin_bx_add_goal").style.display = "none";

            _("#show_goal_dash").innerHTML = `
                <div class="alert alert-success design_alert" role="alert"> 
                    Goal Updated
                    <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                </div>
                `;
            oneGoalget();

        }).catch(function (err) {
            console.log(err.response)

            _("#spin_bx_add_goal").style.display = "none";

            if (err.response.data.hasOwnProperty("title")) {
                let msg = err.response.data.title[0];
                _("#err_goal_title").innerHTML = `${msg}`;
            }

            if (err.response.data.hasOwnProperty("description")) {
                let msg = err.response.data.description[0];
                _("#err_goal_desc").innerHTML = `${msg}`;
            }

            if (err.response.data.hasOwnProperty("begin_date")) {
                let msg = err.response.data.begin_date[0];
                _("#err_goal_begin").innerHTML = `${msg}`;
            }
            if (err.response.data.hasOwnProperty("due_date")) {
                let msg = err.response.data.due_date[0];
                _("#err_goal_due").innerHTML = `${msg}`;
            }

            if (err.response.data.data.hasOwnProperty("error")) {
                let msg = err.response.data.data.message
                _("#show_goal_dash").innerHTML = `
                    <div class="alert alert-danger design_alert" role="alert"> 
                        ${msg}
                       <p style="color:grey; float:right; margin-right: 25px;">Close</p>     
                    </div>
                    `;
            }

        })

    })

}

//Delete A Goal
delete_goal = _("#delete_goal");

if (delete_goal) {

    delete_goal.addEventListener('submit', function (e) {
        e.preventDefault();

        const token = localStorage.getItem("goaltoken");

        const options = {
            headers: {
                Authorization: token,
            }
        }

        _("#spin_bx_del_goal").style.display = "block";
        const deleteLink = "https://goalsetterapi.herokuapp.com/api/goals/" + goal_id + "/delete";

        axios.delete(deleteLink, options).then(function (response) {

            _("#spin_bx_del_goal").style.display = "none";

            location.replace("dashboard.html")

            //   $('#myModal4').modal('toggle')
        }).catch(function (err) {

            if (err.response) {
                // _("#loader").style.display = "none";
                _("#spin_bx_del_goal").style.display = "none";

            }


        })

    })

}

completeGoal = _("#completeGoal");

if (completeGoal) {

    completeGoal.addEventListener("submit", function (e) {
        e.preventDefault();
        let goal_status = _("#goal_status").value;

        if (goal_status == "0") {
            goal_status = 1;
        }else if(goal_status == "1"){
            goal_status = 0;
        }

        const token = localStorage.getItem("goaltoken");

        const options = {
            headers: {
                Authorization: token,
            }
        }

        const goalData = {
            goal_status: goal_status
        }

        _("#spin_bx_delete").style.display = "block";
       
        const goalLink = "https://goalsetterapi.herokuapp.com/api/goals/"+goal_id+"/status";

        axios.put(goalLink, goalData, options).then(function (response) {
            _("#spin_bx_delete").style.display = "none";
            
            _("#show_com").style.display = "block";
            let msg = response.data.data.goalCompleted;
            let msg2 = response.data.data.goalUnCompleted;

            if (msg) {
                var val = msg;
            } else if (msg2) {
                var val = msg2
            }

            _("#show_com").innerHTML = `
                <div class="alert alert-success design_alert" role="alert"> 
                   ${val}
                    <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                </div>
                `;
            setTimeout(function () {
                _("#show_com").style.display = "none";
                $("#complete").modal("toggle");
            }, 3000);
           
            oneGoalget();
            allTask();

        }).catch(function (err) {
            _("#spin_bx_delete").style.display = "none";

        
        })

    })

}