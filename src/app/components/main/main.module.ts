import { NgModule } from '@angular/core';
import { PlayComponent } from './play/play.component';
import { RoutingMainModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [MatterialModule, CommonModule, RoutingMainModule],
  declarations: [PlayComponent, MainComponent],
  exports: [],
  providers: [],
})
export class MainModule {}
