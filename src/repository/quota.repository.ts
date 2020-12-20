import { Quota } from '../entity/quota.entitiy';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Quota)
export class QuotaRepository extends Repository<Quota> {
  findListByUserId(userId: number): Promise<Quota[]> {
    return this.createQueryBuilder('quota')
      .innerJoin(
        'quota',
        'plan',
        'plan.userId = :userId and deleted = :deleted',
        {
          deleted: false,
          userId: userId,
        },
      )
      .where({
        deleted: false,
      })
      .getMany();
  }

  findValidDateListByUserId(userId: number): Promise<Quota[]> {
    return this.createQueryBuilder('quota')
      .innerJoin(
        'quota',
        'plan',
        'plan.userId = :userId and deleted = :deleted',
        {
          deleted: false,
          userId: userId,
        },
      )
      .where({
        deleted: false,
        // @TODO: 시간 범위 지정
      })
      .getMany();
  }
}
