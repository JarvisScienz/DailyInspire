import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { of } from 'rxjs';

const mockTranslateService = {
  get: (key: any) => of(key),  // Simula il metodo get restituendo semplicemente la chiave passata
  use: (lang: string) => {}
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService },  // Fornisci il mock qui
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'daily-inspire'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('daily-inspire');
  });
});
