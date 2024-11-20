<script setup>
import { useUserStore } from "@/stores/useUserStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

// Utilisation du routeur pour récupérer le domaine courant
const route = useRoute();
const domain = ref(route.params.domain || "scb");

const userStore = useUserStore();
const isAuthenticated = userStore.isAuthenticated();
const router = useRouter();
const currentRole = ref();

const roles = ref();
roles.value = JSON.parse(localStorage.getItem("userInfo"));
currentRole.value = roles.value?.roles[0];

onMounted(() => {
  console.log("Rôle actuel :", currentRole.value);
  console.log("isAuthenticated :", isAuthenticated);
  if (!isAuthenticated) {
    console.log("RequestMeeting");
    router.push({
      name: "RequestMeeting",
      params: {
        domain: domain.value,
      },
    });
  }
});
</script>

<template>
  <section class="background-gradi selectcheckintype">
    <div class="container">
      <div class="row align-items-center">
        <div class="col col-12 col-md-12 col-sm-12">
          <div class="popup-logo">
            <router-link
              :to="{ name: 'RequestMeeting', params: { domain: domain } }"
            >
              <img
                src="@/assets/secure-check-logo.png"
                class=""
                alt="secure-check-logo"
              />
            </router-link>
          </div>

          <div class="selectcheck-all" v-if="isAuthenticated">
            <h5><span>Veuillez sélectionner</span></h5>
            <div class="selectcheckintype-btns">
              <!-- Navigation avec domaine -->
              <router-link
                :to="{ name: 'CreateVisitor', params: { domain: domain } }"
                class="mt-2"
                >Meetings</router-link
              >
              <!-- userStore.isAdmin(currentRole) ||s -->
              <router-link
                :to="{ name: 'ListQrcode', params: { domain: domain } }"
                class="mt-2"
                v-if="
                  userStore.isEmployee(currentRole) ||
                  userStore.isAdmin(currentRole) ||
                  userStore.isSupervisor(currentRole)
                "
                >Demandes</router-link
              >
              <router-link
                :to="{ name: 'ManalCheck', params: { domain: domain } }"
                class="mt-2"
                v-if="
                  userStore.isAdmin(currentRole) ||
                  userStore.isEmployee(currentRole) ||
                  userStore.isSupervisor(currentRole)
                "
                >Manual Code</router-link
              >

              <router-link
                v-if="
                  userStore.isAdmin(currentRole) ||
                  userStore.isSupervisor(currentRole)
                "
                :to="{ name: 'CreateEvent', params: { domain: domain } }"
                class="mt-2"
              >
                Créer Event
              </router-link>

              <router-link
                v-if="
                  userStore.isAdmin(currentRole) ||
                  userStore.isSupervisor(currentRole) ||
                  userStore.isManager(currentRole)
                "
                :to="{ name: 'EventList', params: { domain: domain } }"
                class="mt-2"
              >
                Liste Event
              </router-link>

              <router-link
                v-if="
                  userStore.isAdmin(currentRole) ||
                  userStore.isSupervisor(currentRole)
                "
                :to="{ name: 'ListUser', params: { domain: domain } }"
                class="mt-2"
              >
                Utilisateurs
              </router-link>

              <router-link
                v-if="
                  userStore.isAdmin(currentRole) ||
                  userStore.isManager(currentRole)
                "
                :to="{ name: 'CreateUser', params: { domain: domain } }"
                class="mt-2"
              >
                + Utilisateurs
              </router-link>

              <router-link
                v-if="
                  userStore.isAdmin(currentRole) ||
                  userStore.isSupervisor(currentRole) ||
                  userStore.isManager(currentRole)
                "
                :to="{ name: 'CreateCompany', params: { domain: domain } }"
                class="mt-2"
              >
                + Entreprise
              </router-link>

              <router-link
                v-if="
                  userStore.isAdmin(currentRole) ||
                  userStore.isSupervisor(currentRole) ||
                  userStore.isManager(currentRole)
                "
                :to="{ name: 'CreateQRCode', params: { domain: domain } }"
                class="mt-2"
              >
                + Création QRCode 
              </router-link>
              <!-- Add the Camera Button -->
              <router-link
                v-if="
                  userStore.isAdmin(currentRole) || 
                  userStore.isSupervisor(currentRole) || 
                  userStore.isManager(currentRole) || 
                  userStore.isEmployee(currentRole)  
                "
                :to="{ name: 'Camera', params: { domain: domain } }"
                class="mt-2"
              >
                QR Code
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu-item {
  width: 20%;
}

.selectcheckintype .col.col-12.col-md-12.col-sm-12 {
  text-align: center;
  margin: 0px auto 0px auto !important;
  max-width: 900px;
  background: #ffffff;
  padding: 80px 40px;
  border-radius: 15px;
  transform: translate(-50%, -50%);
  top: 50%;
  position: absolute;
  left: 50%;
}
</style>
