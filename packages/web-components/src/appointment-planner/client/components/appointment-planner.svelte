<script>
import {weekStore, daysOfWeek} from '../core/store/week-store'
console.log($daysOfWeek);


</script>

<!-- onClick -->
<div>
  <button on:click={weekStore.increment}>increment</button>
  <button on:click={weekStore.decrement}>decrement</button>
</div>
