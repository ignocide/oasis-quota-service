import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from '../entity/plan.entitiy';
import { IQutoa, Quota } from '../entity/quota.entitiy';
import { QuotaRepository } from '../repository/quota.repository';

@Injectable()
export class QuotaService {
  constructor(
    @InjectRepository(Quota)
    private quotaRepository: QuotaRepository,
  ) {}

  async create(rawQuota: IQutoa) {
    const quota = new Quota();
    const targetPlan = new Plan({
      id: rawQuota.planId,
    });
    quota.fromDate = rawQuota.fromDate;
    quota.toDate = rawQuota.toDate;
    quota.amount = rawQuota.amount;
    quota.plan = targetPlan;

    const createdQuota = await this.quotaRepository.save(quota);
    return createdQuota;
  }

  async readList(userId: number) {
    return await this.quotaRepository.findListByUserId(userId);
  }

  async read(id: number) {
    const targetQuota = this.quotaRepository.findOne({
      id,
      deleted: false,
    });

    return targetQuota;
  }

  async update(id: number, partialQuota: Partial<IQutoa>) {
    const targetQuota = await this.read(id);
    if (targetQuota === undefined) {
      return Promise.reject(new Error('not found'));
    }
    const keys = Object.keys(partialQuota);
    for (const key of keys) {
      targetQuota[key] = partialQuota[key];
    }
    await this.quotaRepository.update(id, targetQuota);
    const updatedQuota = await this.read(id);
    return updatedQuota;
  }

  // 사실상 사용되면 안됨
  async delete(id: number): Promise<void> {
    const targetQuota = await this.read(id);
    targetQuota.deleted = true;

    await this.quotaRepository.update(id, targetQuota);
  }
}
