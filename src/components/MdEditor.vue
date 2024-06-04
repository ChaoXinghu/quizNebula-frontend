<template>
  <Editor :value="value" :plugins="plugins" @handle="handleChange" />
</template>

<script setup lang="ts">
import highlight from "@bytemd/plugin-highlight";
import { ref } from "vue";
import gfm from "@bytemd/plugin-gfm";
import { Editor } from "@bytemd/vue-next";

const plugins = [
  gfm(),
  highlight(),
  //添加更多
];
const value = ref("");

const handleChange = (v: string) => {
  value.value = v;
};
</script>

<style scoped></style>
