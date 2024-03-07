import { useQueries } from 'react-query';
import axios from 'axios';

const getApiUrl = (apiName) => `https://api.factoryfour.com/${apiName}/health/status`
const apiNames = ['accounts', 'assets', 'customers', 'datapoints', 'devices', 'documents', 'forms', 'invites', 'media', 'messages', 'namespaces', 'orders', 'patients', 'relationships', 'rules', 'templates', 'users', 'workflows']

export const useFetchAllApiStatuses = () => {
  return useQueries(
    apiNames.map(apiName => ({
      queryKey: ['apiStatus', apiName],
      queryFn: async () => axios.get(getApiUrl(apiName))
        .then(response => response.data)
        .catch(error => ({
          success: false,
          message: error?.toString(),
          hostname: apiName,
          time: 0,
        })),
      // TODO: RefetchInterval
    }))
  );
};
