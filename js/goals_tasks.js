// Count  all goals
goalTaskCount();
function goalTaskCount() {

    const goalTaskCountUrl = `https://goalsetterapi.herokuapp.com/api/count/goal/tasks/`+goal_id;

    console.log(goalTaskCountUrl)

    const token = localStorage.getItem("goaltoken");

    const options = {
      headers: {
        Authorization: token,
      }
    }

      axios.get(goalTaskCountUrl, options).then(function (response) {
          
        
        console.log(response.data)
          const goalTaskCount = response.data.data.goalTaskCount;
          const goalTaskCompleted = response.data.data.tasksCompleted;
          const goalTaskUncompleted = response.data.data.tasksUncompleted;
          
          if (goalTaskCount || goalTaskCompleted || goalTaskUncompleted) {
            console.log(goalTaskCount)
            console.log(goalTaskCompleted)
            console.log(goalTaskUncompleted)
              _("#totalTask").value = goalTaskCount; 
              _("#totalCompleted").value = goalTaskCompleted; 
              _("#totalUncompleted").value = goalTaskUncompleted; 

        }
    }).catch(function (err) {
    
    })

}