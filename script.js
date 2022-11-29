window.addEventListener("load", () => {

  async function getAstronauts() {
    let response = await fetch(
      "https://handlers.education.launchcode.org/static/astronauts.json"
    );
    let data = await response.json();
    const header = document.getElementById("header");
    header.innerHTML += `: ${data.length}`

    let astronauts = [];

    while (data.length > 0) {
      let index = 0;
      let mostHours = 0;

      for (let i = 0; i < data.length; i++) {
        if (data[i].hoursInSpace > mostHours) {
          index = i;
          mostHours = data[i].hoursInSpace;
        }
      }

      astronauts.push(data.splice(index, 1)[0]);
    }

    const contents = document.getElementById("container");

    for (let element of astronauts) {
      const skillsString = element.skills.join(", ");
      let isActive = "notActive";

      if (element.active) {
        isActive = "active";
      }

      contents.innerHTML += `
            <div class="astronaut">
                <div class="bio">
                    <h3>${element.firstName} ${element.lastName}</h3>
                    <ul>
                        <li>Hours in space: ${element.hoursInSpace}</li>
                        <li><span class="${isActive}">Active: ${element.active}</span></li>
                        <li>Skills: ${skillsString}</li>
                    </ul>
                </div>
                <img src="${element.picture}" class="avatar">
            </div>
            `;
    }
  }

    getAstronauts();

//   document.getElementById("header").addEventListener("click", function () {
//     getAstronauts();
//   });
});
