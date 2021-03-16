import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

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

const YAML_CONFIG_FILENAME = 'config.yaml';

export default () => {
  return yaml.load(
    readFileSync(join(__dirname, '/../../', YAML_CONFIG_FILENAME), 'utf8'),
  ) as object;
};
