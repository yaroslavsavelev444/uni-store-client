let toastCallback = null;

export const registerToast = (callback) => {
  toastCallback = callback;
};

export const showToast = (params) => {
  if (toastCallback) {
    toastCallback(params);
  } else {
    console.warn("Toast not initialized yet");
  }
};