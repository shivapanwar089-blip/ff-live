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

window.setAlive=function(id,value){

update(ref(db,"teams/"+id),{

alive:value

});

}
