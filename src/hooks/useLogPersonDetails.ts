// hooks/useLogPersonDetails.ts
import { useEffect } from 'react';
import { useLogContext } from '@/context/LogContext';

const useLogPersonDetails = (personData: any, currentTime: string) => {
  const { enableLogs } = useLogContext();

  useEffect(() => {
    if (enableLogs && personData) {
      console.log('Person Details:', personData);
      console.log('Current Time:', currentTime);
    }
  }, [personData, currentTime, enableLogs]);
};

export default useLogPersonDetails;
