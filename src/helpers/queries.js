import { useQueries } from 'react-query';
import axios from 'axios';

const getApiUrl = (apiName) => `https://api.factoryfour.com/${apiName}/health/status`
const apiNames = ['accounts', 'assets', 'customers', 'datapoints', 'devices', 'documents', 'forms', 'invites', 'media', 'messages', 'namespaces', 'orders', 'patients', 'relationships', 'rules', 'templates', 'users', 'workflows']

export const useFetchAllApiStatuses = () => useQueries(
  apiNames.map(apiName => ({
    queryKey: ['apiStatus', apiName],
    queryFn: () => axios.get(getApiUrl(apiName), { validateStatus: () => true })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          // Success case
          return {
            ...response.data,
            success: true,
            title: apiName
          };
        } else {
          // Error case (including 4XX and 5XX HTTP status codes)
          return {
            success: false,
            error: `${response.status} ${response.statusText}`,
            title: apiName,
          };
        }
      })
      .catch(error => {
        let errorMessage = 'Error';
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          errorMessage = `${error.response.status} ${error.response.statusText}`;
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage = '503 Service Unavailable';
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage = error.message;
        }

        return {
          success: false,
          error: errorMessage,
          title: apiName,
        };
      }),
    keepPreviousData: true,
    retry: 0,
    retryDelay: 200,
    refetchOnWindowFocus: false,
    // TODO: RefetchInterval
  }))
);
