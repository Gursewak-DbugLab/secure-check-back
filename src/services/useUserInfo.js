// src/services/useUserInfo.js
import { ref } from 'vue';
import apiClient from '@/plugins/axios';

export const useUserInfo = () => {
  const userInfo = ref(null);
  const error = ref(null);

  const fetchUserInfo = async () => {
    try {
      const response = await apiClient.get('/user/info');
      userInfo.value = response.data;
    } catch (err) {
      error.value = err.response?.data?.error || 'Failed to fetch user info';
    }
  };

  return {
    userInfo,
    error,
    fetchUserInfo,
  };
};
