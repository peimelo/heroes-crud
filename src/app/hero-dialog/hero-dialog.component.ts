import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../hero.model';

interface DialogData {
  hero: Hero;
}

@Component({
  selector: 'app-hero-dialog',
  templateUrl: './hero-dialog.component.html',
  styleUrls: ['./hero-dialog.component.scss'],
})
export class HeroDialogComponent {
  isEditing = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.isEditing = this.data.hero && !!this.data.hero.id;
  }
}
