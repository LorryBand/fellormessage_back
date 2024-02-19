import { IConfig } from 'peer';

export interface CustomConfigPeer extends Partial<IConfig> {
  debug?: boolean;
}
