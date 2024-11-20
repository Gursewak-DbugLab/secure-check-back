// useVisitRequest.js
import { ref } from "vue";
import apiClient from "@/plugins/axios";

export function useVisitRequest() {
  const loading = ref(false);
  const error = ref(null);
  const requestId = ref(null);
  const statusCodeReq = ref(null);

  const createVisitRequest = async (visitRequestData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await apiClient.post(
        "/requests/create",
        visitRequestData
      );
      // console.log({ data______: response.data });
      // console.log({ requestId_____+__: requestId.value });
      requestId.value = response.data.data.id;
      statusCodeReq.value = response.status;

      return response.data;
    } catch (err) {
      error.value = err.response ? err.response.data : err.message;
      throw error.value;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    createVisitRequest,
    requestId,
    statusCodeReq,
  };
}
