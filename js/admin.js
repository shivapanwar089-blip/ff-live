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

const teamsRef = ref(db, "teams");

onValue(teamsRef, (snapshot) => {

    teamTable.innerHTML = "";

    const teams = snapshot.val();

    for (const id in teams) {

        const team = teams[id];

        teamTable.innerHTML += `

<tr>

<td>

<img class="teamLogo"

src="${team.logo}">

</td>

<td>

${team.name}

</td>

<td>

<button class="killBtn minus"

onclick="changeKills('${id}',-1)">-</button>

<b>${team.kills}</b>

<button class="killBtn plus"

onclick="changeKills('${id}',1)">+</button>

</td>

<td>

<button class="aliveBtn"

onclick="setAlive('${id}',4)">4</button>

<button class="aliveBtn"

onclick="setAlive('${id}',3)">3</button>

<button class="aliveBtn"

onclick="setAlive('${id}',2)">2</button>

<button class="aliveBtn"

onclick="setAlive('${id}',1)">1</button>

<button class="aliveBtn"

onclick="setAlive('${id}',0)">0</button>

</td>

<td>

<button class="deleteBtn">

Delete

</button>

</td>

</tr>

`;

    }

});

window.changeKills = function(id,value){

const teamRef = ref(db,"teams/"+id);

onValue(teamRef,(snap)=>{

let t=snap.val();

update(teamRef,{

kills:t.kills+value

});

},{onlyOnce:true});

}

window.setAlive = function(id, value){

    update(ref(db,"teams/"+id),{

        alive:value

    });

}

// --------------------
// ADD TEAM BUTTON
// --------------------

document.getElementById("addTeam").onclick = async () => {

    const teamName = prompt("Enter Team Name");

    if (!teamName) return;

    const logo = prompt("Enter Logo URL (optional)") || "";

    const teamsRef = ref(db, "teams");

    const snapshot = await get(teamsRef);

    const teams = snapshot.val() || {};

    const newKey = "team" + (Object.keys(teams).length + 1);

    update(ref(db, "teams/" + newKey), {

        name: teamName,
        kills: 0,
        alive: 4,
        logo: logo,
        eliminated: false,
        position: 0

    });

};
