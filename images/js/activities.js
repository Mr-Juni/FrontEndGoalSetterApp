


dash_highlight();
// View Users Profile
function dash_highlight() {

    const activitiesUrl = "https://goalsetterapi.herokuapp.com/api/activities";

    const token = localStorage.getItem("goaltoken");

    const options = {
      headers: {
        Authorization: token,
      }
    }

      axios.get(activitiesUrl, options).then(function (response) {

          const activities = response.data.data.activities;

          if (activities) {
              _('#spin_activities').style.display = "none";
              _('#spin_all_activities').style.display = "none";  
              _("#dash_highlight").innerHTML = ``; 
              _("#all_activities").innerHTML = ``; 
              if (activities == "") {
                  _("#dash_highlight").innerHTML += `There are no recent activities`;
              } else {
                  for (let activity of activities) {
                      _("#dash_highlight").innerHTML += `<li><img style="float:left;" id="activities_icon" src="images/arr.png"><p style="margin-left:20px">${activity.narrative}</p></li>`;
                      _("#all_activities").innerHTML += `<li><img style="float:left;" id="activities_icon" src="images/arr.png"><p style="margin-left:20px">${activity.narrative}</p></li>`;
                       }
            }
        }
    }).catch(function (err) {
    
    })

}

setInterval(() => {
    activitiesReloder();
}, 30000);

function activitiesReloder() {
_("#dash_highlight").innerHTML += `<div id="spin_activities"></div>`; 
_("#all_activities").innerHTML += `<div id="spin_all_activities"></div>`; 
  dash_highlight();

}
