import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    
    getUser(): string {
        return 'This action returns all users';
    }
}
