import apiClient from "@/plugins/axios";
import { ref } from "vue";

export function useCreateVisitor() {
  const statusCode = ref(null);
  const errorMessage = ref(null);
  const visitorId = ref(null);

  const createVisitor = async (visitorData) => {
    try {
      const response = await apiClient.post("/visitor/create", visitorData);
      statusCode.value = response.status;
      visitorId.value = response.data.data.visitor_id;

      console.log({
        data___: response.data,
        visitorId___: visitorId.value,
      });

      return response.data;
    } catch (error) {
      statusCode.value = error.response?.status;
      errorMessage.value =
        error.response?.data?.message || "An unexpected error occurred";
      throw new Error(errorMessage.value);
    }
  };

  return {
    createVisitor,
    statusCode,
    errorMessage,
    visitorId,
  };
}
