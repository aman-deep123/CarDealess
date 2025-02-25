import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DealerService } from '../services/dealer.service'; // Import the service

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.scss']
})
export class DealersComponent {
  dealers: any[] = [];
  filteredDealers: any[] = [];
  searchTerm: string = '';

  constructor(private dealerService: DealerService, private router: Router) {}

  ngOnInit() {
    this.loadDealers();
  }

  loadDealers() {
    this.dealerService.getDealers().subscribe(data => {
      this.dealers = data;
      this.filteredDealers = data; // Initialize filtered list with all dealers
    });
  }

  deleteDealer(id: number) {
    if (confirm('Are you sure you want to delete this dealer?')) {
      this.dealerService.deleteDealer(id).subscribe(() => {
        this.dealers = this.dealers.filter(dealer => dealer.id !== id);
        this.filteredDealers = this.filteredDealers.filter(dealer => dealer.id !== id);
        alert('Dealer successfully deleted!');
      });
    }
  }

  goToAddDealer() {
    this.router.navigate(['/add-dealer']);
  }

  onSearchChange() {
    this.filteredDealers = this.dealers.filter(dealer =>
      dealer.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
