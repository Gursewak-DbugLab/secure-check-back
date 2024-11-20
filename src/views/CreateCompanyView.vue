<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useUserStore } from "@/stores/useUserStore";
import { useUserInfo } from "@/services/useUserInfo";
import { toast } from "vue3-toastify";
import { /*useRoute,*/ useRoute, useRouter } from "vue-router";
import { useCompanies } from "@/services/useCompanies";

const currentRole = ref();
const roles = ref();
roles.value = JSON.parse(localStorage.getItem("userInfo"));
currentRole.value = roles.value?.roles[0];

const { userInfo, fetchUserInfo } = useUserInfo();
const { postCompany, showCompany, company, statusCode } = useCompanies();

const userStore = useUserStore();
const isAuthenticated = userStore.isAuthenticated();

const router = useRouter();
// const route = useRoute();
const fileName = ref();
const errorMessage = ref("");

const companyReq = ref({
  name: "",
  description: "",
});

const onFileChange = (event) => {
  const selectedFile = event.target.files[0];
  // console.log(selectedFile);
  if (selectedFile) {
    companyReq.value.logo = selectedFile;
    // pdfUrl.value = URL.createObjectURL(selectedFile);
    fileName.value = selectedFile.name;
    // this.isValidFile = true;
    // this.errorMessage = '';
  } else {
    // this.isValidFile = false;
    errorMessage.value = "Veuillez selectionnez un fichier valide";
  }
};

const loading = ref(false);
const submitForm = async () => {
  try {
    await postCompany(companyReq.value);
    console.log(company);
  } catch (error) {
    errorMessage.value = `Erreur: ${error.message}`;
  } finally {
    loading.value = false;
  }
};

// Watcher pour réagir aux changements du statusCode
watch(statusCode, (newStatus) => {
  switch (newStatus) {
    case 201:
      toast.success("Entreprise créé avec succès.");
      setTimeout(() => {
        router.push("/menu");
      }, 1500);

      break;
    case 200:
      toast.success("Entreprise créé avec succès.");
      setTimeout(() => {
        router.push("/menu");
      }, 1500);

      break;
    case 400:
      toast.info("La requête est mal formée.");
      break;
    case 401:
      toast.info("Vous devez être authentifié.");

      setTimeout(() => {
        router.push("/");
      }, 1500);

      break;
    case 403:
      toast.info("Vous n'avez pas la permission.");
      break;
    case 404:
      toast.info("La ressource demandée n'existe pas.");
      break;
    case 500:
      toast.info("Une erreur interne est survenue.");
      break;
    default:
      toast.info(`Code : ${newStatus}`);
  }
});

const route = useRoute();
const domain = ref(route.params.domain || "scb");
const goToMenu = () => {
  router.push({
    name: "Menu",
    params: {
      domain: domain.value,
    },
  });
};

onBeforeMount(async () => {
    if (route?.params?.company_edit) {
    showCompany(route.params.slug);
    // companyReq.value = company.value;
  }

  await fetchUserInfo();
  console.log({ userInfo });
});
</script>

<template>
  <section class="request-meeting">
    <div class="background-gradi">
      <section class="request-meeting meeting-form">
        <div class="row align-items-center">
          <div class="col col-12 col-md-12 col-sm-12">
            <div
              class="d-flex justify-content-start mb-4 gap-3 align-items-center"
            >
              <button class="back" @click="goToMenu">Retour</button>
              <h3>Création Entreprise</h3>
            </div>

            <form @submit.prevent="submitForm" enctype="multipart/form-data">
              <div>
                <label for="logo">Logo</label><br />
                <input
                  type="file"
                  id="logo"
                  @change="onFileChange"
                  required
                  :class="{ error: errorMessage }"
                /><br />
              </div>

              <!-- <p>
                {{ fileName }}
              </p> -->

              <div>
                <label for="name">Nom</label><br />
                <input
                  type="text"
                  id="name"
                  v-model="companyReq.name"
                  required
                /><br />
              </div>

              <div>
                <label for="description">Description </label><br />
                <input
                  type="description"
                  id="description"
                  v-model="companyReq.description"
                  required
                /><br />
              </div>

              <div class="submit-button" v-if="isAuthenticated">
                <input type="submit" value="Soumettre" :disabled="loading" />
              </div>

              <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
            </form>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.error {
  border-color: red;
}
</style>
