import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface NotificationMessage {
  type: 'success' | 'error' | 'info';
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messagesSubject = new BehaviorSubject<NotificationMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();

  addMessage(message: NotificationMessage) {
    const currentMessages = this.messagesSubject.getValue();
    this.messagesSubject.next([...currentMessages, message]);

  }

  removeMessage(index: number) {
    const currentMessages = this.messagesSubject.getValue();
    currentMessages.splice(index, 1);
    this.messagesSubject.next(currentMessages);
  }
}
