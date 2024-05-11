import debug from 'debug';

export const createDebug = (key) => {
  // You can use `localStorage.debug = 'tampermonkey:*'` to enable all debug logs
  return debug(`tampermonkey:${key}`);
};
