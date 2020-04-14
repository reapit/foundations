<script>
  import searchWidgetStore from '../core/store'

  const handlePageChangeClick = (pageNumber) => async() => {
    searchWidgetStore.update(values => ({
      ...values,
      pageNumber: pageNumber
    }))
  }

</script>

<style>
.search-form-pagination {
  display: inline-block;
}

.search-form-pagination a {
  float: left;
  padding: 0.5em 1em;
  text-decoration: none;
}

.search-form-pagination a:hover:not(.active) {
  cursor: pointer;
}
</style>

<div class="search-form-pagination">
  {#if $searchWidgetStore.pageNumber - 1 > 0}
    <a
      data-testid="first-page"
      class="{$searchWidgetStore.themeClasses.pagination}"
      on:click|preventDefault={handlePageChangeClick(1)}
      href="javascript:void()"
    >
      &lt;&lt;
    </a>
    <a
      data-testid="prev-page"
      class="{$searchWidgetStore.themeClasses.pagination}"
      on:click|preventDefault={handlePageChangeClick($searchWidgetStore.pageNumber-1)}
      href="javascript:void()"
    >
      {$searchWidgetStore.pageNumber -1}
    </a>
  {/if}
  <a
    data-testid="current-page"
    class="{$searchWidgetStore.themeClasses.paginationActive}"
    href="javascript:void()"
  >
    {$searchWidgetStore.pageNumber}
  </a>
  {#if $searchWidgetStore.pageNumber + 1 < $searchWidgetStore.totalPage}
    <a
      data-testid="next-page"
      class="{$searchWidgetStore.themeClasses.pagination}"
      on:click|preventDefault={handlePageChangeClick($searchWidgetStore.pageNumber+1)}
      href="javascript:void()"
    >
      {$searchWidgetStore.pageNumber + 1}
    </a>
    <a
      data-testid="last-page"
      class="{$searchWidgetStore.themeClasses.pagination}"
      on:click|preventDefault={handlePageChangeClick($searchWidgetStore.totalPage)}
      href="javascript:void()"
    >
      &gt;&gt;
    </a>
  {/if}
</div>
