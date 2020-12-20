import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanRepository } from '../repository/plan.repository';
import { IPlan } from '../entity/plan.entitiy';
import { PlanService } from './plan.service';
import config from '../config';
import Entities from '../entity';

describe('PlanService', () => {
  let service: PlanService;
  let id: null | number = null;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // @ts-ignore
        TypeOrmModule.forRoot({ ...config.database, entities: Entities }),
        TypeOrmModule.forFeature([PlanRepository]),
      ],
      providers: [PlanService],
    }).compile();

    service = module.get<PlanService>(PlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create plan', async () => {
    const plainPlanObject: IPlan = {
      title: '물 마시기',
      description: '물 2리터 마시기',
      period: 3600 * 24,
      goal: 2,
      unit: 0.1,
      subfix: 'L',
    };

    const createdPlan = await service.create(plainPlanObject);
    expect(createdPlan.title).toBe('물 마시기');
    id = createdPlan.id;
  });

  it('read plan', async () => {
    const plan = await service.read(id);
    expect(plan.title).toBe('물 마시기');
  });

  it('update plan', async () => {
    const partalPlanObject = {
      title: '물 마시기 수정',
    };
    const updatedPlan = await service.update(id, partalPlanObject);

    expect(updatedPlan.title).toBe('물 마시기 수정');
  });

  it('delete plan', async () => {
    const partalPlanObject = {
      title: '물 마시기 수정',
    };
    const updatedPlan = await service.update(id, partalPlanObject);

    expect(updatedPlan.title).toBe('물 마시기 수정');
  });
});
