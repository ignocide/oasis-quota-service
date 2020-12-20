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
import { ReqUserId } from '../decorator/reqUser.decorator';
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
  async getPlans(@ReqUserId() userId) {
    const list = await this.planService.readListByUserId(userId);

    return { list };
  }

  @Post()
  async createPlan(@ReqUserId() userId, @Body() rawPlan) {
    rawPlan.user = new User({ id: userId });

    await this.planService.create(rawPlan);

    return 'OK';
  }

  @Get('/planId')
  async readPlan(@ReqUserId() userId, @Param('planId') planId) {
    const plan = await this.planService.read(userId, planId);

    return plan;
  }
  @Put('/:planId')
  async updatePlan(
    @ReqUserId() userId,
    @Body() updatePlan: ICreatePlan,
    @Param('planId') planId,
  ) {
    await this.planService.update(planId, userId, updatePlan);

    return 'OK';
  }

  @Delete('/:planId')
  async deletePlan(@ReqUserId() userId, @Param('planId') planId) {
    await this.planService.delete(planId, userId);

    return 'OK';
  }
}
