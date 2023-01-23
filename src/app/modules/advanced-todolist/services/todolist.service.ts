import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  private app;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBDfVMq4N-yVNbMF7sb3TO0MHMHaupAZvE",
      authDomain: "sandbox-bec0b.firebaseapp.com",
      projectId: "sandbox-bec0b",
      storageBucket: "sandbox-bec0b.appspot.com",
      messagingSenderId: "762304835347",
      appId: "1:762304835347:web:e7d8affac301c596b734e6"
    };
    this.app = initializeApp(firebaseConfig);
  }
}
