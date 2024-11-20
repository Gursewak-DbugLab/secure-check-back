import apiClient from "@/plugins/axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

export function useCompanies() {
  const companies = ref([]);
  const company = ref();
  const loading = ref(false);
  const errorMessage = ref(null);
  const statusCode = ref(null);
  const router = useRouter();

  const fetchCompanies = async () => {
    loading.value = true;
    errorMessage.value = null;

    try {
      const response = await apiClient.get("/companies"); // Remplacez par l'URL correcte de votre API
      companies.value = response.data.data;
    } catch (error) {
      errorMessage.value =
        "Une erreur est survenue lors du chargement des entreprises.";
      console.error(error);

      if (error.status == 401) {
        router.push({
          name: "RequestMeeting",
          params: {
            domain: "scb",
          },
        });
      }
    } finally {
      loading.value = false;
    }
  };

  const showCompany = async (slug) => {
    loading.value = true;
    errorMessage.value = null;

    try {
      const response = await apiClient.get(`/company/${slug}`); // Remplacez par l'URL correcte de votre API
      company.value = response.data.data;
    } catch (error) {
      errorMessage.value =
        "Une erreur est survenue lors du chargement des entreprises.";
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const updateCompany = async (data, id) => {
    loading.value = true;
    errorMessage.value = null;

    try {
      const response = await apiClient.put(`/company/${id}`,data); // Remplacez par l'URL correcte de votre API
      company.value = response.data.data;
      statusCode.value = response.status;
    } catch (error) {
      errorMessage.value =
        "Une erreur est survenue lors du chargement des entreprises.";
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const postCompany = async (data) => {
    loading.value = true;
    errorMessage.value = null;

    try {
      // Crée un objet FormData
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("logo", data.logo); // Assurez-vous que `data.logo` est un fichier (Blob)

      // Envoyer la requête POST avec formData
      const response = await apiClient.post("/company", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      company.value = response.data.data;
      statusCode.value = response.status;
    } catch (error) {
      errorMessage.value =
        "Une erreur est survenue lors de l'enregistrement de l'entreprise.";
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    companies,
    loading,
    errorMessage,
    fetchCompanies,
    showCompany,
    postCompany,
    updateCompany,
    statusCode,
    company,
  };
}
