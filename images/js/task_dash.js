allTask();
function allTask() {
_('#spin_2').style.display = "block";

const viewgoalsUrl = "https://goalsetterapi.herokuapp.com/api/goals/"+goal_id+"/tasks";

const token = localStorage.getItem("goaltoken");


console.log(token)

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
        console.log(response.data);

        for (let task of user_tasks) {

            if (task.task_status == 0) {
                var status_task = "Not Completed"
            } else if (task.task_status == 1) {
                var status_task = "Completed"
            }

            _('#alltask_point').innerHTML += `
             <div style="height:10px;"></div>
            <div class="container-fluid box_part">
                <div class="row  goal_plate">
                    <div class="col-5"style="margin-top:10px;  font-weight:bold;" id="tiny_font_title">
                    <img id="goal_icon" style="width:20px; height:20px;" src="images/task.png"> ${task.task_title}
                    </div>
                    <div id="tiny_font" class="col-5"style="margin-top:10px;">
                             <b>BEGIN:</b> ${task.begin_date} - <b>DUE:</b> : ${task.due_date}
                    </div> 
                    <div id="btn_reduce" class="col col-2" style="margin-top:10px;">
                    <a class="btn task_view"  data-getid="${task.id}" data-gettitle="${task.task_title}" data-getbegin="${task.begin_date}" data-getdue="${task.due_date}" data-getstatus="${status_task}"  data-getdesc="${task.description}" data-getcreated="${task.created_at}" data-toggle="modal" data-target="#taskInfo">View</a>
                    </div>
                </div>
            </div>
             
        `;

        }
    } else {
        _('#alltask_point').innerHTML += `
            <div class="no_goal_icon">
                <div style="width: 65%; margin:auto;"><i class="fas fa-box-open icons"></i></div>
                <p style="color:#3768a0" id="">No added task yet!</p>
                <div style="width: 80%; margin:auto;">
                <a class="btn btn-primary" id="v-pills-activities-tab" data-toggle="pill" href="#v-pills-add_task" role="tab"
                    aria-controls="v-pills-activities" aria-selected="false" style="font-weight:bold; font-size: 10px; color:white; border:0px; background-color:#3768a0;">
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
        _("#err_task_begin").style.display = "none";
        _("#err_task_due").style.display = "none";
        
        const task_title = _("#task_title").value;
        const description = _("#task_description").value;
        const begin_date = _("#task_begin_date").value;
        const due_date = _("#task_due_date").value;
        const begin_time = _("#begin_time").value;
        const due_time = _("#due_time").value;
        const add_reminder = _("#addReminder").value;

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var today_check = new Date(date);
        var begin_date_check = new Date(begin_date);



        if (begin_date_check < today_check) {
            _("#spin_add_task").style.display = "none";
            _("#show_task_dash").style.display = "block";
            return _("#show_task_dash").innerHTML = `
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

            console.log(response.data);

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
            console.log(err.response)

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

            if (err.response.data.hasOwnProperty("begin_date")) {
                let msg = err.response.data.begin_date[0];
                _("#err_task_begin").style.display = "block";
                _("#err_task_begin").innerHTML = `${msg}`;
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

        const task_title = _("#title").value;
        const description = _("#description").value;
        const begin_date = _("#begin_date").value;
        const due_date = _("#due_date").value;
        const task_id = _("#task_id_edit").value;
        const begin_time = _("#begin_time").value;
        const due_time = _("#due_time").value;
        const edit_reminder = _("#editReminder").value;


        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var today_check = new Date(date);
        var begin_date_check = new Date(begin_date);



        if (begin_date_check < today_check) {
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
        console.log(token)

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
            reminder:editReminder
        }

        const taskLink = "https://goalsetterapi.herokuapp.com/api/goals/" + goal_id + "/tasks/" + task_id +"/edit";

        axios.put(taskLink, taskData, options).then(function (response) {

            console.log(response.data);

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
            console.log(err.response)

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
        console.log(deleteLink)

        axios.delete(deleteLink, options).then(function (response) {

            console.log(response.data);
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

                console.log(err.response)

            }


        })

    })

}

