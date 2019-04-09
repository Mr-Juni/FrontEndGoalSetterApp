getGoal = _("#getGoal");

if (getGoal) {

  getGoal.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = _("#title").value;
    const description = _("#description").value;
    const begin_date = _("#begin_date").value;
    const due_date = _("#due_date").value;
    const level = _("#level").value;


    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var today_check = new Date(date);
    var begin_date_check = new Date(begin_date);
   
  

    if (begin_date_check < today_check) {

      _("#show_goal_dash").style.display = "block";
      return _("#show_goal_dash").innerHTML = `
        <div class="alert alert-danger design_alert" role="alert"> 
            The begin date cannot be below the current date! ${date}
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
    const goalLink = "https://goalsetterapi.herokuapp.com/api/goals/create";

    axios.post(goalLink, goalData, options).then(function (response) {

      console.log(response.data);

      _("#spin_bx_add_goal").style.display = "none";

      const goal_id =  response.data.data.goal.id;
      const goal_title = response.data.data.goal.title;
      console.log.apply(goal_id);

      _('#goal_id_task').value = `${goal_id}`;
      _('#goal_title_to_task').innerHTML = `${goal_title}`;

      _('#allgoals_point').innerHTML = ``;
      flowGoal();
      $('#myModal4').modal('toggle')

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
        _("#show_goal_dash").style.display = "block";
        _("#show_goal_dash").innerHTML = `
        <div class="alert alert-danger design_alert" role="alert"> 
            ${msg}
        </div>
        `;
      }
 
    })
    
  })

}
flowGoal();
function flowGoal(){
_('#allgoals_point').innerHTML += ``;
_('#spin_2').style.display = "block";
_('#all_goals').innerHTML = ``;
_('#spin').style.display = "block";

const viewgoalsUrl = "https://goalsetterapi.herokuapp.com/api/goals";

const token = localStorage.getItem("goaltoken");

const options = {
  headers: {
    Authorization: token,
  }
}
  axios.get(viewgoalsUrl, options).then(function (response) {
    
    
    if (response.data) {
      _('#spin').style.display = "none";
      _('#spin_2').style.display = "none";
      
    }
    const goals = response.data.data.goals;

    if (goals == "") {
     _('#all_goals').innerHTML = `
      <div class="no_goal_icon">
        <div style="width: 65%; margin:auto;"><i class="fas fa-box-open icons" style="color:skyblue;"></i></div>
        <p style="color:#3768a0" id="">You have no Goal</p>
        <div style="width: 80%; margin:auto;">
          <a class="btn btn-primary" id="v-pills-activities-tab" data-toggle="pill" href="#v-pills-activities" role="tab"
            aria-controls="v-pills-activities" aria-selected="false" style="font-weight:bold; font-size: 10px; border:1px solid skyblue; background-color:white; color:#3768a0;">
            Add Goals
           </a>
        </div>
      </div>
      `;
      _('#allgoals_point').innerHTML = `
      <div class="no_goal_icon">
        <div style="width: 65%; margin:auto;"><i class="fas fa-box-open icons" style="color:skyblue;"></i></div>
        <p style="color:#3768a0" id="">You have no Goal</p>
        <div style="width: 80%; margin:auto;">
          <a class="btn btn-primary" id="v-pills-activities-tab" data-toggle="pill" href="#v-pills-activities" role="tab"
            aria-controls="v-pills-activities" aria-selected="false" style="font-weight:bold; font-size: 10px;border:1px solid skyblue; background-color:white; color:#3768a0;">
            Add Goals
           </a>
        </div>
      </div>
      `;
    }else{
          for (let goal of goals) {
            _('#all_goals').innerHTML += `
            <div style="height:10px;"></div>
              <div class="container-fluid box_part">
                      <div class="row goal_plate">
                          <div class="col-5" style="margin-top:15px; font-weight:bold;">
                          <img id="goal_icon" src="images/soccer.png"> ${goal.title}
                          </div>
                           <div id="tiny_font" class="col-5"style="margin-top:15px;">
                             ${goal.begin_date} — ${goal.due_date}
                           </div>
                          <div class="col col-2" style="margin-top:15px;">
                              <a class="btn" href="goals.html?goal=${goal.id}">View</a>
                          </div>
                      </div>
              </div>
        `;
            _('#allgoals_point').innerHTML += `
             <div style="height:10px;"></div>
                <div class="container-fluid" >
                    <div class="row  goal_plate box_part">
                        <div class="col-5"style="margin-top:15px;  font-weight:bold;">
                        <img id="goal_icon" src="images/soccer.png"> ${goal.title}
                        </div>
                        <div id="tiny_font" class="col-5"style="margin-top:15px;">
                          ${goal.begin_date} — ${goal.due_date}
                          </div>
                        <div class="col col-2" style="margin-top:15px;">
                            <a class="btn" href="goals.html?goal=${goal.id}">View</a>
                        </div>
                    </div>
               </div>
        `;
          }

          _('#all_goal').innerHTML = `
          ${goal.title}
      `;
    }

  }).catch(function (err) {
    
  })
}
