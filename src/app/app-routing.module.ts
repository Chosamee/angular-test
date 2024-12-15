import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SseTestComponent } from './components/sse-test/sse-test.component';

const routes: Routes = [{ path: 'test', component: SseTestComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
