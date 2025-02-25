import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DealerService {
  private storageKey = 'dealers'; // Key for local storage

  constructor(private http: HttpClient) {}

  // Load dealers from Local Storage or JSON file
  getDealers(): Observable<any[]> {
    const storedDealers = localStorage.getItem(this.storageKey);
    if (storedDealers) {
      return of(JSON.parse(storedDealers));
    } else {
      return this.http.get<any[]>('assets/mock-data.json'); // Initial load from JSON
    }
  }

  // Save dealers to Local Storage
  private saveDealers(dealers: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(dealers));
  }

  // Add new dealer
  addDealer(dealer: any): Observable<void> {
    return this.getDealers().pipe(
      map(dealers => {
        dealers.push(dealer);
        this.saveDealers(dealers); // Save updated list to Local Storage
      })
    );
  }

  // Delete dealer
  deleteDealer(id: number): Observable<void> {
    return this.getDealers().pipe(
      map(dealers => {
        const updatedDealers = dealers.filter(dealer => dealer.id !== id);
        this.saveDealers(updatedDealers);
      })
    );
  }
  // Get dealer by ID
getDealerById(id: number): Observable<any> {
  return this.getDealers().pipe(
    map(dealers => dealers.find(dealer => dealer.id === id) || null) // Return null if not found
  );
}

  // Update dealer details
updateDealer(id: number, updatedDealer: any): Observable<any> {
  return this.getDealers().pipe(
    map(dealers => {
      const index = dealers.findIndex(dealer => dealer.id === id);
      if (index !== -1) {
        dealers[index] = { ...dealers[index], ...updatedDealer };
        this.saveDealers(dealers); // Save the updated list back to local storage
        return dealers[index]; // Return the updated dealer
      }
      return null; // Return null if dealer is not found
    })
  );
}

   
}
