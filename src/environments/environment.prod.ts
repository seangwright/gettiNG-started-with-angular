import { IEnvironment } from 'environments/ienvironment';
import { version } from 'environments/version';

export const environment: IEnvironment = {
  production: true,
  appVersion: version,
  updateReminderInterval: 15
};
