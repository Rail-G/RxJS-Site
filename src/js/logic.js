import {ajax} from 'rxjs/ajax';
import {catchError, of, interval, take, mergeMap} from 'rxjs';

/* eslint max-len: 0 */

export default class UnreadMessage {
  constructor() {
    this.newsBlock = document.querySelector('.all-messages');
  }

  static msgBlockHTML(email, name, date) {
    return `
    <dvi class="message">
      <div class="email">
        <span>${email}</span>
      </div>
      <div class="subject">
        <span>${name}</span>
      </div>
      <div class="date">
        <span>${date}</span>
      </div>
    </dvi>
    `;
  }

  sendRequestToServer() {
    const obs$ = interval(2000).pipe(
        take(5),
        mergeMap(() => {
          return ajax.getJSON('https://rxjs-server-jnj0.onrender.com/new-message');
        }),
        catchError((error) => {
          return of({
            'status': 'Not Found',
            'timestamp': new Date().getTime(),
            'messages': [],
          });
        }),
    );

    obs$.subscribe({
      next: (value) => this.addNews(value),
      error: (err) => this.showError(err),
    });
  }

  showError(err) {
    console.log(err);
  }

  addNews(value) {
    if (value.status === 'Not Found') {
      return;
    }
    const allMsg = value.messages;
    allMsg.forEach((elem) => {
      const name = elem.subject.substring(0, 15) + '...';
      const email = elem.from.length < 21 ? elem.from : elem.from.substring(0, 20) + '...';
      const result = UnreadMessage.msgBlockHTML(email, name, elem.received);
      this.newsBlock.insertAdjacentHTML('afterbegin', result);
    });
  }
}
