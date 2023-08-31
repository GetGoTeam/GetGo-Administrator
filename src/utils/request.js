import axios from "axios";

const request = axios.create({ baseURL: "http://localhost:3002/api/admins/" });

export default request;
