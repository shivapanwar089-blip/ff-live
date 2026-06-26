import { db } from "../firebase.js";

import {
    ref,
    onValue,
    update,
    push,
    remove,
    get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const teamTable = document.getElementById("teamTable");
console.log(teamTable);
let teams = {};

// ----------------------
// LOAD TEAMS FROM FIREBASE
// ----------------------

function loadTeams() {

    console.log("Loading teams...");

    const teamsRef = ref(db, "teams");

    onValue(teamsRef, (snapshot) => {

        console.log("Snapshot:", snapshot.val());

        teams = snapshot.val() || {};

        console.log("Teams variable:", teams);

        renderTable();

    });

}

loadTeams();

// ----------------------
// DRAW TABLE
// ----------------------

function renderTable(){

    // Clear old table
    teamTable.innerHTML = "";

    // Convert Firebase object into an array
    const sortedTeams = Object.entries(teams);

    // Sort by kills (highest first)
    sortedTeams.sort((a,b)=>{

        return b[1].kills - a[1].kills;

    });

    // Create one row for every team
    sortedTeams.forEach(([id,team],index)=>{

        teamTable.innerHTML += `

<tr>

<td>${index+1}</td>

<td>

<img
class="teamLogo"
src="${team.logo}"
width="45"
height="45">

</td>

<td>

${team.name}

</td>

<td>

<button onclick="changeKills('${id}',-1)">-</button>

<b>${team.kills}</b>

<button onclick="changeKills('${id}',1)">+</button>

</td>

<td>

<div>

<b>Alive : ${team.alive}</b>

</div>

<br>

<button onclick="setAlive('${id}',4)">4</button>

<button onclick="setAlive('${id}',3)">3</button>

<button onclick="setAlive('${id}',2)">2</button>

<button onclick="setAlive('${id}',1)">1</button>

<button onclick="setAlive('${id}',0)">0</button>

</td>

<td>

<button onclick="deleteTeam('${id}')">

Delete

</button>

</td>

</tr>

`;

    });

}
