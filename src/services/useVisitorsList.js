// src/composables/useVisitorsList.js
import { ref, onMounted } from 'vue';
import axios from 'axios';

export function useVisitorsList() {
    const visitors = ref([]);
    const error = ref(null);
    const loading = ref(false);

    const fetchVisitors = async () => {
        loading.value = true;
        try {
            let host = "http://127.0.0.1:9999";
            const response = await axios.get(`${host}/visitors/list`);
            visitors.value = response.data;
        } catch (err) {
            error.value = err.response ? err.response.data : 'Error fetching data';
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        fetchVisitors();
    });

    return {
        visitors,
        error,
        loading
    };
}
