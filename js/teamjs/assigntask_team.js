flowGoal();
function flowGoal() {
  console.log("start")
const viewgoalsUrl = "https://goalsetterapi.herokuapp.com/api/goals";
var select = document.getElementById("goal_assign");
const token = localStorage.getItem("goaltoken");

const options = {
  headers: {
    Authorization: token,
  }
}
  select.options[select.options.length] = new Option("Loading please wait...", "");


  _("#assign_place").innerHTML = `<p style="color:#3768a0;">Please select a goal to continue!</p>`;
  axios.get(viewgoalsUrl, options).then(function (response) {
    console.log(response.data)
    const goals = response.data.data.goals;
    select.options.length = 0;
    if (goals == "") {
        select.options[select.options.length] = new Option("You have not created any goal yet!", "");
    }else{
      select.options[select.options.length] = new Option("Select A Goal", "");
      for (let goal of goals) {
          select.options[select.options.length] = new Option(goal.title, goal.id);
        
      }
    }

  }).catch(function (err) {
    console.log(err.response)
  })
}

// ------------------------------------------------------------------------sget task through event members

goal_assign.addEventListener('change', function (e) {
  e.preventDefault();

  const goal_assign_id = _("#goal_assign").value;
  _("#assign_place").innerHTML = ``;

  if (goal_assign_id == "") {
    _("#add_assign").innerHTML = ``;
    _("#remove_assign").innerHTML = ``;
    _("#revert_place").innerHTML = ``;
    return _("#assign_place").innerHTML = `
                <p style="color:#3768a0;">Please select a goal to continue!</p>
        `;
  }
  const token = localStorage.getItem("goaltoken");

  const options = {
    headers: {
      Authorization: token,
    }
  }
  _("#spin_assign_task").style.display = "block";

  const searchLink = "https://goalsetterapi.herokuapp.com/api/goals/"+goal_assign_id+"/tasks";

  axios.get(searchLink, options).then(function (response) {
    const user_tasks = response.data.data.user_tasks;

    _("#spin_assign_task").style.display = "none";
    if (user_tasks == "") {
      _("#assign_place").innerHTML = `
            <div class="no_goal_icon team_empty">
                <div style="margin:auto; width:80%;"><img id="goal_icon" style="width:50px; height:50px;" src="images/task.png"></div>
                <p style="color:#3768a0;" id="">No task yet for this goal!</p>
            </div>
        `;
    } else {
      _("#assign_place").innerHTML = `<span>Assign</span>`;
      _("#revert_place").innerHTML = `<span style="color:red;">Revert</span>`;

      _("#add_assign").innerHTML = ``;
      _("#remove_assign").innerHTML = ``;
      
      for (let counter = 0; counter < user_tasks.length; counter++) {
        if (user_tasks[counter][1].task_status == 0) {
          var status_task = "<div style = 'position: absolute; padding: 5px; width: 10px; border-radius: 200px; background: tomato;' ></div>"
          if (user_tasks[counter][0] == "") {
            var assign_to = ""
          } else {
            var assign_to = "assigned to: " + user_tasks[counter][0].name
          }
            if (user_tasks[counter][1].assigned_id == null) {
              _("#assign_note").style.display = "none";
              _("#add_assign").innerHTML += `
                <div style="height:10px;"></div>
                  <div class="container-fluid" style="border-top:1px solid #e6e6e6;">
                      <div class="row  goal_plate box_part">
                          ${status_task}
                          <div class="col-5" style="margin-top:15px; font-weight: bold;">
                              <span style="border:1px solid rgb(117, 223, 117); padding: 5px;">Task:</span>
                              ${user_tasks[counter][1].task_title}
                              <div style="height:4px;"></div>
                              <p style="font-size:7px; color:black;">${assign_to}</p>
                          </div>
                          <div class="col-4" style="margin-top:20px; font-weight: bold;">
                            ${user_tasks[counter][1].due_date}
                          </div>
                          <div class="col col-3" style="margin-top:15px;">
                              <a class="btn" id="assignMemberTask" data-gettaskid="${user_tasks[counter][1].id}">Assign</a>
                          </div>
                      </div>
                </div>                    
            `;
            } else if (user_tasks[counter][1].assigned_id != null ) {
              _("#revert_note").style.display = "none";
              _("#remove_assign").innerHTML += `
                <div style="height:10px;"></div>
                  <div class="container-fluid" style="border-top:1px solid #e6e6e6;">
                      <div class="row  goal_plate box_part">
                          ${status_task}
                          <div class="col-5" style="margin-top:15px; font-weight: bold;">
                              <span style="border:1px solid rgb(117, 223, 117); padding: 5px;">Task:</span>
                              ${user_tasks[counter][1].task_title}
                              <div style="height:4px;"></div>
                              <p style="font-size:7px; color:black;">${assign_to}</p>
                          </div>
                          <div class="col-4" style="margin-top:15px; font-weight: bold;">
                              ${user_tasks[counter][1].due_date}
                          </div>
                          <div class="col col-3" style="margin-top:15px;">
                              <a class="btn" id="revertMemberTask" data-gettaskid="${user_tasks[counter][1].id}">Revert</a>
                          </div>
                      </div>
                </div>                    
            `;
            }
        }

      }
    }

  }).catch(function (err) {

  })

})

function assignTask(task_id) {
  const token = localStorage.getItem("goaltoken");

  const member_id = _("#member_id_assign").value; 

  const userData = {
    member_id: member_id,
    task_id: task_id
  }

  const options = {
    headers: {
      Authorization: token,
    }
  }
  _("#spin_assign_task").style.display = "block";
  const addLink = "https://goalsetterapi.herokuapp.com/api/task/assign";

  axios.put(addLink, userData, options).then(function (response) {


    if (response.data.data.hasOwnProperty("success")) {
      const msg = response.data.data.message;
      _("#spin_assign_task").style.display = "none";
      _("#show_assign_detail").style.display = "block";
      _("#show_assign_detail").innerHTML = `
          <div class="alert alert-success design_alert animated fadeIn" role="alert">
              (${msg})
          <p style="color:grey; float:right; margin-right: 25px;">Close</p>
          </div>
          `;
    }
    var select = document.getElementById("goal_assign");
    select.options.length = 0;
    _("#remove_assign").innerHTML = ``;
    _("#add_assign").innerHTML = ``;
    _("#assign_place").innerHTML = ``;
    _("#revert_place").innerHTML = ``;
    flowGoal();
  }).catch(function (err) {
    if (err.response) {
      console.log(err.response)
      _("#spin_assign_task").style.display = "none";
    }

  })
}



function revertTask(task_id) {
  const token = localStorage.getItem("goaltoken");


  const userData = {
    task_id: task_id
  }

  const options = {
    headers: {
      Authorization: token,
    }
  }
  _("#spin_assign_task").style.display = "block";
  const addLink = "https://goalsetterapi.herokuapp.com/api/task/revert";

  axios.put(addLink, userData, options).then(function (response) {

    if (response.data.data.hasOwnProperty("success")) {
      const msg = response.data.data.message;
      _("#spin_assign_task").style.display = "none";
      _("#show_assign_detail").style.display = "block";
      _("#show_assign_detail").innerHTML = `
          <div class="alert alert-success design_alert animated fadeIn" role="alert">
              (${msg})
          <p style="color:grey; float:right; margin-right: 25px;">Close</p>
          </div>
          `;
    }
    var select = document.getElementById("goal_assign");
    select.options.length = 0;
    _("#remove_assign").innerHTML = ``;
    _("#add_assign").innerHTML = ``;

    _("#assign_place").innerHTML = ``;
    _("#revert_place").innerHTML = ``;
    flowGoal();

  }).catch(function (err) {
    if (err.response) {
      console.log(err.response)
      _("#spin_assign_task").style.display = "none";
    }

  })
}