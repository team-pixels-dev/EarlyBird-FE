import axios from "axios";
// import { api_url } from "@/env"; "@/env"

const client = axios.create({baseURL : "https://earlybirdteam.com/"});

export default client;