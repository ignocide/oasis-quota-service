import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotaController } from './quota/quota.controller';
import { PlanController } from './plan/plan.controller';
import { QuotaService } from './quota/quota.service';
import { PlanService } from './plan/plan.service';
import { QuotaRepository } from './repository/quota.repository';
import { PlanRepository } from './repository/plan.repository';

@Module({
  imports: [
    // @ts-ignore
    TypeOrmModule.forFeature([QuotaRepository, PlanRepository]),
  ],
  controllers: [QuotaController, PlanController],
  providers: [QuotaService, PlanService],
})
export class MainModule {}
