import { safeJsonParse } from '@alife/workstation-utils';
import axios, { AxiosRequestConfig } from 'axios';

export const IFRAME_BRADGE = {
  iframes: [],
  register(iframe) {
    this.iframes.push(iframe);
  },
  getKey(type) {
    return `iframe-bradge-${type}`;
  },
  emitTo(iframe, type, data?: any) {
    iframe.contentWindow.postMessage({ type: this.getKey(type), data }, '*');
  },
  emit(type, data?: any) {
    window.parent.postMessage({ type: this.getKey(type), data }, '*');
  },
  on(type, callback) {
    const listener = (e) => {
      if (e.data.type === this.getKey(type)) {
        callback(e.data.data);
      }
    };

    window.addEventListener('message', listener);

    return () => {
      window.removeEventListener('message', listener);
    };
  },
};

export async function isReady(iframe) {
  return new Promise((resolve, reject) => {
    let times = 0;
    let resolved = false;
    const runReady = () => {
      if (resolved) return;
      if (times > 10) {
        reject(new Error('iframe is not ready'));
        return;
      }
      times++;
      try {
        IFRAME_BRADGE.emitTo(iframe, 'ready');
        IFRAME_BRADGE.on('ready-resolve', () => {
          resolved = true;
          resolve(null);
        });
      } catch (e) {}
      setTimeout(() => runReady(), 500);
    };
    runReady();
  });
}
isReady.connect = function () {
  IFRAME_BRADGE.on('ready', () => {
    IFRAME_BRADGE.emit('ready-resolve');
  });
};

export const BRADGE_REQUEST = {
  connect() {
    IFRAME_BRADGE.on('request', (options) => {
      if (options.data?.conditions?.length) {
        const { filter } = safeJsonParse(localStorage.getItem('localSelectedView')) ?? ({} as any);
        options.data.conditions[0] = {
          ...filter[0],
          ...options.data.conditions[0],
        };
      }

      axios(options)
        .then((res) => {
          IFRAME_BRADGE.emit('request-resolve', res.data);
        })
        .catch((err) => {
          console.error('🚀 #### ~ IFRAME_BRADGE.on ~ err', err);
          IFRAME_BRADGE.emit('request-reject', err.response.data);
        });
    });
  },
  createRequest(iframe) {
    return async function (options: AxiosRequestConfig): Promise<any> {
      await isReady(iframe);
      iframe.contentWindow.postMessage({ type: `iframe-bradge-request`, data: options }, '*');
      return new Promise((resolve, reject) => {
        const listener = (e) => {
          if (e.data.type === `iframe-bradge-request-resolve`) {
            resolve(e.data.data);
            window.removeEventListener('message', listener);
          } else if (e.data.type === `iframe-bradge-request-reject`) {
            reject(e.data?.data);
            window.removeEventListener('message', listener);
          }
        };

        window.addEventListener('message', listener);
      });
    };
  },
};
