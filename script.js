// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">

*/

window.addEventListener("load", function() {

   let submitButton = document.getElementById('formSubmit')

      submitButton.addEventListener("click", function(e) {
         let pilotName = document.querySelector("input[name=pilotName]");
         let coPilotName = document.querySelector("input[name=copilotName]");
         let fuelLevel = document.querySelector("input[name=fuelLevel]"); 
         let cargoMass = document.querySelector("input[name=cargoMass]");
         let pilotNameValue = pilotName.value;
         let copilotValue = coPilotName.value;
         let faultyList = document.getElementById("faultyItems");
         let launchStatus = document.getElementById("launchStatus");
         let fuelStatus = document.getElementById('fuelStatus');
         let cargoStatus = document.getElementById('cargoStatus');
         

         document.getElementById("pilotStatus").prepend(`${pilotNameValue} is`);
         document.getElementById("copilotStatus").prepend(`${copilotValue} is`);
         let json = [];
         fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
               response.json().then( function(json) {
                  
                  const div = document.getElementById("missionTarget");
                  // Add HTML that includes the JSON data
                  div.innerHTML = `
                  <h2>Mission Destination</h2>
                  <ol>
                     <li>Name: ${json[0].name}</li>
                     <li>Diameter: ${json[0].diameter}</li>
                     <li>Star: ${json[0].star}</li>
                     <li>Distance from Earth: ${json[0].distance}</li>
                     <li>Number of Moons: ${json[0].moons}</li>
                  </ol>
                  <img src="${json[0].image}">
                  `;
               });
            });
       
   
         if (pilotName.value === "" || coPilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
            alert("All fields required");
         } else if (typeof pilotName.value !== "string" && typeof coPilotName.value !== "string" ) {
            alert("Please enter valid input for a name")
         } else if (typeof parseInt(fuelLevel.value) !== "number" && typeof parseInt(cargoMass.value) !== "number") {
            alert ("Please enter a number")
         } else if (parseInt(fuelLevel.value) < 10000) {
            faultyList.style.visibility = "visible";
            launchStatus.style.color = "red";
            launchStatus.innerHTML = "Shuttle is NOT ready for launch";
            fuelStatus.innerHTML = "Not enough fuel";
         } else if (parseInt(cargoMass.value) > 10000) {
            faultyList.style.visibility = "visible";
            launchStatus.style.color = "red";
            launchStatus.innerHTML = "Shuttle is NOT ready for launch";
            cargoStatus.innerHTML = "There is too much mass for the shuttle to take off","Fuel level high enough for launch";
         } else {
            faultyList.style.visibility = "visible";
            launchStatus.style.color = "green";
            launchStatus.innerHTML = "Shuttle is ready for launch";
            
         }
         e.preventDefault()
});
});