import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, Event } from '@angular/router';
import { FooterComponent } from './components/ComponentesVisuais/footer/footer.component';
import { NavbarComponent } from './components/ComponentesVisuais/navbar/navbar.component';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayNavbar: boolean = true;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Defina as rotas onde a navbar deve ser ocultada
      const hiddenNavbarRoutes = ['/tela-login', '/tela-cadastro-usuario', '/tela-inicio'];
      this.displayNavbar = !hiddenNavbarRoutes.some(route => event.urlAfterRedirects.startsWith(route));
    });
  }

  title = 'PISS';
}
