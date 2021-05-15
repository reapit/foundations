import DataLoader from 'dataloader'

export type ServerDataLoader = {
  configurationLoader: DataLoader<string, any, string>
  propertyLoader: DataLoader<string, any, string>
  officeLoader: DataLoader<string, any, string>
  negotiatorLoader: DataLoader<string, any, string>
}
