/**
 * This script works with completed aot builds of the application
 *
 * It creates a marker file in the root of the /dist folder before creating a tar/zip of the builds
 */

import * as dateFormat from 'dateformat';
import { move, writeFile } from 'fs-extra';
import { hostname } from 'os';
import { version } from 'pjson';
import * as tar from 'tar';
import { appPath, log } from './utils';

(async () => {
  log.title('Generating post-build assets', 'clear');

  const dateString = dateFormat(new Date(), 'UTC:yyyymmddHHMMss');
  const outputFile = `/ng-app.v${version}.${dateString}.tar.gz`;
  const outputFilePath = appPath(outputFile);
  const finalOutputFilePath = appPath(`/dist/${outputFile}`);

  log.title('Creating version .txt for build');

  const versionFileDistPath = appPath(`/dist/v.${version}.txt`);

  log.info('Creating');
  log.info(versionFileDistPath);

  const versionFileContents = `Version ${version} built on ${dateString} by ${hostname()}`;

  try {
    await writeFile(versionFileDistPath, versionFileContents, { flag: 'w' });
  } catch (err) {
    return handleError(err);
  }

  log.success(`${versionFileDistPath} created`);
  log.title('Creating tar/gz file of build');

  try {
    await tar.c({ gzip: true, file: outputFilePath }, [appPath('/dist')]);
  } catch (err) {
    return handleError(err);
  }

  try {
    await move(outputFilePath, finalOutputFilePath);
  } catch (err) {
    return handleError(err);
  }

  log.success('Successfully created build artifact');
  log.info(finalOutputFilePath);

  return;
})();

function handleError(err: any) {
  log.error(err.message);

  return Promise.reject(err);
}
