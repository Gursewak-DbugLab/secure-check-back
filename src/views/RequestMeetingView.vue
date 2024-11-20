<script setup>
import { useCompanies } from "@/services/useCompanies";
// import { useUserInfo } from "@/services/useUserInfo";
import { useGlobalStore } from "@/stores/globalStore";
import { useUserStore } from "@/stores/useUserStore";
import { EventBus } from "@/utils/eventBus";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const roles = ref(JSON.parse(localStorage.getItem("userInfo")) || {});
const userStore = useUserStore();
const currentRole = ref(roles?.value?.roles ? roles.value.roles[0] : "");
const { showCompany, company } = useCompanies();

const route = useRoute();
const router = useRouter();
const { publicDir } = useGlobalStore();

const sendData = (params, valueAdded) => {
  console.info({
    params: params,
    valueAdded: valueAdded,
  });
  EventBus[params] = valueAdded;
};

const domain = ref();
onBeforeMount(async () => {
  domain.value = route.params.domain || "scb";
  sendData("company_slug", domain.value);

  // alert(userStore.isSupervisor(currentRole.value))
  localStorage.setItem("currentCompany", domain.value);
  let company_slug = localStorage.getItem("currentCompany");
  if (company_slug) {
    await showCompany(company_slug ?? domain.value);
  } else {
    company_slug = "";
  }

  if (domain.value) {
    router.push({
      name: "RequestMeeting",
      params: {
        domain: domain.value,
      },
    });
  }

  localStorage.setItem(
    "roles_list",
    JSON.stringify([
      "ROLE_USER",
      "ROLE_EMPLOYEE",
      "ROLE_SUPERVISOR",
      "ROLE_ADMIN",
      "ROLE_SUPER_ADMIN",
    ])
  );
});
</script>

<template>
  <section class="background-gradi request-meeting">
    <div class="container">
      <div class="row align-items-center">
        <div class="col col-12 col-md-12 col-sm-12">
          <div class="popup-logo">
            <router-link to="/" v-if="!company_slug && !company"
              ><img
                src="@/assets/secure-check-logo.png"
                alt="secure-check-logo"
            /></router-link>

            <!-- v-else-if="company_slug" -->
            <router-link to="/" v-if="domain && company"
              ><img
                :src="`${publicDir}/logo/${company?.logo}`"
                :alt="company.slug"
            /></router-link>
          </div>

          <div class="request-btn">
            <router-link
              :to="{ name: 'CreateVisitor', params: { domain: domain } }"
            >
              Request-meeting
            </router-link>
          </div>

          <div
            class="request-btn"
            v-if="
              userStore.isEmployee(currentRole) ||
              userStore.isAdmin(currentRole) ||
              userStore.isManager(currentRole)||
              userStore.isSupervisor(currentRole)
            "
          >
            <router-link :to="{ name: 'Menu', params: { domain: domain } }"
              >Menu</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
