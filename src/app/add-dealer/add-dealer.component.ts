import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DealerService } from '../services/dealer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-dealer',
  templateUrl: './add-dealer.component.html',
  styleUrls: ['./add-dealer.component.scss']
})
export class AddDealerComponent {
  dealerForm: FormGroup;

  constructor(private fb: FormBuilder, private dealerService: DealerService, private router: Router) {
    this.dealerForm = this.fb.group({
      srNo: ['', Validators.required],
      name: ['', Validators.required],
      cars: ['', [Validators.required, Validators.min(1)]],
      totalBudget: ['', [Validators.required, Validators.min(0)]],
      remainingBudget: ['', [Validators.required, Validators.min(0)]]
    });
  }
  

  onSubmit() {
    if (this.dealerForm.valid) {
      const newDealer = { id: Date.now(), ...this.dealerForm.value }; // Assign unique ID
      this.dealerService.addDealer(newDealer).subscribe(() => {
        alert('Dealer successfully added!');
        this.router.navigate(['/']); // Redirect to dealer list
      });
    }
  }
  onCancel() {
    this.dealerForm.reset();  // Reset the form
    this.router.navigate(['/']);  // Navigate back to the dealer list
  }
  
}
