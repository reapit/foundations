import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
} from 'react'
import debounce from 'just-debounce-it'
import {
  elMb5,
  InputGroup,
  InputWrapFull,
  Loader,
  MultiSelectInput,
  MultiSelectOption,
  PersistentNotification,
} from '@reapit/elements'
import { useReapitGet, GetAction } from '@reapit/use-reapit-data'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'

export interface SearchableMultiSelectProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string // The Id to be applied to the MultiSelect
  errorString: string // The error message you get from React Hook Form
  defaultList: any[] // Default selected values eg a list of Apps
  currentValues: string[] // The current selected values for the MultiSelect eg from React Hook Form getValues().foo
  reapitConnectBrowserSession: ReapitConnectBrowserSession // RC session object
  valueKey: string // The key in the fetched object to set as the value for a single selected item eg 'id'
  nameKey: string // The key in the fetched object to set as the display name for a single selected item eg 'name'
  searchKey: string // The query string key to filter the API on eg 'appName' - will be the value of the text input
  dataListKey: string // The accessor for the fetched list eg 'data' or '_embedded'
  action: GetAction // A useReapitGet action eg getActions(window.reapit.config.appEnv)[GetActionNames.getInstallations]
  label?: string // The Label to be applied to the Search input
  queryParams?: Object // Any addtional query params eg pageSize or clientId
  noneSelectedLabel?: string // An optional label for the multi select if no items are selected
}

/**
 * example usage with React Hook Form
 
  <SearchableMultiSelect
    id="app-ids-select"
    label="Search Apps"
    errorString={errors.appIds?.message ?? ''}
    defaultList={[]} // pass a prefetched list of app models here if you have pre-selected apps
    currentValues={getValues().appIds?.split(',')?.filter(Boolean)}
    reapitConnectBrowserSession={reapitConnectBrowserSession}
    valueKey="id"
    nameKey="name"
    searchKey="appName"
    dataListKey="data"
    action={getActions(window.reapit.config.appEnv)[GetActionNames.getApps]}
    queryParams={{ pageSize: 100 }}
    noneSelectedLabel="No apps selected"
    {...register('appIds')}
  />
 */

export const handleSetInitialOptions =
  (defaultList: any, nameKey: string, valueKey: string, setOptions: Dispatch<SetStateAction<MultiSelectOption[]>>) =>
  () => {
    if (defaultList.length) {
      const initialOptions = defaultList.map((item) => ({ value: item[valueKey], name: item[nameKey] }))

      setOptions(initialOptions)
    }
  }

export const handleSetNewOptions =
  (
    currentValues: string[],
    options: MultiSelectOption[],
    data: any[],
    nameKey: string,
    valueKey: string,
    setOptions: Dispatch<SetStateAction<MultiSelectOption[]>>,
  ) =>
  () => {
    const newSelectedOptions = options.filter((option) => currentValues.includes(option.value))
    const newFetchedOptions = data.map((item) => ({ value: item[valueKey], name: item[nameKey] }))
    const newOptions = [...newSelectedOptions, ...newFetchedOptions]
    const uniqueOptions = [...new Set([...newOptions.map((option) => JSON.stringify(option))])].map((jsonOption) =>
      JSON.parse(jsonOption),
    )

    setOptions(uniqueOptions)
  }

export const SearchableMultiSelect: FC<SearchableMultiSelectProps> = forwardRef(
  (
    {
      label,
      errorString,
      defaultList,
      currentValues,
      noneSelectedLabel,
      queryParams,
      reapitConnectBrowserSession,
      action,
      valueKey,
      nameKey,
      dataListKey,
      searchKey,
      ...rest
    },
    ref: ForwardedRef<InputHTMLAttributes<HTMLInputElement>>,
  ) => {
    const [searchString, setSearchString] = useState<string>('')
    const [options, setOptions] = useState<MultiSelectOption[]>([])
    const debouncedSearch = useCallback(
      debounce((event: ChangeEvent<HTMLInputElement>) => setSearchString(event.target.value), 500),
      [500],
    )
    const params = queryParams ?? {}

    const [response, loading] = useReapitGet<any>({
      reapitConnectBrowserSession,
      action,
      queryParams: {
        ...params,
        [searchKey]: searchString,
      },
      fetchWhenTrue: [searchString],
    })

    const data = response ? response[dataListKey] : []
    const defaultValues = defaultList.map((item) => item[valueKey]).filter(Boolean)

    useEffect(handleSetInitialOptions(defaultList, nameKey, valueKey, setOptions), [defaultList])

    useEffect(handleSetNewOptions(currentValues, options, data, nameKey, valueKey, setOptions), [
      searchString,
      response,
    ])

    return (
      <InputWrapFull>
        <InputGroup
          className={elMb5}
          onChange={debouncedSearch}
          icon="searchSystem"
          placeholder="Search"
          label={label ?? 'Search'}
        />
        {loading && <Loader className={elMb5} />}
        <MultiSelectInput
          className={elMb5}
          noneSelectedLabel={noneSelectedLabel ? noneSelectedLabel : 'No items selected'}
          defaultValues={[...new Set(defaultValues)]}
          options={options}
          ref={ref}
          {...rest}
        />
        {errorString && (
          <PersistentNotification isFullWidth isExpanded intent="danger" isInline>
            {errorString}
          </PersistentNotification>
        )}
        {response && !data.length && (
          <PersistentNotification isFullWidth isExpanded intent="secondary" isInline>
            No results found for your search query
          </PersistentNotification>
        )}
      </InputWrapFull>
    )
  },
)
