import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sse-test',
  template: `
    <button (click)="testQueryParam()">Test with Query Param</button>
    <button (click)="testCookie()">Test with Cookie</button>
    <div>
      <h3>Server Response:</h3>
      <p>{{ message }}</p>
    </div>
  `,
  styleUrls: ['./sse-test.component.css'],
})
export class SseTestComponent implements OnDestroy {
  message: string | null = null;
  subscription!: Subscription;

  constructor(private cookieService: CookieService) {}

  testQueryParam(): void {
    this.message = null;
    const url = 'http://localhost:8080/sse1';
    const clientId = 'user123';
    this.subscription = this.connectWithQueryParam(url, clientId).subscribe({
      next: (data) => ((this.message = data), console.log('Received:', data)),
      error: (err) => console.error('Error:', err),
    });
  }

  testCookie(): void {
    this.message = null;
    const url = 'http://localhost:8080/sse';
    this.cookieService.set('clientId', 'user1');
    this.subscription = this.connectWithCookie(url).subscribe({
      next: (data) => ((this.message = data), console.log('Received:', data)),
      error: (err) => console.error('Error:', err),
    });
  }

  private connectWithQueryParam(
    url: string,
    clientId: string
  ): Observable<string> {
    const fullUrl = `${url}?clientId=${clientId}`;
    return new Observable((observer) => {
      const eventSource = new EventSource(fullUrl);

      eventSource.onmessage = (event) => {
        observer.next(event.data);
      };

      eventSource.onerror = (error) => {
        observer.error(error);
        eventSource.close();
      };

      return () => eventSource.close();
    });
  }

  private connectWithCookie(url: string): Observable<string> {
    return new Observable((observer) => {
      const eventSource = new EventSource(url, {
        withCredentials: true,
      } as any);

      eventSource.onmessage = (event) => {
        observer.next(event.data);
      };

      eventSource.onerror = (error) => {
        observer.error(error);
        eventSource.close();
      };

      return () => eventSource.close();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
