<script setup>
import Navbar from "@/components/_partials/NavbarComponent.vue";
import Footer from "@/components/_partials/FooterComponent.vue";
// import { useRoute } from "vue-router";
// const route = useRoute();
</script>

<template>
  <div>
    <Navbar></Navbar>
      <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
