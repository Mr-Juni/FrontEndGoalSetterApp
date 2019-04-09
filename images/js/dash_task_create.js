task_save = _("#task_save");

if (task_save) {

    task_save.addEventListener("submit", function (e) {
        e.preventDefault();
        const task_title = _("#task_title").value;
        const description = _("#task_description").value;
        const begin_date = _("#task_begin_date").value;
        const due_date = _("#task_due_date").value;
        const begin_time = _("#begin_time").value;
        const due_time = _("#due_time").value;
        const goal_id = _('#goal_id_task').value;
        const reminder = _('#reminder').value;



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
            reminder: reminder
        }

        _("#spin_bx_add_task").style.display = "block";
        const taskLink = "https://goalsetterapi.herokuapp.com/api/goals/" + goal_id + "/tasks/create"
        console.log(taskLink)

        axios.post(taskLink, taskData, options).then(function (response) {

            _("#spin_bx_add_task").style.display = "none";

            console.log(response.data);
            _("#show_task").style.display = "block";
            _("#show_task").innerHTML = `
                <div class="alert alert-success design_alert animated fadeIn" role="alert">
                New Task Created!
                <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                </div>
                `;
        }).catch(function (err) {
            console.log(err.response)

            _("#spin_bx_add_task").style.display = "none";

            if (err.response.data.hasOwnProperty("task_title")) {
                let msg = err.response.data.task_title[0];
                _("#err_task_title").innerHTML = `${msg}`;
            }

            if (err.response.data.hasOwnProperty("description")) {
                let msg = err.response.data.description[0];
                _("#err_task_desc").innerHTML = `${msg}`;
            }

            if (err.response.data.hasOwnProperty("begin_date")) {
                let msg = err.response.data.begin_date[0];
                _("#err_task_begin").innerHTML = `${msg}`;
            }
            if (err.response.data.hasOwnProperty("due_date")) {
                let msg = err.response.data.due_date[0];
                _("#err_task_due").innerHTML = `${msg}`;
            }
            if (err.response.data.data.hasOwnProperty("error")) {
                let msg = err.response.data.data.message
                _("#show_task").style.display = "block";
                _("#show_task").innerHTML = `
                <div class="alert alert-danger design_alert" role="alert"> 
                 ${msg}
                 <p style="color:grey; float:right; margin-right: 25px;">Close</p>
                </div>
                `;
            }


        })

    })

}
