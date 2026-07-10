import { useEffect } from 'react';

export const useUnsavedChanges = (isDirty) => {
  useEffect(() => {
    const handleWindowClose = (e) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      return e.returnValue;
    };

    window.addEventListener('beforeunload', handleWindowClose);

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
    };
  }, [isDirty]);
};
