import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrowVegetableRoutingModule } from './grow-vegetable-routing.module';
import { GrowVegetableComponent } from './grow-vegetable.component';
import { ThirdPartyModule } from 'src/app/3rd.module';

@NgModule({
  declarations: [GrowVegetableComponent],
  imports: [CommonModule, GrowVegetableRoutingModule, ThirdPartyModule],
})
export class GrowVegetableModule {}
