import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];

  sort: Sort = {
    active: 'name',
    direction: 'asc',
  };

  heroes = [{ name: 'Thor' }, { name: 'Hulk' }];

  constructor() {}

  ngOnInit(): void {}

  onAdd(): void {
    // this.add.emit();
  }

  onEdit(): void {
    // this.add.emit();
  }
}
