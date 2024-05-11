import { createDebug } from 'shared/log';
import { name } from '../../package.json';

// You can use `localStorage.debug = 'tampermonkey:*'` to enable all debug logs
export const debug = createDebug(name);
