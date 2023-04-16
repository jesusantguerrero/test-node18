<script setup lang="ts">
import { useRunCheckResource, useFetchSitesResource, useStoreSiteResource } from "@/_features/sites";
import SiteTable from "@/components/SiteTable.vue";

const [sites, { refresh }] = useFetchSitesResource();
const [runCheck] = useRunCheckResource();

</script>

<template>
  <div class="h-screen text-white bg-gray-800">
    <header class="text-center">
      <h1 class="text-4xl font-bold text-white">Version Checker App</h1>
    </header>
    <main class="max-w-6xl py-5 mx-auto" v-if="sites">
      <SiteTable :sites="sites" @check="runCheck" @saved="refresh" />
    </main>
  </div>
</template>
