
import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
    checkHealth() {
        return {
            status: 'ok',
            application: 'Syllens',
            message: 'Syllens API is running',
        };
    }
}
