import { Component } from '@angular/core';
import { NavBarComponent } from "../../layouts/components/nav-bar/nav-bar.component";
import { FooterComponent } from "../../layouts/components/footer/footer.component";

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})
export class BillsComponent {

}
