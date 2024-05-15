import axios from "axios";
import * as process from "process";

export const http = axios.create({
  baseURL: `${process.env.DEV_IP}/api`,
});
