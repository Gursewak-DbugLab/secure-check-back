import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  
  state: () => ({
    baseUrl: "https://www.securecheck.info/api/public/index.php/api",
    baseUrl_: "https://www.securecheck.info/api/public/index.php",
    publicDir: "https://www.securecheck.info/api/public",
    
    /*baseUrl: "http://127.0.0.1:8000/api",
    publicDir: "http://127.0.0.1:8000/",*/

    domain: "scb",
    logoPath: "",
    currentPath: "",
  }),

  actions: {
    setDomain(newDomain) {
      this.domain = newDomain;
    },
    setLogoPath(newLogoPath) {
      this.logoPath = newLogoPath;
    },
    setCurrentPath(path) {
      this.currentPath = path;
    },
  },

  getters: {
    getLogoPath: (state) => state.logoPath,
    getCurrentPath: (state) => state.currentPath,
  },

  persist: true,
});
