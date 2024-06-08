<template>
   <div id="div1">

   </div>
</template>

<script setup>
import E from "wangeditor"
import { ref, onMounted, defineEmits,defineProps } from "vue"

const emits = defineEmits(['event'])

const props = defineProps({
   content:String
})

onMounted(() => {
   const editor = new E("#div1");
   editor.create();
   props.content && editor.txt.html(props.content);
   editor.config.onchange = function (newHtml) {
      emits("event", newHtml);
   } 
})

</script>