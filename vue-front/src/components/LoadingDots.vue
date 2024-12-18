<template>
  <div class="m-auto h-[15rem] flex flex-col items-center justify-center">
    <div class="pulse-container pb-4">
      <div class="pulse-bubble pulse-bubble-1"></div>
      <div class="pulse-bubble pulse-bubble-2"></div>
      <div class="pulse-bubble pulse-bubble-3"></div>
      <div class="pulse-bubble pulse-bubble-4"></div>
    </div>
    <span class="font-medium text-xl text-center text-black"> Chargement des données </span>
    <span>veuillez patienter quelques secondes</span>
  </div>
</template>

<style>
@keyframes pulse {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0.25;
    transform: scale(0.75);
  }
}

.pulse-container {
  width: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pulse-bubble {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: black;
}

.pulse-bubble-1 {
  animation: pulse 0.9s ease 0s infinite alternate;
}
.pulse-bubble-2 {
  animation: pulse 0.9s ease 0.3s infinite alternate;
}
.pulse-bubble-3 {
  animation: pulse 0.9s ease 0.5s infinite alternate;
}
.pulse-bubble-4 {
  animation: pulse 0.9s ease 0.8s infinite alternate;
}
</style>
