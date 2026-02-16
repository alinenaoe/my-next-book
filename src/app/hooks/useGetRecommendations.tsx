import { useQuery } from '@tanstack/react-query';
import generateRecommendations from '../services/generateRecommendations';

export const useGetRecommendations = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['recommendations'],
    queryFn: generateRecommendations,
    enabled,
  });
};
