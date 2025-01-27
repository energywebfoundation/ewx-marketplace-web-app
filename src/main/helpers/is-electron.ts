// This code is obtained from the 'is-electron' package but modified because the
// original code was using the default User Agent ('Electron'), but we are using a
// custom User Agent ('ewx-marketplace'). The original code is available at:
// https://github.com/cheton/is-electron/blob/master/index.js

export const isElectron = () => {
  // Renderer process
  if (
    typeof window !== 'undefined' &&
    typeof window.process === 'object' &&
    window.process.type === 'renderer'
  ) {
    return true;
  }

  // Main process
  if (typeof process !== 'undefined' && process && process.versions && process.versions.electron) {
    return true;
  }

  // Detect the user agent when the `nodeIntegration` option is set to true
  const userAgent = (() => {
    if (typeof process !== 'undefined' && process && process.env && process.env.EWX_CHECK_UA) {
      return process.env.EWX_CHECK_UA;
    }

    if (
      typeof import.meta !== 'undefined' &&
      import.meta.env &&
      import.meta.env.VITE_EWX_CHECK_UA
    ) {
      return import.meta.env.VITE_EWX_CHECK_UA as string;
    }

    return '';
  })();

  if (
    typeof navigator === 'object' &&
    navigator.userAgent &&
    (navigator.userAgent.toLowerCase().indexOf(userAgent) > -1 || // Custom User Agent
      navigator.userAgent.toLowerCase().indexOf('Electron') > -1) // Default User Agent
  ) {
    return true;
  }

  return false;
};
