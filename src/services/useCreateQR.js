// src/composables/useCreateQR.js
import { ref } from 'vue';
import axios from 'axios';

export function useCreateQR() {
  const qrResponse = ref(null);
  const error = ref(null);
  const statusCode = ref(null);

  const createQR = async (email, type) => {
    try {
      const response = await axios.post('http://localhost:9999/api/create-qr', {
        email: email,
        type: type
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Handle success
      qrResponse.value = response.data;
      statusCode.value = response.status; // Capture the status code
    } catch (err) {
      // Handle error
      error.value = err.response ? err.response.data : err.message;
      statusCode.value = err.response ? err.response.status : null; // Capture the error status code
    }
  };

  return {
    qrResponse,
    error,
    statusCode, // Return statusCode for both success and error
    createQR
  };
}
