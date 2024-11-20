import { ref } from "vue";
import apiClient from "@/plugins/axios";

export function useUpdateRequest() {

  const isLoading = ref(false);
  const error = ref(null);
  const uidn = ref(null);

  const updateRequest = async (id, requestData) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await apiClient.put(
        `/requests/update/${id}`,
        requestData
      );
      isLoading.value = false;
      uidn.value = response.data.data.uidn;

      return response.data;
    } catch (err) {
      isLoading.value = false;
      error.value = err.response?.data?.message || "An error occurred";
      throw err;
    }
  };

  return {
    isLoading,
    error,
    updateRequest,
    uidn
  };
  
}
