<template>
  <CardModal
    name="viridiancitypokemart"
    title="PokeMart"
  >
    <template #body>
      <div
        id="viridianPokeMartModalBox"
      >
        <button
          onclick="userInteractions.viridianPokeMartEvent()"
          class="button"
        >
          PokeMart Attendant
        </button><br>
        <button
          onclick="userInteractions.viewShop()"
          class="button"
        >
          Shop
        </button><br>
      </div>
    </template>
  </CardModal>
</template>

<script>
import CardModal from '../../../common/CardModal.vue';

export default {
    components: {
        CardModal,
    },
};
</script>
