import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { environment } from '../../environments/environment';
import { HeroDialogComponent } from '../hero-dialog/hero-dialog.component';
import { Hero } from '../hero.model';
import { HeroesService } from '../heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];

  endpoint = '';

  error = '';

  heroes: Hero[] = [];

  isLoading = false;

  sort: Sort = {
    active: 'name',
    direction: 'asc',
  };

  constructor(public dialog: MatDialog, private heroesService: HeroesService) {
    const endpoint = localStorage.getItem('endpoint');

    if (endpoint) {
      this.endpoint = endpoint;
    } else {
      this.endpoint = environment.production
        ? 'https://curso-tour-of-heroes-api.herokuapp.com/api/heroes'
        : 'api/heroes';

      localStorage.setItem('endpoint', this.endpoint);
    }
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  private getHeroes(): void {
    this.isLoading = true;

    this.heroesService.getAll(this.endpoint).subscribe(
      (heroes) => {
        this.heroes = heroes;
        this.error = '';
        localStorage.setItem('endpoint', this.endpoint);
        this.isLoading = false;
      },
      (error) => {
        this.setError(error);

        this.heroes = [];
        this.isLoading = false;
      }
    );
  }

  add(): void {
    const dialogRef = this.dialog.open(HeroDialogComponent, {
      width: '400px',
      data: { hero: {} },
    });

    dialogRef.afterClosed().subscribe((hero: Hero) => {
      if (hero) {
        this.heroesService.create(hero, this.endpoint).subscribe(
          () => this.getHeroes(),
          (error) => {
            this.setError(error);
          }
        );
      }
    });
  }

  delete(id: number): void {
    this.heroesService.delete(id, this.endpoint).subscribe(
      (response) => {
        if (typeof response !== 'undefined') {
          this.getHeroes();
        }
      },
      (error) => {
        this.setError(error);
      }
    );
  }

  edit(hero: Hero): void {
    const dialogRef = this.dialog.open(HeroDialogComponent, {
      width: '400px',
      data: { hero: { ...hero } },
    });

    dialogRef.afterClosed().subscribe((hero: Hero) => {
      if (hero) {
        this.heroesService.update(hero, this.endpoint).subscribe(
          () => this.getHeroes(),
          (error) => {
            this.setError(error);
          }
        );
      }
    });
  }

  onChangeEndpoint(): void {
    this.getHeroes();
  }

  private setError(error: any) {
    console.log(error);

    if (error && error.error && error.status === 422) {
      Object.entries(error.error).map(([key, value]) => {
        this.error = this.error + `${key} ${value} `;
      });
    } else if (error && error.message) {
      this.error = error.message;
    } else {
      this.error = 'Endpoint inválido.';
    }
  }
}
