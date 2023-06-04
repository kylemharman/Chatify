import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { environment } from '@chatify/core';
import { MessageService } from 'primeng/api';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth()),
      provideStorage(() => getStorage()),
      provideFunctions(() => getFunctions())
    ),
    MessageService,
  ],
};
