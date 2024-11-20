import { useRouter } from "vue-router";

export const useNavigation = () => {
  const router = useRouter();
  const goToRoute = (routeName, domain) => {
    router.push(`/${domain}/${routeName}`);
  };

  return {
    goToRoute,
  };
};
