import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SseTestComponent } from './components/sse-test/sse-test.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, SseTestComponent],
  imports: [BrowserModule, AppRoutingModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
