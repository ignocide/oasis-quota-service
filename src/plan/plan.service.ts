import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPlan, Plan } from '../entity/plan.entitiy';
import { User } from '../entity/user.entitiy';
import { PlanRepository } from '../repository/plan.repository';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: PlanRepository,
  ) {}

  async readListByUserId(userId: number): Promise<Plan[]> {
    const targetUser = new User({ id: userId });
    const list = await this.planRepository.find({
      user: targetUser,
    });

    return list;
  }

  async create(rawPlan: IPlan): Promise<Plan> {
    const keys = Object.keys(rawPlan);
    const createPlan = new Plan();
    for (const key of keys) {
      createPlan[key] = rawPlan[key];
    }
    const createdPlan = await this.planRepository.save(createPlan);
    return createdPlan;
  }

  async read(id: number, userId: number): Promise<Plan | undefined> {
    return await this.planRepository.findOne({
      id,
      user: new User({ id: userId }),
      deleted: false,
    });
  }

  async update(id: number, userId: number, plan: Partial<IPlan>) {
    const targetPlan = await this.read(id, userId);
    if (targetPlan === undefined) {
      return Promise.reject(new Error('not found'));
    }
    const keys = Object.keys(plan);
    for (const key of keys) {
      targetPlan[key] = plan[key];
    }
    await this.planRepository.update(id, targetPlan);
    const updatedPlan = this.read(id, userId);
    return updatedPlan;
  }

  async delete(id: number, userId: number): Promise<void> {
    const targetPlan = await this.read(id, userId);
    targetPlan.deleted = true;

    await this.planRepository.update(id, targetPlan);
  }
}
