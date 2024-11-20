<script setup>
import { toast } from "vue3-toastify";
import { useGlobalStore } from "@/stores/globalStore";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const { publicDir } = useGlobalStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  if (route.params.uidn) {
    toast.info("Bien joué");
  } else {
    router.push("/");
  }
});
</script>

<template>
  <section class="background-gradi request-meeting">
    <div class="container">
      <div class="row align-items-center">
        <div class="col col-12 col-md-12 col-sm-12">
          <div class="popup-logo">
            <router-link to="/">
              <img
                src="@/assets/success-svgrepo-com.svg"
                class=""
                :alt="`${publicDir}/qrcode/qrcode-${uidn}.png`"
              />
            </router-link>
            <div class="text-center py-2">
              <h3>CheckOut éffectué</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.request-btn-cannel {
  margin: 10px auto 0px auto;
  display: inline-block;
  text-align: center;
  width: 100%;
}
.request-btn-cannel a {
  background: #b92b00;
  color: #ffffff;
  border-radius: 10px;
  padding: 20px 100px;
  font-weight: 600;
  overflow: hidden;
  margin: 0 auto;
  float: left;
  width: 100%;
  font-size: 20px;
}

.request-btn a {
  /*background: #b92b00;*/
  color: #ffffff;
  border-radius: 10px;
  padding: 20px 100px;
  font-weight: 600;
  overflow: hidden;
  margin: 0 auto;
  float: left;
  width: 100%;
  font-size: 20px;
}

.request-btn-cannel a:hover {
  background: #000000;
  color: #ffffff;
}
</style>
