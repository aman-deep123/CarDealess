import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealersComponent } from './dealers/dealers.component';
import { AddDealerComponent } from './add-dealer/add-dealer.component';
import { EditDealerComponent } from './edit-dealer/edit-dealer.component';

const routes: Routes = [
  { path: '', component: DealersComponent }, // Show Dealers by Default
  { path: 'add-dealer', component: AddDealerComponent },
  { path: 'edit-dealer/:id', component: EditDealerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
