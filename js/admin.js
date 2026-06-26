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
