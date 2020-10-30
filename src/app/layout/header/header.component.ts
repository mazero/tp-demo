import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private pageTitle: string = 'Awesome 🚀😆';

  constructor() { }

  public getTitle(): string {
    return this.pageTitle;
  }

  public setTitle(value: string): void {
    this.pageTitle = value;
  }
}
