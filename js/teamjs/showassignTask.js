// ------------------------------------------------------------------------sget task through event members
assignTo();
function assignTo(){

    const token = localStorage.getItem("goaltoken");

    const options = {
        headers: {
            Authorization: token,
        }
    }

    const showLink = "https://goalsetterapi.herokuapp.com/api/show/assigned/task/to";

    axios.get(showLink, options).then(function (response) {
        
        _("#spin_assign_spinner_1").style.display = "none";
        console.log(response.data);
        const assign_to = response.data.data.assign_to;
        if (assign_to == "") {
            _("#assign_to_show").innerHTML = `
                 <div class="no_assignTask_icon">
                    <p style="color:#3768a0; text-align:center;">
                    <img id="goal_icon" style="width:50px; height:50px;" src="images/task.png"> You have not assigned any Task yet!</p>
                </div>
        `;
        } else {
            _("#assign_to_show").innerHTML = ``;
           
        for (let counter = 0; counter < assign_to.length; counter++) {
            if (counter != 0) {
               var gap = '<div style="height:5px;"></div>';
            }else{
                var gap = '<div style="height:1px;"></div>';
            }
            if (assign_to[counter][2].task_status == 1) {
                var status = "<p style='color:green;margin:0;'>Competed</p>";
            }else{
                var status = "<p style='color:tomato;margin:0;'>Not Competed</p>";
            }
            if (assign_to[counter][1].task_status == 1) {
                var status_goal = "<p style='color:green;margin:0;'>Competed</p>";
            } else {
                var status_goal = "<p style='color:tomato;margin:0;'>Not Competed</p>";
            }
        _("#assign_to_show").innerHTML += `
            ${gap}
            <div class="container-fluid">
                <div class="row  goal_plate box_part" style="font-size:9px;">
                    <div class="col-3" style="margin-top:20px; font-weight: bold;">
                    <span style="border:1px solid rgb(117, 223, 117); padding: 5px;">Task:</span>
                    ${assign_to[counter][2].task_title}
                    </div>
                    <div id="tiny_font" class="col-4" style="margin-top:15px;font-weight: bold;">
                    <span>
                        <!-- <div style="position:absolute; padding:5px; width:10px; border-radius:200px; background: red;"></div> -->
                        <div style="position:absolute;padding:5px; width:10px; border-radius:200px; background: lightgreen;"></div>
                        <img style="border-radius: 50px;" src="http://res.cloudinary.com/getfiledata/image/upload/w_30,c_thumb,ar_4:4,g_face/${assign_to[counter][0].user_image}" />
                    </span>
                    <span style="border:1px solid rgb(117, 223, 117); padding: 5px; ">To:</span>
                    ${assign_to[counter][0].name}&nbsp;
                
                    </div>
                    <div id="tiny_font" class="col-3" style="margin-top:20px;font-weight: bold;">
                    <span style="border:1px solid rgb(117, 223, 117); padding: 5px;">Due:</span>
                    ${new Date(assign_to[counter][2].created_at).toLocaleDateString()}
                    </div>
                    <div id="btn_reduce" class="col col-1" style="margin-top:20px;">
                    <a class="btn btn_view assign_to_view" 
                        data-gettaskid="${assign_to[counter][2].id}"
                        data-assignid="${assign_to[counter][0].id}"
                        data-username="${assign_to[counter][0].name}"
                        data-phone="${assign_to[counter][0].phone_number}"
                        data-email="${assign_to[counter][0].email}"
                        data-userimage="${assign_to[counter][0].user_image}"
                        data-tasktitle="${assign_to[counter][2].task_title}"  
                        data-taskstatus="${status}" 
                        data-taskstat="${assign_to[counter][2].task_status}"
                        data-taskreminder="${assign_to[counter][2].reminder}"
                        data-taskbegin="${assign_to[counter][2].begin_time}"
                        data-taskdue="${assign_to[counter][2].due_time}"
                        data-goalid="${assign_to[counter][1].id}" 
                        data-goalname="${assign_to[counter][1].title}" 
                        data-goalstatus="${status_goal}" 
                        data-goalduedate="${new Date(assign_to[counter][2].created_at).toLocaleDateString()}"
                        data-taskduedate="${new Date(assign_to[counter][1].created_at).toLocaleDateString()}"
                        data-toggle="modal" data-target="#assignToInfo">View</a>
                    </div>
                
                </div>
            </div>
        `;
        }
     }
    }).catch(function (err) {
        _("#spin_assign_spinner_1").style.display = "none";
        console.log(err.response);
    })

}


assignFrom();
function assignFrom() {

    const token = localStorage.getItem("goaltoken");

    const options = {
        headers: {
            Authorization: token,
        }
    }

    const showLink = "https://goalsetterapi.herokuapp.com/api/show/assigned/task/from";

    axios.get(showLink, options).then(function (response) {
        _("#spin_assign_spinner_2").style.display = "none";
        console.log(response.data);
        const assign_from = response.data.data.assign_from;
        if (assign_from == "") {
            _("#assign_from_show").innerHTML = `
            <div class="no_assignTask_icon ">
                <p style="color:#3768a0; text-align:center;" id=""><img id="goal_icon" style="width:50px; height:50px;" src="images/task.png"> No member assigned a task t you!</p>
            </div>
        `;
        } else {
            _("#assign_from_show").innerHTML = ``;

            for (let counter = 0; counter < assign_from.length; counter++) {
                    if (counter != 0) {
                        var gap = '<div style="height:5px;"></div>';
                    } else {
                        var gap = '<div style="height:1px;"></div>';
                    }
                if (assign_from[counter][2].task_status == 1) {
                    var status = "<p style='color:green;margin:0;'>Competed</p>";
                } else {
                    var status = "<p style='color:tomato;margin:0;'>Not Competed</p>";
                }
                if (assign_from[counter][1].task_status == 1) {
                    var status_goal = "<p style='color:green;margin:0;'>Competed</p>";
                } else {
                    var status_goal = "<p style='color:tomato;margin:0;'>Not Competed</p>";
                }
                _("#assign_from_show").innerHTML += `
               ${gap}
            <div class="container-fluid">
                <div class="row  goal_plate box_part" style="font-size:9px;">
                    <div class="col-3" style="margin-top:20px; font-weight: bold;">
                    <span style="border:1px solid rgb(117, 223, 117); padding: 5px;">Task:</span>
                    ${assign_from[counter][2].task_title}
                    </div>
                    <div id="tiny_font" class="col-4" style="margin-top:15px;font-weight: bold;">
                    <span>
                        <!-- <div style="position:absolute; padding:5px; width:10px; border-radius:200px; background: red;"></div> -->
                        <div style="position:absolute;padding:5px; width:10px; border-radius:200px; background: lightgreen;"></div>
                        <img style="border-radius: 50px;" src="http://res.cloudinary.com/getfiledata/image/upload/w_30,c_thumb,ar_4:4,g_face/${assign_from[counter][0].user_image}" />
                    </span>
                    <span style="border:1px solid rgb(117, 223, 117); padding: 5px; ">From:</span>
                    ${assign_from[counter][0].name}&nbsp;             
                    </div>
                    <div id="tiny_font" class="col-3" style="margin-top:20px;font-weight: bold;">
                       <span style="border:1px solid rgb(117, 223, 117); padding: 5px;">Due:</span>
                       ${new Date(assign_from[counter][2].created_at).toLocaleDateString()}
                    </div>
                    <div id="btn_reduce" class="col col-1" style="margin-top:20px;">
                    <a class="btn btn_view assign_to_view" data-getuserid="${assign_from[counter][0].name}"
                        data-gettaskid="${assign_from[counter][2].id}"
                        data-assignid="${assign_from[counter][0].id}"
                        data-username="${assign_from[counter][0].name}"
                        data-phone="${assign_from[counter][0].phone_number}"
                        data-email="${assign_from[counter][0].email}"
                        data-userimage="${assign_from[counter][0].user_image}"
                        data-tasktitle="${assign_from[counter][2].task_title}"  
                        data-taskstatus="${status}" 
                         data-taskstat="${assign_from[counter][2].task_status}"
                        data-taskreminder="${assign_from[counter][2].reminder}"
                        data-taskbegin="${assign_from[counter][2].begin_time}"
                        data-taskdue="${assign_from[counter][2].due_time}"
                        data-goalid="${assign_from[counter][1].id}" 
                        data-goalname="${assign_from[counter][1].title}" 
                         data-goalstatus="${status_goal}" 
                        data-goalduedate="${new Date(assign_from[counter][2].created_at).toLocaleDateString()}"
                        data-taskduedate="${new Date(assign_from[counter][1].created_at).toLocaleDateString()}"
                        data-toggle="modal" data-target="#assignToInfo">View</a>
                    </div>
                
                </div>
            </div>
        `;
            }
        }
    }).catch(function (err) {
        _("#spin_assign_spinner_2").style.display = "none";
        console.log(err.response);
    })

}

completeTask = _("#completeTask");

if (completeTask) {

    completeTask.addEventListener("submit", function (e) {
        e.preventDefault();
        let task_status = _("#complete_task_status").value;
        let goal_id = _("#complete_goal_id").value;
        let task_id = _("#complete_task_id").value;

        console.log(task_status)
        console.log(goal_id)
        console.log(task_id)

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
            console.log(response.data)
            _("#spin_bx_com").style.display = "none";
            $("#completeTask").modal("toggle");
            $("#assignToInfo").modal("toggle");
            assignTo();
            assignFrom();

        }).catch(function (err) {
            console.log(err.response)
            _("#spin_bx_com").style.display = "none";


        })

    })

}
