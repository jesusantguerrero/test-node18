<script lang="ts" setup>
import type { ISite } from "@/utils";
import { computed, reactive, watch } from "vue";

const { siteData } = defineProps<{
  siteData: ISite;
}>();

const site = reactive({
  title: "",
  url: "",
  selectorTemplate: "github",
  selector: "",
});

watch(
  () => siteData,
  (data) => {
    site.selector = data?.selector ?? "";
    site.title = data.title;
    site.url = data.url;
    site.selectorTemplate = data?.selectorTemplate ?? "";
  }
);

const isGithubSite = computed(() => site.selectorTemplate == "github");
</script>

<template>
  <form
    @submit.prevent="$emit('submit', site)"
    className="justify-between px-5 py-5 space-x-2 bg-gray-800"
  >
    <div className="flex w-full space-x-2 text-left">
      <div className="flex flex-col w-full">
        <label htmlFor="title" className="px-5 text-xl">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          v-model="site.title"
          className="w-full px-5 py-2 text-white bg-gray-700 rounded-md"
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="url" className="px-5 text-xl">URL</label>
        <input
          type="text"
          name="url"
          id="url"
          className="w-full px-5 py-2 text-white bg-gray-700 rounded-md"
          v-model="site.url"
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="selector" className="px-5 text-xl">Selector</label>
        <div
          className="flex space-x-2"
          v-model="site.selectorTemplate"
          @change="onChange"
        >
          <select
            name="selectorTemplate"
            id="selectorTemplate"
            v-model="site.selectorTemplate"
            className="w-full px-5 py-2 text-white bg-gray-700 rounded-md"
          >
            <option value="github">Github</option>
            <option value="custom">Custom</option>
          </select>
          <input
            v-if="!isGithubSite"
            type="text"
            name="selector"
            id="selector"
            className="w-full px-5 py-2 text-white bg-gray-700 rounded-md"
            v-model="site.selector"
          />
        </div>
      </div>
      <div className="flex flex-col w-full" v-if="!isGithubSite">
        <label htmlFor="version" className="px-5 text-xl">Action</label>
        <div className="flex space-x-2">
          <input
            type="text"
            name="action"
            id="action"
            placeholder="Name"
            className="w-full px-5 py-2 text-white bg-gray-700 rounded-md"
            v-model="site.action"
          />
          <input
            type="text"
            name="value"
            id="value"
            placeholder="value"
            className="w-full px-5 py-2 text-white bg-gray-700 rounded-md"
            v-model="site.value"
          />
          <input
            type="number"
            name="index"
            id="index"
            placeholder="index"
            className="w-16 px-1 py-2 text-white bg-gray-700 rounded-md"
            v-model="site.index"
          />
        </div>
      </div>
    </div>
    <div className="flex justify-end mt-5 space-x-3">
      <button
        type="button"
        className="px-5 py-2 bg-red-400 rounded-md text-md"
        @click="$emit('cancel')"
      >
        Cancel
      </button>
      <button className="px-5 py-2 bg-green-400 rounded-md text-md">
        Save
      </button>
    </div>
  </form>
</template>
