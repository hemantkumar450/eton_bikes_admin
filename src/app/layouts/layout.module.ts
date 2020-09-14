import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LayoutRoutes } from './layout.routing';
import { SharedComponentModule } from 'app/shared/shared.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(LayoutRoutes), SharedComponentModule],
})
export class LayoutModule {}
