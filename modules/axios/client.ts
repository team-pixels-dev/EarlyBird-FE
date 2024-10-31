import axios from "axios";

const client = axios.create({baseURL : "https://earlybirdteam.com/"});

export default client;