import { HttpClient, HttpHeaders } from '@angular/common/http';

private AddEmitterURL = '/addEmitter';
const rootUrl='http://localhost:8080';

constructor(
  private http: HttpClient,
  private messageService: MessageService) { }

  private log(message: string) {
  this.messageService.add('HeroService: ' + message);
}

AddEmitter(emitter: Emitter): Observable<Emitter> {
  return this.http.get<Emitter[]>(rootUrl + this.AddEmitterURL);
}
