let totalXP = 0;
let missions = [];

const addMissionButton = document.getElementById("addMission");
const missionList = document.getElementById("missionList");
const totalXPSpan = document.getElementById("totalXP");
const categorySpan = document.getElementById("category");

function calculateXP(difficulty) {
    if (difficulty === "Easy") return 10;
    if (difficulty === "Normal") return 25;
    if (difficulty === "Hard") return 50;
}

function getCategory(xp) {
    if (xp < 50) return "Beginner";
    if (xp < 100) return "Warrior";
    return "Wizard";
}

addMissionButton.addEventListener("click", function () {

    const name = document.getElementById("name").value.trim();
    const description = document.getElementById("description").value.trim();
    const difficulty = document.getElementById("difficulty").value;

    if (name === "" || description === "") {
        alert("Please fill all fields");
        return;
    }

    let mission = {
        name: name,
        description: description,
        difficulty: difficulty,
        xp: calculateXP(difficulty),
        status: "PENDING"
    };

    console.log("Mission created:", mission);
    missions.push(mission);
    renderMissions();
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
});

function renderMissions() {

    missionList.innerHTML = "";

    missions.forEach(function (mission, index) {

        let li = document.createElement("li");

        li.innerHTML = `
            <strong>${mission.name}</strong> -
            ${mission.description} -
            ${mission.difficulty} -
            <span>${mission.status}</span>
        `;
        if (mission.status === "PENDING") {

            let button = document.createElement("button");
            button.textContent = "Complete";

            button.addEventListener("click", function () {
                completeMission(index);
            });

            li.appendChild(button);
        }

        missionList.appendChild(li);
    });
}

function completeMission(index) {

    if (missions[index].status === "PENDING") {

        missions[index].status = "SUCCESFUL";
        totalXP += missions[index].xp;

        totalXPSpan.textContent = totalXP;
        categorySpan.textContent = getCategory(totalXP);

        renderMissions();
    }
}
