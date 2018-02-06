/**
 *  This script creates the version files needed by the app to do both JIT (development) and AOT (prod) builds
 *
 *  An ES module is created in /src/environments/version.ts which is imported into environment.ts. The version
 *      number comes from the package.json file
 *
 *  A version.json file is also created at /src/version.json which is included with the assets configured in .angular-cli.json
 */

import { writeFile } from 'fs-extra';
import { version } from 'pjson';

import { appPath, log } from './utils';

(async () => {
  log.title('Generating application version files', 'clear');

  const versionModuleFilePath = appPath('/src/environments/version.ts');
  const versionJsonFilePath = appPath('/src/version.json');

  const moduleSrc = `export const version = '${version}';`;

  const jsonSrc = JSON.stringify({ version });

  log.title(`Updating application version ${version}`, 'continue');

  try {
    await writeFile(versionModuleFilePath, moduleSrc, { flag: 'w' });
  } catch (err) {
    log.error(err.message);

    return Promise.reject(err);
  }

  log.success('version.ts module written to');
  log.info(versionModuleFilePath);

  try {
    await writeFile(versionJsonFilePath, jsonSrc, { flag: 'w' });
  } catch (err) {
    log.error(err.message);

    return Promise.reject(err);
  }

  log.success('version.json written to');
  log.info(versionJsonFilePath);

  return Promise.resolve();
})();
