<script setup>
import { useLogin } from "@/services/login";
// import { useCompanies } from "@/services/useCompanies";
// import { useGlobalStore } from "@/stores/globalStore";
import { EventBus } from "@/utils/eventBus";
import { onMounted } from "vue";
import { watch } from "vue";
// import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const { login, username, password, statusCode, company_name, userInfo } =
  useLogin();

// const router = useRouter();

watch(statusCode, (newStatus) => {
  switch (newStatus) {
    case 200:
      toast.success("Connexion réussie.");
      console.log(">__________>");
      console.log({ company_name });
      console.log({ userInfo });

      setTimeout(() => {
        // router.push({
        //   name: "Menu",
        //   domain: userInfo.value.company ?? "scb",
        // });

        window.location = userInfo.value.company ?? "scb" + "/menu";
      }, 1500);
      break;
    case 201:
      toast.success("Utilisateur connecté avec succès.");
      break;
    case 400:
      toast.error("La requête est mal formée.");
      break;
    case 401:
      toast.error("Identifiants incorrects.");
      break;
    case 403:
      toast.error("  Accès refusé.");
      break;
    case 404:
      toast.error("La ressource demandée n'existe pas.");
      break;
    case 500:
      toast.error("Une erreur interne est survenue.");
      break;
    default:
      console.log(`Erreur inconnue - Code : ${newStatus}`);
  }
});

// const { publicDir } = useGlobalStore();
// const { showCompany, company } = useCompanies();
let company_slug = localStorage.getItem("currentCompany");

const sendData = (params, valueAdded) => {
  console.info({
    params: params,
    valueAdded: valueAdded,
  });
  EventBus[params] = valueAdded;
};

onMounted(async () => {
  // alert(window.location.pathname)
  if (window.location.pathname == "/sign-in") {
    if (company_slug) {
      sendData("company_slug", company_slug);
      // await showCompany(company_slug);
    } else {
      company_slug = "";
    }
  }
});
</script>

<template>
  <section class="background-gradi login-meeting">
    <div class="container">
      <div class="row align-items-center">
        <div class="col col-12 col-md-12 col-sm-12">
          <div class="popup-logo">
            <!-- <router-link to="/" v-if="company && domain != 'scb'"
              ><img
                class="logo"
                :src="`${publicDir}/logo/${company?.logo}`"
                :alt="`${publicDir}/logo/${company?.logo}`"
            /></router-link> -->
            <!-- v-else -->
            <a href="#" 
              ><img
                src="@/assets/secure-check-logo.png"
                class=""
                alt="secure-check-logo"
            /></a>
          </div>
          <form action="">
            <div>
              <label for="client-email">Email</label>
              <input
                type="email"
                id="client-email"
                name="client-email"
                v-model="username"
              /><br />
            </div>
            <div>
              <label for="pwd">Mot de passe</label>
              <input type="password" id="pwd" name="pwd" v-model="password" />
            </div>
            <div class="submit-button">
              <input type="submit" value="Soumettre" @click.prevent="login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
