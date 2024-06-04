<template>
  <Viewer :value="value" :plugins="plugins" />
</template>

<script setup lang="ts">
/**
 * 定义组件属性类型
 */
import highlight from "@bytemd/plugin-highlight";
import { defineProps, withDefaults } from "vue";
import gfm from "@bytemd/plugin-gfm";
import { Viewer } from "@bytemd/vue-next";

interface Props {
  value: string;
}

const plugins = [gfm(), highlight()];

//给组件指定初始值
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>

<style scoped></style>
