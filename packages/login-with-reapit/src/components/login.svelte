<script lang="ts">
  import SignInButton from './sign-in-button.svelte'
</script>

<style>
  button {
    display: inline-block;
    background-color: #0061a8;
    max-height: 48px;
    max-width: 290px;
    cursor: pointer;
    border: 0;
    padding: 0;
  }
  button:hover {
    background-color: #23a4de;
  }
</style>

<button><SignInButton /></button>
