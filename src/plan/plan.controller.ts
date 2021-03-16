import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UserId } from '../decorator/user.decorator';
import { User } from '../entity/user.entitiy';
import { PlanService } from './plan.service';

interface ICreatePlan {
  title: string;
  description: string;
  period: number;
  goal: number;
  unit: number;
  subfix: string;
}

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  async getPlans(@UserId() userId) {
    const list = await this.planService.readListByUserId(userId);

    return { list };
  }

  @Post()
  async createPlan(@UserId() userId, @Body() rawPlan) {
    rawPlan.user = new User({ id: userId });

    await this.planService.create(rawPlan);

    return 'OK';
  }

  @Get('/planId')
  async readPlan(@UserId() userId, @Param('planId') planId) {
    const plan = await this.planService.read(userId, planId);

    return plan;
  }
  @Put('/:planId')
  async updatePlan(
    @UserId() userId,
    @Body() updatePlan: ICreatePlan,
    @Param('planId') planId,
  ) {
    await this.planService.update(planId, userId, updatePlan);

    return 'OK';
  }

  @Delete('/:planId')
  async deletePlan(@UserId() userId, @Param('planId') planId) {
    await this.planService.delete(planId, userId);

    return 'OK';
  }
}
