/**
 *  author: Nathan Wright
 *  class: lc_101
 *  section: sept 2022
 *  instructor: Carry Jones
 */

window.addEventListener("load", () => {

  async function getAstronauts() {
    let response = await fetch("https://handlers.education.launchcode.org/static/astronauts.json");
    let jsonArray = await response.json();
    jsonArray.sort(function (b, a) {return a.hoursInSpace - b.hoursInSpace;});

    // add count to page title
    document.getElementById("header").innerHTML += `: ${jsonArray.length}`;

    
    const contents = document.getElementById("container");
    for (let element of jsonArray) {
      const isActive = element.active ? "active" : "";

      contents.innerHTML += `
            <div class="astronaut">
                <div class="bio">
                    <h3>${element.firstName} ${element.lastName}</h3>
                    <ul>
                        <li>Hours in space: ${element.hoursInSpace}</li>
                        <li><span class="${isActive}">Active: ${element.active}</span></li>
                        <li>Skills: ${element.skills.join(", ")}</li>
                    </ul>
                </div>
                <img src="${element.picture}" class="avatar">
            </div>
            `;
    }
  }

  getAstronauts();

  //  click on header to initiate api request
  //   document.getElementById("header").addEventListener("click", function () {
  //     getAstronauts();
  //   });
});
