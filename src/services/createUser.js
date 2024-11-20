import { ref } from "vue";
import apiClient from "@/plugins/axios"; // Assurez-vous que votre instance Axios est correctement configurée

export function useCreateUser() {
  const user = ref({
    name: "",
    firstname: "",
    email: "",
    password: "",
    title: "",
    contact: "",
    role: "ROLE_USER",
    status: true,
    department_id:""
  });

  const loading = ref(false);
  const errorMessage = ref(null);
  const successMessage = ref(null);
  const statusCode = ref(null);

  const createUser = async () => {
    loading.value = true;
    errorMessage.value = null;
    successMessage.value = null;

    try {
      const response = await apiClient.post("/user/create", user.value);
      statusCode.value = response.status;
      successMessage.value = "Utilisateur créé avec succès !";
      return response.data;
    } catch (error) {
      errorMessage.value =
        "Erreur lors de la création de l'utilisateur : " +
        (error.response?.data?.message || "Erreur inconnue");
      statusCode.value = error.response?.status || 500;
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    loading,
    errorMessage,
    successMessage,
    statusCode,
    createUser,
  };
}
