<template>
   <div id="div1">

   </div>
</template>

<script setup>
import E from "wangeditor"
import { ref, onMounted, defineEmits } from "vue"

const emits = defineEmits(['event'])

onMounted(() => {
   const editor = new E("#div1");
   editor.create();
   editor.config.onchange = function (newHtml) {
      emits("event", newHtml);
   } 
})

</script>