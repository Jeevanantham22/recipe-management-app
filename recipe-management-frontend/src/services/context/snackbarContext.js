import React, { createContext, useContext } from 'react';
import { useSnackbar } from 'notistack';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (message, variant = 'default') => {
    enqueueSnackbar(message, { variant });
  };

  const showSuccessSnackbar = (message) => {
    showSnackbar(message, 'success');
  };

  const showErrorSnackbar = (message) => {
    showSnackbar(message, 'error');
  };

  const showWarningSnackbar = (message) => {
    showSnackbar(message, 'warning');
  };

  const showInfoSnackbar = (message) => {
    showSnackbar(message, 'info');
  };

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
        showSuccessSnackbar,
        showErrorSnackbar,
        showWarningSnackbar,
        showInfoSnackbar,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbarContext = () => useContext(SnackbarContext);
