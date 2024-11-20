import { ref } from 'vue';
import apiClient from '@/plugins/axios';

export function useDepartement() {
  const departements = ref([]);
  const loading = ref(false);
  const errorMessage = ref(null);
  const statusCode = ref(null);

  const fetchDepartements = async () => {
    loading.value = true;
    errorMessage.value = null;
    
    try {
      const response = await apiClient.get('/departement/list', {
        params: {
          name: 'IT Department',
          location: 'Building A'
        }
      });
      departements.value = response.data;
      statusCode.value = response.status;
    } catch (error) {
      statusCode.value = error.response?.status || 500;
      errorMessage.value = "Erreur lors de la récupération des départements : " + (error.response?.data?.message || "Erreur inconnue");
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    departements,
    loading,
    errorMessage,
    statusCode,
    fetchDepartements
  };
}
