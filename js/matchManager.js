import { db } from "../firebase.js";

import {
    ref,
    get,
    update
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// --------------------------
// RESET MATCH
// --------------------------

export async function resetMatch(){

    const snap = await get(ref(db,"teams"));

    if(!snap.exists()) return;

    const teams = snap.val();

    for(const id in teams){

        await update(ref(db,"teams/"+id),{

            kills:0,

            alive:4,

            eliminated:false,

            position:0

        });

    }

    await update(ref(db,"settings"),{

        status:"live"

    });

}


// --------------------------
// FINISH MATCH
// --------------------------

export async function finishMatch(){

    await update(ref(db,"settings"),{

        status:"finished"

    });

}


// --------------------------
// CHECK TOP 4
// --------------------------

export async function checkTop4(){

    const snap = await get(ref(db,"teams"));

    if(!snap.exists()) return;

    const teams = Object.values(snap.val());

    const aliveTeams = teams.filter(t=>t.alive>0);

    if(aliveTeams.length==4){

        await update(ref(db,"settings"),{

            top4:true

        });

    }
    else{

        await update(ref(db,"settings"),{

            top4:false

        });

    }

}


// --------------------------
// CHECK CHAMPION
// --------------------------

export async function checkChampion(){

    const snap = await get(ref(db,"teams"));

    if(!snap.exists()) return;

    const teams = snap.val();

    const alive=[];

    let winnerId="";

    for(const id in teams){

        if(teams[id].alive>0){

            alive.push(teams[id]);

            winnerId=id;

        }

    }

    if(alive.length==1){

        await update(ref(db,"settings"),{

            champion:winnerId,

            status:"champion"

        });

    }

}
