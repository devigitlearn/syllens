
import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('health')
export class HealthController {
    constructor(
        private readonly healthService: HealthService,
    ) { }

    @Get()
    @ApiOperation({
        summary: 'Check Syllens API health',
        description:
            'Returns the basic application health status.',
    })
    @ApiOkResponse({
        description: 'The Syllens API is running.',
        schema: {
            example: {
                status: 'ok',
                application: 'Syllens',
                message: 'Syllens API is running',
            },
        },
    })
    checkHealth() {
        return this.healthService.checkHealth();
    }
}
