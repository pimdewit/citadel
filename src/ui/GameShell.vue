<template>
  <canvas ref="canvas"/>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {Game} from "../game";

const canvas = ref<HTMLCanvasElement>();

onMounted(() => {
  const game = new Game(canvas.value!);
  game.render();
});
</script>
