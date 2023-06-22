import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-random-phrase',
  templateUrl: './random-phrase.component.html',
  styleUrls: ['./random-phrase.component.css']
})
export class RandomPhraseComponent implements OnInit {
  phrases: any = '';
  randomPhrase: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadPhrases();
  }

  loadPhrases() {
    const filePath = 'assets/phrases.json';
    this.http.get<any[]>(filePath)
      .subscribe(data => {
        this.phrases = data;
		this.selectRandomPhrase();
      });
  }

  selectRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    this.randomPhrase = this.phrases[randomIndex].quote;
  }
}