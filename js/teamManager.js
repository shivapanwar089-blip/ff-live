import { db } from "../firebase.js";

import {
    ref,
    update,
    remove,
    get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// ----------------------------
// CHANGE KILLS
// ----------------------------

export async function changeKills(id, amount){

    const snap = await get(ref(db,"teams/"+id));

    if(!snap.exists()) return;

    const team = snap.val();

    let kills = team.kills + amount;

    if(kills < 0) kills = 0;

    if(kills > 100) kills = 100;

    await update(ref(db,"teams/"+id),{

        kills:kills

    });

}


// ----------------------------
// CHANGE ALIVE
// ----------------------------

export async function setAlive(id, alive){

    await update(ref(db,"teams/"+id),{

        alive:alive

    });

}


// ----------------------------
// DELETE TEAM
// ----------------------------

export async function deleteTeam(id){

    if(!confirm("Delete Team?")) return;

    await remove(ref(db,"teams/"+id));

}


// ----------------------------
// ADD TEAM
// ----------------------------

export async function addTeam(){

    const name = prompt("Team Name");

    if(!name) return;

    const logo = prompt("Logo URL");

    const snap = await get(ref(db,"teams"));

    const teams = snap.val() || {};

    const id = "team"+Date.now();

    await update(ref(db,"teams/"+id),{

        name:name,

        logo:logo,

        kills:0,

        alive:4,

        position:0,

        eliminated:false

    });

}
