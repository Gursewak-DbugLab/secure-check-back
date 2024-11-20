import apiClient from "@/plugins/axios";
import { ref } from "vue";
import { useUserStore } from "@/stores/useUserStore";

export function useLogin() {
  const username = ref("");
  const password = ref("");
  const loading = ref(false);
  const errorMessage = ref(null);
  const statusCode = ref(null);
  const userStore = useUserStore();
  const company_name = ref(null);
  const userInfo = ref(null);

  const login = async () => {
    loading.value = true;
    errorMessage.value = null;
    statusCode.value = null; // Réinitialiser le code de statut

    try {
      const response = await apiClient.post("/login_check", {
        username: username.value,
        password: password.value,
      });

      statusCode.value = response.status;

      localStorage.setItem("token", response.data.token);
      userStore.setToken(response.data.token);

      let fetchResult = fetchUserInfo();
      console.log({ fetchResult: fetchResult });

      company_name.value = fetchResult;
      // localStorage.setItem(
      //   "roles",
      //   JSON.stringify([
      //     "ROLE_USER",
      //     "ROLE_EMPLOYEE",
      //     "ROLE_SUPERVISOR",
      //     "ROLE_ADMIN",
      //     "ROLE_SUPER_ADMIN",
      //   ])
      // );

      return response.data;
    } catch (error) {
      errorMessage.value =
        "Login failed: " + (error.response?.data?.message || "Unknown error");
      statusCode.value = error.response.status;
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await apiClient.get("/user/info");
      userInfo.value = response.data;
      localStorage.setItem("userInfo", JSON.stringify(userInfo.value));
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  return {
    username,
    password,
    loading,
    errorMessage,
    statusCode,
    company_name,
    userInfo,
    login,
  };
}
