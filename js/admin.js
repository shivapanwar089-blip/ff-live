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

let teams = {};

// ----------------------
// LOAD TEAMS FROM FIREBASE
// ----------------------

function loadTeams() {

    const teamsRef = ref(db, "teams");

    onValue(teamsRef, (snapshot) => {

        teams = snapshot.val() || {};

        renderTable();

    });

}

loadTeams();

// ----------------------
// DRAW TABLE
// ----------------------

function renderTable(){

    teamTable.innerHTML = "";

}
