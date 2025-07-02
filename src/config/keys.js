import config from "./config.json";
const mode = import.meta.env.VITE_APP_MODE;
export const server = config[mode];
const envData = config[mode];
export const { serverPath, clientPath } = envData;
