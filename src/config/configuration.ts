interface Config {
  database: DatabaseConfig;
  firebase: any;
}

interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
const loadConfig = (): Config => {
  return global.config as Config;
};

export default loadConfig;
