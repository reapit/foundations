<script lang="ts">
  import IntroSlide from '../components/intro-slide.svelte'
  import CrmSlide from '../components/crm-slide.svelte'
</script>

<svelte:head>
  <title>Geo Diary</title>
</svelte:head>

<main>
  <IntroSlide />
  <CrmSlide />
</main>

<style>
  @import '../../node_modules/@reapit/elements/dist/index.css';
</style>
