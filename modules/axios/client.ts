import axios from "axios";
import { api_url } from "@/env"; "@/env"

const client = axios.create({baseURL : api_url});

export default client;