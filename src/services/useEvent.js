import apiClient from "@/plugins/axios";
import { ref } from "vue";

export function useEvent() {
  const loading = ref(false);
  const event = ref();
  const errorMessage = ref(null);
  const successMessage = ref(null);
  const statusCode = ref(null);

  const createEvent = async (eventData) => {
    loading.value = true;
    errorMessage.value = null;
    successMessage.value = null;
    statusCode.value = null; // Réinitialisation du statusCode

    try {
      const response = await apiClient.post("/evenement/create", eventData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      statusCode.value = response.status; // Capture du statusCode
      successMessage.value = "Événement créé avec succès !";
    } catch (error) {
      if (error.response) {
        statusCode.value = error.response.status; // Capture du statusCode en cas d'erreur
        errorMessage.value = `Erreur: ${error.response.status} - ${
          error.response.data.message ||
          "Erreur lors de la création de l’événement."
        }`;
      } else {
        errorMessage.value = "Erreur réseau ou serveur non joignable.";
      }
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const showEvent = async (slug) => {
    loading.value = true;
    errorMessage.value = null;
    successMessage.value = null;
    statusCode.value = null; // Réinitialisation du statusCode

    try {
      const response = await apiClient.get("/evenement/" + slug);
      event.value = response.data.data;
      statusCode.value = response.status; // Capture du statusCode
      successMessage.value = "Événement Rétrouvé";
    } catch (error) {
      if (error.response) {
        statusCode.value = error.response.status; // Capture du statusCode en cas d'erreur
        errorMessage.value = `Erreur: ${error.response.status} - ${
          error.response.data.message ||
          "Erreur lors de la recherche de l’événement."
        }`;
      } else {
        errorMessage.value = "Erreur réseau ou serveur non joignable.";
      }
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    errorMessage,
    successMessage,
    statusCode, // Retour du statusCode
    createEvent,
    showEvent,
    event,
  };
}
