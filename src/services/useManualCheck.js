// import apiClient from '@/plugins/axios';
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import axios from "axios";
import { useGlobalStore } from "@/stores/globalStore";

export function useQrCode() {
  const status = ref(null);
  const message = ref("");
  const loading = ref(false);
  const error = ref(null);
  const { baseUrl_ } = useGlobalStore();

  const router = useRouter();

  const getQrData = async (uidn, type) => {

    if (uidn == "" || uidn == null || typeof uidn == "undefined") {
      toast.info("Veuillez renseigner le UIDN champ svp");
      return false; 
    }

    //type 1 manual
    loading.value = true;
    try {
      let host = baseUrl_;
      const response = await axios.get(`${host}/get-qr-data/${uidn}`, {
        params: {
          type: type,
        },
      });
      status.value = response.data.status;
      message.value = response.data.message;

      if (status.value === "success") {
        console.log("Succès:", message.value);
        toast.success(message.value);
        // router.push("/");
        console.log(router);
      } else if (status.value === "error") {
        toast.error(message.value);
      } else {
        toast.error(message.value);
      }
    } catch (err) {
      error.value = "Erreur lors de la vérification du QR code";
      console.error("API Error:", err);
      toast.error(err.response.data.message);
    } finally {
      loading.value = false;
    }
  };

  return {
    status,
    message,
    loading,
    error,
    getQrData,
  };
}
