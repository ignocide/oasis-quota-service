import { Test, TestingModule } from '@nestjs/testing';
import { QuotaService } from './quota.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotaRepository } from '../repository/quota.repository';
import Entities from '../entity';
import { IQutoa } from '../entity/quota.entitiy';
import * as dayjs from 'dayjs';
import { PlanRepository } from '../repository/plan.repository';
import { IPlan } from '../entity/plan.entitiy';
import { PlanService } from '../plan/plan.service';
describe('QuotaService', () => {
  let service: QuotaService;
  let id = null;
  let planId = null;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // @ts-ignore
        TypeOrmModule.forRoot({ ...config.database, entities: Entities }),
        TypeOrmModule.forFeature([QuotaRepository, PlanRepository]),
      ],
      providers: [QuotaService, PlanService],
    }).compile();

    service = module.get<QuotaService>(QuotaService);
    const planService = module.get<PlanService>(PlanService);
    const plainPlanObject: IPlan = {
      title: '물 마시기',
      description: '물 2리터 마시기',
      period: 3600 * 24,
      goal: 2,
      unit: 0.1,
      subfix: 'L',
    };

    const createdPlan = await planService.create(plainPlanObject);
    planId = createdPlan.id;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create quota', async () => {
    const rawQuotaObject: IQutoa = {
      fromDate: dayjs().startOf('day').toDate(),
      toDate: dayjs().endOf('day').toDate(),
      amount: 0,
      planId: planId,
    };

    const createdPlan = await service.create(rawQuotaObject);

    expect(createdPlan.amount).toBe(0);
    id = createdPlan.id;
  });

  it('read quota', async () => {
    const quota = await service.read(id);

    expect(quota.amount).toBe(0);
  });

  it('update quota', async () => {
    const partialQuotaObject = {
      amount: 1.1,
    };
    const updatedPlan = await service.update(id, partialQuotaObject);

    expect(updatedPlan.amount).toBe(1.1);
  });

  it('delete quota', async () => {
    await service.delete(id);
    const quota = await service.read(id);

    expect(quota).toBeUndefined();
  });
});
