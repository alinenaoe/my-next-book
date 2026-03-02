import { useQuery } from '@tanstack/react-query';
import generateRecommendations, {
  GenerateRecommendationsParams,
} from '../services/generateRecommendations';

export const useGetRecommendations = ({
  params,
}: {
  params: GenerateRecommendationsParams;
}) => {
  return useQuery({
    queryKey: ['recommendations'],
    queryFn: () => generateRecommendations(params),
    enabled: false,
    refetchOnWindowFocus: false,
  });
};
