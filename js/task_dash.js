allTask();
function allTask() {
_('#spin_2').style.display = "block";

const viewgoalsUrl = "https://goalsetterapi.herokuapp.com/api/goals/"+goal_id+"/tasks";

const token = localStorage.getItem("goaltoken");


const options = {
    headers: {
        Authorization: token,
    }
}
axios.get(viewgoalsUrl, options).then(function (response) {


    if (response.data) {
        _('#spin_2').style.display = "none";

    }
    const user_tasks = response.data.data.user_tasks;


    if (user_tasks) {
        _('#alltask_point').innerHTML = ``;
        
        for (let counter = 0; counter < user_tasks.length; counter++) {
            if (user_tasks[counter][1].task_status == 0) {
                var indicator = '<div style="position:absolute;padding:5px; width:10px; border-radius:200px; background: tomato;"></div>';
                var status_task = "<p style='color:tomato;'>Not Completed</p>";

            } else if (user_tasks[counter][1].task_status == 1) {
                var indicator = '<div style="position:absolute;padding:5px; width:10px; border-radius:200px; background: lightgreen;"></div>';
                var status_task = "<p style='color:green;'>Completed</p>";
            }
            if (user_tasks[counter][0] == "") {
                var assign_to = ""
            }else{
                var assign_to = "assigned to: "+user_tasks[counter][0].name
            }

            _('#alltask_point').innerHTML += `
             <div style="height:10px;"></div>
            <div class="container-fluid">
                <div class="row  goal_plate box_part" style="fontsize:9px;">                 
                    <div class="col-5"style="margin-top:15px;  font-weight:bold;" id="tiny_font_title">
                    <img id="goal_icon" style="width:20px; height:20px;" src="images/task.png"> ${user_tasks[counter][1].task_title}
                    <p style="font-size:7px; color:black;">${assign_to}</p>
                    </div>
                    <div id="tiny_font" class="col-1"style="margin-top:15px;">
                        ${indicator}
                    </div> 
                    <div id="tiny_font" class="col-4"style="margin-top:15px;">
                        ${user_tasks[counter][1].due_date}
                    </div> 
                    <div id="btn_reduce" class="col col-2" style="margin-top:15px;">   
                    <a class="btn task_view"  
                    data-getid="${user_tasks[counter][1].id}" 
                    data-gettitle="${user_tasks[counter][1].task_title}"
                    data-getbegintime="${user_tasks[counter][1].begin_time}"
                    data-getduetime="${user_tasks[counter][1].due_time}"
                    data-getreminder="${user_tasks[counter][1].reminder}"
                    data-getdue="${user_tasks[counter][1].due_date}" 
                    data-getstatus="${status_task}" 
                    data-taskstatus="${user_tasks[counter][1].task_status}" 
                    data-getdesc="${user_tasks[counter][1].description}" 
                    data-getcreated="${user_tasks[counter][1].created_at}"
                    data-toggle="modal" data-target="#taskInfo">View</a>
                    </div>
                </div>
            </div>
             
        `;
            
        }
    } else {
        _('#alltask_point').innerHTML += `
            <div class="no_goal_icon">
                <div style="width: 65%; margin:auto;"><i class="fas fa-box-open icons" style="color:skyblue;"></i></div>
                <p style="color:#3768a0" id="">No added task yet!</p>
                <div style="width: 80%; margin:auto;">
                    <a class="btn btn-primary" id="v-pills-activities-tab" data-toggle="pill" href="#v-pills-add_task" role="tab"
                        aria-controls="v-pills-activities" aria-selected="false" style="font-weight:bold; font-size: 10px;  border:1px solid skyblue; background-color:white;color:#3768a0;">
                        Add Task
                    </a>
                </div>
            </div>
            `;
       
    }

}).catch(function (err) {

})
}
/// ADDiING A TASK TO THE THE GOAL

add_a_task = _("#add_a_task");

if (add_a_task) {

    add_a_task.addEventListener("submit", function (e) {
        e.preventDefault();
        _("#spin_add_task").style.display = "block";
        _("#err_task_title").style.display = "none";
        _("#err_task_desc").style.display = "none";
        _("#err_task_due").style.display = "none";
        
        const task_title = _("#task_title").value;
        const description = _("#task_description").value;
        const due_date = _("#task_due_date").value;
        const begin_time = _("#begin_time").value;
        const due_time = _("#due_time").value;
        const add_reminder = _("#addReminder").value;

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var today_check = new Date(date);
        var due_date_check = new Date(due_date);



        if (due_date_check < today_check) {
            _("#spin_add_task").style.display = "none";
            _("#show_task_dash").style.display = "block";
            return _("#show_task_dash").innerHTML = `
                    <div class="alert alert-danger design_alert" role="alert"> 
                        Due date cannot be below current date! ${date}
                        <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                    </div>
                    `;

        }


        const token = localStorage.getItem("goaltoken");

        const options = {
            headers: {
                Authorization: token,
            }
        }

        const taskData = {
            task_title: task_title,
            description: description,
            begin_date: begin_date,
            due_date: due_date,
            begin_time: begin_time,
            due_time: due_time,
            reminder: add_reminder
        }
        
        const taskLink = "https://goalsetterapi.herokuapp.com/api/goals/" + goal_id + "/tasks/create";

        axios.post(taskLink, taskData, options).then(function (response) {

            _("#spin_add_task").style.display = "none";
            _("#show_task_dash").style.display = "block";
            _("#show_task_dash").innerHTML = `
                <div class="alert alert-success design_alert" role="alert"> 
                    New Task Added
                    <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                </div>
                `;
            _("#alltask_point").innerHTML = ``;
            
            allTask();

        }).catch(function (err) {

            _("#spin_add_task").style.display = "none";

            if (err.response.data.hasOwnProperty("task_title")) {
                let msg = err.response.data.task_title[0];
                _("#err_task_title").style.display = "block";
                _("#err_task_title").innerHTML = `${msg}`;
            }

            if (err.response.data.hasOwnProperty("description")) {
                let msg = err.response.data.description[0];
                _("#err_task_desc").style.display = "block";
                _("#err_task_desc").innerHTML = `${msg}`;
            }

            if (err.response.data.hasOwnProperty("due_date")) {
                let msg = err.response.data.due_date[0];
                _("#err_task_due").style.display = "block";
                _("#err_task_due").innerHTML = `${msg}`;
            }
            if (err.response.data.data.hasOwnProperty("error")) {
                let msg = err.response.data.data.message
                _("#show_task_dash").style.display = "block";
                _("#show_task_dash").innerHTML = `
                    <div class="alert alert-danger design_alert" role="alert"> 
                        ${msg}
                       <p style="color:grey; float:right; margin-right: 25px;">Close</p>     
                    </div>
                    `;
            }

        })

    })

}

//Edit task


edit_a_task = _("#edit_a_task");

if (edit_a_task) {

    edit_a_task.addEventListener("submit", function (e) {
        e.preventDefault();
        _("#spin_bx_task_edit").style.display = "block";

        const task_title = _("#edit_task_title").value;
        const description = _("#edit_task_description").value;
        const due_date = _("#edit_task_due_date").value;
        const task_id = _("#task_id_edit").value;
        const begin_time = _("#edit_task_begin_time").value;
        const due_time = _("#edit_task_due_time").value;
        const editReminder = _("#editReminder").value;


        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var today_check = new Date(date);
        var due_date_check = new Date(due_date);



        if (due_date_check < today_check) {
            _("#spin_bx_task_edit").style.display = "none";
            _("#show_task_edit").style.display = "block";
            return _("#show_task_edit").innerHTML = `
                    <div class="alert alert-danger design_alert cls" role="alert"> 
                        The begin date cannot be less than the current date! ${date}
                        <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                    </div>
                    `;

        }


        const token = localStorage.getItem("goaltoken");

        const options = {
            headers: {
                Authorization: token,
            }
        }

        const taskData = {
            task_title: task_title,
            description: description,
            due_date: due_date,
            begin_time: begin_time,
            due_time: due_time,
            reminder:editReminder
        }

        const taskLink = "https://goalsetterapi.herokuapp.com/api/goals/" + goal_id + "/tasks/" + task_id +"/edit";

        axios.put(taskLink, taskData, options).then(function (response) {


            _("#spin_bx_task_edit").style.display = "none";
            _("#show_task_edit").style.display = "block";
            _("#show_task_edit").innerHTML = `
                <div class="alert alert-success design_alert cls" role="alert"> 
                    Task Updated
                    <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                </div>
                `;
            _("#alltask_point").innerHTML = ``;

            allTask();

        }).catch(function (err) {

            _("#spin_bx_task_edit").style.display = "none";

            if (err.response.data.hasOwnProperty("task_title")) {
                let msg = err.response.data.task_title[0];
                _("#err_task_title_edit").innerHTML = `${msg}`;
            }

            if (err.response.data.hasOwnProperty("description")) {
                let msg = err.response.data.description[0];
                _("#err_task_desc_edit").innerHTML = `${msg}`;
            }

            if (err.response.data.hasOwnProperty("begin_date")) {
                let msg = err.response.data.begin_date[0];
                _("#err_task_begin_edit").innerHTML = `${msg}`;
            }
            if (err.response.data.hasOwnProperty("due_date")) {
                let msg = err.response.data.due_date[0];
                _("#err_task_due_edit").innerHTML = `${msg}`;
            }

          
            if (err.response.data.hasOwnProperty("status") && err.response.data.data.hasOwnProperty("error")) {
            let msg = err.response.data.data.message
            _("#show_task_edit").style.display = "block";
            _("#show_task_edit").innerHTML = `
                    <div class="alert alert-danger design_alert cls" role="alert"> 
                        ${msg}
                       <p style="color:grey; float:right; margin-right: 25px;">Close</p>     
                    </div>
                    `;
         }

        })

    })

}


completeTask = _("#completeTask");

if (completeTask) {

    completeTask.addEventListener("submit", function (e) {
        e.preventDefault();
        let task_status = _("#task_status_complete").value;
        let task_id = _("#complete_task_id").value;


        if (task_status == "0") {
            task_status = 1;
        } else if (task_status == "1") {
            task_status = 0;
        }

        const token = localStorage.getItem("goaltoken");

        const options = {
            headers: {
                Authorization: token,
            }
        }

        const taskData = {
            task_status: task_status
        }

        _("#spin_bx_com").style.display = "block";

        const taskLink = "https://goalsetterapi.herokuapp.com/api/goals/"+goal_id+"/tasks/"+task_id+"/status";

        axios.put(taskLink, taskData, options).then(function (response) {

            _("#spin_bx_com").style.display = "none";
            $("#completeTask").modal("toggle");
            $("#taskInfo").modal("toggle");
            oneGoalget();
            allTask();

        }).catch(function (err) {
     
            _("#spin_bx_com").style.display = "none";


        })

    })

}

//Delete A task
delete_task= _("#delete_task");

if (delete_task) {

    delete_task.addEventListener('submit', function (e) {
        e.preventDefault();
        const task_id = _("#task_id_delete").value;
        const token = localStorage.getItem("goaltoken");

        const options = {
            headers: {
                Authorization: token,
            }
        }

        _("#spin_bx_task_delete").style.display = "block";
        const deleteLink = "https://goalsetterapi.herokuapp.com/api/goals/" + goal_id + "/tasks/" + task_id + "/delete";

        axios.delete(deleteLink, options).then(function (response) {

            _("#spin_bx_task_delete").style.display = "none";

            $('#taskedit').modal('hide');
            $('#taskInfo').modal('hide');
            $('#del_one_task').modal('hide');
            _("#alltask_point").innerHTML = ``;
            allTask();

            //   $('#myModal4').modal('toggle')
        }).catch(function (err) {

            if (err.response) {
                // _("#loader").style.display = "none";
                _("#spin_bx_task_delete").style.display = "none";


            }


        })

    })

}

