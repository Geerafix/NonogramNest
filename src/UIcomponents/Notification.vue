<script setup>
import BasicButton from './BasicButton.vue';
import { ref } from 'vue'
const notification = ref(null);
let timeoutId;

function showNotification(msg, ms) {
    if (timeoutId) { clearTimeout(timeoutId); }

    notification.value.style.opacity = '0';
    notification.value.style.visibility = 'hidden';
    document.getElementById('msg').textContent = msg;
    notification.value.style.opacity = '1';
    notification.value.style.visibility = 'visible';
    
    timeoutId = setTimeout(function() {
        notification.value.style.opacity = '0';
        notification.value.style.visibility = 'hidden';
    }, ms);
}


</script>

<template>
    <BasicButton btnText="Test powiadomienia" @click="showNotification('Dodano', 2000)" class="absolute top-3 left-3"></BasicButton>
    <div ref="notification" 
    class="
        px-4 
        py-[8px] 
        bg-green-700/85
        border-green-950/50
        text-slate-200   
        rounded-xl
        border-b-4 
        transition-all
        font-thin
        font-sans
        text-2xl
        tracking-wide
        select-none
        opacity-0
        absolute
        top-3
        right-3">
        <div id="notificationContent">
            <p id="msg"></p>
        </div>
    </div>
</template>