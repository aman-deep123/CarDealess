import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DealerService } from '../services/dealer.service';

@Component({
  selector: 'app-edit-dealer',
  templateUrl: './edit-dealer.component.html',
  styleUrls: ['./edit-dealer.component.scss']
})
export class EditDealerComponent implements OnInit {
  dealerForm: FormGroup;
  dealerId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dealerService: DealerService
  ) {
    this.dealerForm = this.fb.group({
      id: [{ value: '', disabled: true }], // Keep it disabled
      name: ['', Validators.required],
      cars: ['', [Validators.required, Validators.min(1)]],
      totalBudget: ['', [Validators.required, Validators.min(0)]],
      remainingBudget: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.dealerId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.dealerId) {
      alert('Invalid dealer ID.');
      this.router.navigate(['/dealerships']);
      return;
    }

    this.loadDealerData();
  }

  loadDealerData() {
    this.dealerService.getDealerById(this.dealerId).subscribe(dealer => {
      if (dealer) {
        this.dealerForm.patchValue(dealer);
      } else {
        alert('Dealer not found.');
        this.router.navigate(['/dealerships']);
      }
    });
  }

  onSubmit() {
    if (this.dealerForm.valid) {
      const updatedDealer = { ...this.dealerForm.getRawValue(), id: this.dealerId }; // Ensure ID is included

      this.dealerService.updateDealer(this.dealerId, updatedDealer).subscribe(
        () => {
          alert('Dealer successfully updated!');
          this.router.navigate(['/']);
        },
        error => {
          console.error('Update failed:', error);
          alert('Failed to update dealer.');
        }
      );
    }
  }
  onCancel() {
    this.dealerForm.reset();  // Reset the form
    this.router.navigate(['/']);  // Navigate back to the dealer list
  }
}
