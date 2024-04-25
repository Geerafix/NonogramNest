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
    <BasicButton btnText="Test powiadomienia" @click="showNotification('Dodano', 2000)"></BasicButton>
    <div ref="notification" 
    class="
        px-3 
        py-[5px] 
        bg-green-700/85
        border-green-950/50
        text-slate-200   
        rounded-lg
        border-b-4 
        transition-all
        font-thin
        font-sans
        text-lg
        tracking-wide
        select-none
        opacity-0
        absolute
        bottom-3
        right-3">
        <div id="notificationContent">
            <p id="msg"></p>
        </div>
    </div>
</template>