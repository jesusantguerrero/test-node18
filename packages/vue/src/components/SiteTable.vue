<script setup lang="ts">
import type { ISite } from "@/utils";
import { reactive, ref } from "vue";
import SiteItem from "./SiteItem.vue";
import SiteForm from "./SiteForm.vue";

defineProps<{ sites: ISite[] }>();
const emit = defineEmits(["saved", "deleted"]);

const isAdding = ref(false);
const toggleAdding = () => {
  isAdding.value = !isAdding.value;
};
interface ISiteData {
  id?: string;
  action: string;
  value: string;
  index?: number;
}

const siteData = reactive<ISiteData>({
  id: undefined,
  action: "",
  value: "",
  index: 0,
});

const isLoading = ref(false);
const onSubmit = async (siteData: ISiteData) => {
  if (isLoading.value) return;
  isLoading.value = true;
  const formData = {
    ...siteData,
    actions: [
      {
        action: siteData.action,
        value: siteData.value,
        index: siteData.index || 0,
      },
    ],
  };

  let endpoint = `/api/v1/sites`;
  let method = "POST";
  if (siteData.id) {
    endpoint = `/api/v1/sites/${siteData.id}`;
    method = "PUT";
  }

  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    emit("saved", data);
  } finally {
    isLoading.value = false;
  }
};

const onDelete = async (site: ISite) => {
  if (confirm(`Delete site ${site.title}?`)) {
    fetch(`/api/sites/${site.id}`, { method: "DELETE" }).then(() => {
      emit("deleted", site);
    });
  }
};
</script>

<template>
  <div class="mx-auto max-w-7xl">
    <header class="flex justify-between mb-5">
      <section>
        <h4 class="font-bold text-2x">Sites</h4>
      </section>
      <section class="flex space-x-2">
        <button
          class="px-5 py-1 bg-gray-600 rounded-md text-md"
          @click="toggleAdding"
        >
          Add
        </button>
        <button
          class="px-5 bg-gray-600 rounded-md text-md"
          @click="$emit('check')"
        >
          Check sites
        </button>
      </section>
    </header>
    <section class="overflow-hidden rounded-md">
      <SiteForm
        v-if="isAdding"
        :site-data="siteData"
        :is-loading="isLoading"
        @submit="onSubmit"
      />
      <SiteItem
        v-for="site in sites"
        :site="site"
        :key="site.id"
        @edit="$emit('edit', site)"
        @deleted="$emit('deleted', site)"
      />
    </section>
  </div>
</template>
