export class PhraseClass {
  private quote ?: string;
  private author ?: string;
  private datePublication ?: string;
  private contributor ?: string;
  private approved? : boolean;

constructor(quote: string, author: string, datePublication: string, contributor: string, approved: boolean) {
    this.quote = quote;
    this.author = author;
    this.datePublication = datePublication;
    this.contributor = contributor;
	this.approved = approved;
  }
}