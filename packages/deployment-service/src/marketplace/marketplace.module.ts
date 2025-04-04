import { Module } from '@nestjs/common'
import { MarketplaceProvider } from './marketplace.provider'
import { ConfigModule } from '@nestjs/config'
import marketplace from '../config/marketplace'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [ConfigModule.forFeature(marketplace), HttpModule],
  providers: [MarketplaceProvider],
  exports: [MarketplaceProvider],
})
export class MarketplaceModule {}
