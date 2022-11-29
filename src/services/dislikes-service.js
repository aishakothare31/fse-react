import axios from "axios";

const BASE_URL = "https://tuiter-node-fa22-ak.herokuapp.com"
const USERS_API = `${BASE_URL}/users`;

const api = axios.create({
 withCredentials: true
});

export const userTogglesTuitDislikes = (uid, tid) =>
   api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
       .then(response => response.data);

export const findTuitsUserDisliked = (userId) =>
    api.get(`${USERS_API}/${userId}/dislikes`)
        .then(response => response.data);

export const hasUserDislikedTheTuit = (uid, tid) => {
    return api.get(`${USERS_API}/${uid}/dislikes/${tid}`).then((response) => {
        return response.data?._id !== undefined;
    });
    };