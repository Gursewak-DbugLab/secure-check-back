import { ref} from "vue";
import apiClient from "@/plugins/axios";

export function useEventList() {
  const events = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchEvents = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await apiClient.get("/evenement/list");
      events.value = response.data;
      console.log();
    } catch (err) {
      error.value = "Erreur lors de la récupération des events.";
    } finally {
      loading.value = false;
    }
  };

  const fetchEventsByComp = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await apiClient.get("/evenement/list/" + id);
      events.value = response.data;
      console.log();
    } catch (err) {
      error.value = "Erreur lors de la récupération des utilisateurs.";
    } finally {
      loading.value = false;
    }
  };

  // onMounted(() => {
  //   fetchEvents();
  // });

  return {
    events,
    loading,
    error,
    fetchEvents,
    fetchEventsByComp,
  };
}
