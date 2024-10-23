import { Component } from '@angular/core';
import { NavBarComponent } from "../../layouts/components/nav-bar/nav-bar.component";
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from "../../layouts/components/footer/footer.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavBarComponent, NgbDropdownModule, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
