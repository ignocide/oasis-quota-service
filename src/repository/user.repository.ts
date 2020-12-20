import { User } from '../entity/user.entitiy';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
