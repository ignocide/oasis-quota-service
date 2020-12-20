import { Plan } from '../entity/plan.entitiy';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Plan)
export class PlanRepository extends Repository<Plan> {}
