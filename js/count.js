// Count  all goals
goalCount();
function goalCount() {

    const goalCountUrl = "https://goalsetterapi.herokuapp.com/api/count/goals";

    const token = localStorage.getItem("goaltoken");

    const options = {
      headers: {
        Authorization: token,
      }
    }
      axios.get(goalCountUrl, options).then(function (response) {

          const goalsCount = response.data.data.goalsCount;
          const goalsCompleted = response.data.data.goalsCompleted;
          const goalsUncompleted = response.data.data.goalsUncompleted;
          if (goalsCount || goalsCompleted || goalsIncompleted) {
              _("#total_goals").innerHTML = goalsCount; 
              _("#completed_goals").innerHTML = goalsCompleted; 
              _("#uncompleted_goals").innerHTML = goalsUncompleted; 
      
        }
    }).catch(function (err) {
    
    })

}



// Count All Tasks
taskCount();
function taskCount() {

    const taskCountUrl = "https://goalsetterapi.herokuapp.com/api/count/tasks";

    const token = localStorage.getItem("goaltoken");

    const options = {
      headers: {
        Authorization: token,
      }
    }
      axios.get(taskCountUrl, options).then(function (response) {
       
          const tasksCount = response.data.data.taskCount;
          const tasksCompleted = response.data.data.tasksCompleted;
          const tasksUncompleted = response.data.data.tasksUncompleted;
          if (tasksCount || tasksCompleted || tasksUncompleted) {
              _("#total_tasks").innerHTML = tasksCount; 
              _("#completed_tasks").innerHTML = tasksCompleted; 
              _("#uncompleted_tasks").innerHTML = tasksUncompleted; 

        }
    }).catch(function (err) {
    
    })

}

setInterval(() => {
    countReloder();
}, 30000);

function countReloder() {
    goalCount();
    taskCount();
}