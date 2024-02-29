import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideWalletAdapter } from '@heavy-duty/wallet-adapter';
import { HdWalletAdapterMaterialModule } from '@heavy-duty/wallet-adapter-material';
import { appRoutes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      HdWalletAdapterMaterialModule
    ]),
    provideRouter(appRoutes), 
    provideAnimationsAsync(), 
    provideWalletAdapter(),
    provideHttpClient(),
  ],
};
