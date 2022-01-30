import axios from 'axios';

export function getBoats() {
    return axios.get("/boats");
}

export function addBoat(boat) {
    return axios.post("/boats", boat);
}

export function updateBoat(boatId, params) {
    return axios.put("/boats/" + boatId, params);
}

export function deleteBoat(boatId) {
    return axios.delete("/boats/" + boatId);
}

