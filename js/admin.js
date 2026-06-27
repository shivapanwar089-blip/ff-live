import { db } from "../firebase.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {
    addTeam,
    deleteTeam,
    changeKills,
    setAlive
} from "./teamManager.js";

import {
    resetMatch,
    finishMatch,
    checkTop4,
    checkChampion
} from "./matchManager.js";

const teamTable = document.getElementById("teamTable");

let teams = {};

// --------------------------
// LOAD TEAMS
// --------------------------

onValue(ref(db, "teams"), (snapshot) => {

    teams = snapshot.val() || {};

    renderTable();

});

// --------------------------
// RENDER TABLE
// --------------------------

function renderTable() {

    teamTable.innerHTML = "";

    const sorted = Object.entries(teams);

    sorted.sort((a, b) => {

        // Alive teams first
        if (a[1].alive != b[1].alive) {
            return b[1].alive - a[1].alive;
        }

        // Then kills
        return b[1].kills - a[1].kills;

    });

    sorted.forEach(([id, team], index) => {

        teamTable.innerHTML += `

<tr>

<td>${index + 1}</td>

<td>

<img
class="teamLogo"
src="${team.logo || 'assets/logos/default.png'}"
onerror="this.src='assets/logos/default.png'">

</td>

<td>

${team.name}

</td>

<td>

<button
class="killBtn minus"
onclick="changeKillsWindow('${id}',-1)">

-

</button>

<span class="killValue">

${team.kills}

</span>

<button
class="killBtn plus"
onclick="changeKillsWindow('${id}',1)">

+

</button>

</td>

<td>

<div class="aliveDisplay">

Alive : ${team.alive}

</div>

<div class="aliveButtons">

<button
class="aliveBtn"
onclick="setAliveWindow('${id}',4)">

4

</button>

<button
class="aliveBtn"
onclick="setAliveWindow('${id}',3)">

3

</button>

<button
class="aliveBtn"
onclick="setAliveWindow('${id}',2)">

2

</button>

<button
class="aliveBtn"
onclick="setAliveWindow('${id}',1)">

1

</button>

<button
class="aliveBtn"
onclick="setAliveWindow('${id}',0)">

0

</button>

</div>

</td>

<td>

<button
class="deleteBtn"
onclick="deleteTeamWindow('${id}')">

Delete

</button>

</td>

</tr>

`;

    });

}

// --------------------------
// WINDOW FUNCTIONS
// --------------------------

window.changeKillsWindow = async function(id, value){

    await changeKills(id, value);

    await checkTop4();

    await checkChampion();

}

window.setAliveWindow = async function(id, value){

    await setAlive(id, value);

    await checkTop4();

    await checkChampion();

}

window.deleteTeamWindow = async function(id){

    await deleteTeam(id);

}

// --------------------------
// BUTTONS
// --------------------------

document.getElementById("addTeam").onclick = async () => {

    await addTeam();

};

document.getElementById("resetMatch").onclick = async () => {

    if(confirm("Reset Match?")){

        await resetMatch();

    }

};

document.getElementById("finishMatch").onclick = async () => {

    if(confirm("Finish Match?")){

        await finishMatch();

    }

};
