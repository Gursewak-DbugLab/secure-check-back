import { ref } from "vue";
import apiClient from "@/plugins/axios";

export function useUserList() {
  const users = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await apiClient.get("/user/list");
      users.value = response.data;
      console.log();
    } catch (err) {
      error.value = "Erreur lors de la récupération des utilisateurs.";
    } finally {
      loading.value = false;
    }
  };

  const fetchUsersComp = async (slug) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await apiClient.get("/user/list/" + slug);
      users.value = response.data;
      console.log();
    } catch (err) {
      error.value = "Erreur lors de la récupération des utilisateurs.";
    } finally {
      loading.value = false;
    }
  };

  // onMounted(() => {
  //   fetchUsers();
  // });

  return {
    users,
    loading,
    error,
    fetchUsers,
    fetchUsersComp,
  };
}
