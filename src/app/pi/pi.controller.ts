import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { PiService } from './pi.service';
import { AuthUser } from 'src/common/type/auth-user.type';
import { User } from 'src/common/decorator/user.decorator';
import { Pagination } from 'src/common/pagination/pagination';
import { PiQueryDTO } from './dto/request/pi-request.dto';
import { PiResponseDto } from './dto/response/pi-response.dto';
import { PiModel } from './pi.model';
import { PiQueryFilter } from './query-filter/pi.query-filter';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('pi-calculator')
@ApiBearerAuth('x-auth-user-data')
export class PiController {
  constructor(private readonly piService: PiService) {}
  @Get('calculate')
  @ApiResponse({
    status: 200,
    type: Object,
    description: '{ piValue: 1234 }',
  })
  @ApiResponse({ status: 103, description: 'Token Missing Exception' })
  async calculate(): Promise<object> {
    const calculatePi = await this.piService.getPi();
    return {
      value: calculatePi,
    };
  }

  @Public()
  @Get('history')
  @ApiResponse({
    status: 200,
    type: Object,
    description: '{ value: 1234 }',
  })
  @ApiResponse({ status: 103, description: 'Token Missing Exception' })
  async findAll(
    @Query() query: PiQueryDTO,
  ): Promise<PiResponseDto[] | Pagination> {
    const queryFilter = new PiQueryFilter(query);

    if (queryFilter.hasPaginationMeta()) {
      return this.piService.paginationMeta(
        queryFilter,
        true,
      ) as Promise<Pagination>;
    }

    const piHistory = (await this.piService.findAll(
      queryFilter,
    )) as PiModel[];

    return piHistory.map(PiResponseDto.fromModel);
  }

  @Get('calculate-pi')
  @ApiResponse({
    status: 200,
    type: Object,
    description: '{ value: 1234 }',
  })
  @ApiResponse({ status: 103, description: 'Token Missing Exception' })
  async generateNew(@User() user: AuthUser): Promise<object> {
    const calculatePi = await this.piService.calculate(user);
    return {
      piValue: calculatePi,
    };
  }

  @Get('sun-circumference')
  @ApiResponse({
    status: 200,
    type: Object,
    description: '{ value: 1234 }',
  })
  @ApiResponse({ status: 103, description: 'Token Missing Exception' })
  async getSunCircumference(): Promise<object> {
    const sun = await this.piService.getSunCircumference();
    return {
      value: Number(sun),
    };
  }
}
