<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "vue3-toastify";
import { useRoute, useRouter } from "vue-router";
import { useCompanies } from "@/services/useCompanies";
import { useEvent } from "@/services/useEvent";
// import { useDepartement } from "@/services/useDepartement";
import { useGlobalStore } from "@/stores/globalStore";

const { fetchCompanies, showCompany, errorMessage, /*companies */ company } =
  useCompanies();
const { createEvent, statusCode } = useEvent();
// const { departements, fetchDepartements } = useDepartement();
const { publicDir } = useGlobalStore();

const userStore = useUserStore();
const isAuthenticated = userStore.isAuthenticated();

const router = useRouter();
const route = useRoute();
const loading = ref(false);

const domain = ref(route.params.domain || "scb");
const goToMenu = () => {
  router.push({
    name: "Menu",
    params: {
      domain: domain.value,
    },
  });
};

const event = ref({
  company_id: "",
  name: "", // Valeur par défaut
  location: "", // Valeur par défaut
  date_event: "", // Valeur par défaut
  time_event: "14:30", // Valeur par défaut
  departement_id: 1,
});

// Changement de compagnie
// const onChangeCompany = async (id) => {
//   if (id) {
//     await showCompany(id);
//     console.log({ company });
//   }
// };

const submitForm = async () => {
  loading.value = true;
  try {
    event.value.company_id = company.value.id;

    // alert(company.value.id);
    await createEvent(event.value);
  } catch (error) {
    errorMessage.value = `Erreur: ${error.message}`;
  } finally {
    loading.value = false;
  }
};

// Appel initial des données
onBeforeMount(async () => {
  try {
    await Promise.all([
      fetchCompanies(),
      // , fetchDepartements()
    ]);

    let company_slug = localStorage.getItem("currentCompany") ?? domain;

    // alert(company_slug); 
    if (company_slug) {
      await showCompany(company_slug ?? domain.value);
    } else {
      company_slug = "";
    }

    if (!isAuthenticated) {
      toast.info("L'utilisateur doit être connecté");
      setTimeout(
        () =>
          router.push({
            name: "RequestMeeting",
            params: {
              domain: domain.value,
            },
          }),
        1500
      );
    }
  } catch (error) {
    toast.error("Erreur lors du chargement des données.");
  }
});

// Gestion des retours de l'API
watch(statusCode, (newStatus) => {
  switch (newStatus) {
    case 201:
    case 200:   
      toast.success("Evénements ajouté");
      setTimeout(
        () =>
          router.push({
            name: "Menu",
            params: {
              domain: domain.value,
            },
          }),
        1500
      );

      break;
    case 400:
      toast.info("La requête est mal formée.");
      break;
    case 401:
      toast.info("Vous devez être authentifié.");
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
</script>

<template>
  <section class="request-meeting">
    <div class="background-gradi">
      <section class="request-meeting meeting-form">
        <div class="row align-items-center">
          <div class="col col-12 col-md-12 col-sm-12">
            <div class="d-flex justify-content-center align-items-center">
              <div
                class="d-flex justify-content-start mb-4 gap-3 align-items-center"
              >
                <button class="back" @click="goToMenu">Retour</button>
                <h3 class="mt-3">Création Évènement</h3>
              </div>
            </div>

            <!-- Affichage du logo de la compagnie -->
            <div class="d-flex justify-content-center" v-if="company?.logo">
              <img
                :src="`${publicDir}/logo/${company?.logo}`"
                height="100"
                width="100"
              />
            </div>

            <form @submit.prevent="submitForm">
              <!-- Sélection de l'entreprise -->
              <div>
                <label for="company_id">Entreprise</label><br />
                <!-- <select
                  class="form-control"
                  id="company_id"
                  v-model="event.company_id"
                  @change="onChangeCompany(event.company_id)"
                >
                  <option
                    v-for="(company, index) in companies"
                    :key="index"
                    :value="company.id"
                  >
                    {{ company.name }}
                  </option>
                </select> -->

                <input
                  disabled
                  v-if="company?.name"
                  type="text"
                  id="name"
                  v-model="company.name"
                  required
                /><br />
              </div>

              <!-- Nom de l'événement -->
              <div>
                <label for="name">Nom de l'événement</label><br />
                <input
                  type="text"
                  id="name"
                  v-model="event.name"
                  placeholder="Diner Gala SIKIHHK"
                  required
                /><br />
              </div>

              <!-- Lieu de l'événement -->
              <div>
                <label for="location">Lieu de l'événement</label><br />
                <input
                  type="text"
                  id="location"
                  v-model="event.location"
                  placeholder="SOCOCE"
                  required
                /><br />
              </div>

              <!-- Lieu de l'événement -->
              <div>
                <label for="address_name">Adresse</label><br />
                <input
                  type="text"
                  id="address_name"
                  v-model="event.address_name"
                  placeholder="Marcory"
                  required
                /><br />
              </div>

              <!-- Date de l'événement -->
              <div>
                <label for="date_event">Date de l'événement</label><br />
                <input
                  type="date"
                  id="date_event"
                  v-model="event.date_event"
                  placeholder="2024-10-08"
                  required
                /><br />
              </div>

              <!-- Heure de l'événement -->
              <div>
                <label for="time_event">Heure de l'événement</label><br />
                <input
                  type="time"
                  id="time_event"
                  v-model="event.time_event"
                  required
                /><br />
              </div>

              <!-- Sélection du département -->
              <!-- <div>
                <label for="departement_id">Département</label><br />
                <select
                  class="form-control"
                  id="departement_id"
                  v-model="event.departement_id"
                >
                  <option
                    v-for="(departement, index) in departements"
                    :key="index"
                    :value="departement.id"
                  >
                    {{ departement.name }}
                  </option>
                </select>
              </div> -->

              <!-- Bouton de soumission -->
              <div class="submit-button">
                <input type="submit" value="Soumettre" :disabled="loading" />
              </div>

              <!-- Message d'erreur -->
              <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
            </form>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
