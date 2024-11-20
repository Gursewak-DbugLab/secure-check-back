// apiClient.js
import axios from 'axios';

// Créez une instance Axios
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajoutez un intercepteur de requêtes
apiClient.interceptors.request.use(
  (config) => {
    // Récupérer le token depuis localStorage
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Vérifiez si le token est récupéré

    // Si un token est présent, l'ajouter aux en-têtes de la requête
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;