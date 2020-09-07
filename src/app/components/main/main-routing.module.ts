import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { PlayComponent } from './play/play.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [{ path: 'play', component: PlayComponent }],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingMainModule {}
