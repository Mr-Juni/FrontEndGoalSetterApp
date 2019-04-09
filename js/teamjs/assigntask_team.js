flowGoal();

function flowGoal() {
  console.log("start")
const viewgoalsUrl = "https://goalsetterapi.herokuapp.com/api/goals";

const token = localStorage.getItem("goaltoken");

const options = {
  headers: {
    Authorization: token,
  }
}
  axios.get(viewgoalsUrl, options).then(function (response) {
    console.log(response.data)
    const goals = response.data.data.goals;
    var select = document.getElementById("goal_assign");
    
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