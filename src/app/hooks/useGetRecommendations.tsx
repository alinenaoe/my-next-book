import { useQuery } from '@tanstack/react-query';
import generateRecommendations, {
  GenerateRecommendationsParams,
} from '../services/generateRecommendations';

export const useGetRecommendations = ({
  enabled,
  params,
}: {
  enabled: boolean;
  params: GenerateRecommendationsParams;
}) => {
  return useQuery({
    queryKey: ['recommendations'],
    queryFn: () => generateRecommendations(params),
    enabled,
    refetchOnWindowFocus: false,
  });
};
