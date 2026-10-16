import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AdminLoginDto } from './dto/admin-login.dto.js';


@Injectable()
export class AuthService {

    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    async adminLogin(loginDto: AdminLoginDto){
        const {email,password} = loginDto;

        // reading admin credentials from environment variables
        const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
        const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

        // validating admin credentials
        if(email !== adminEmail || password !== adminPassword){
            throw new UnauthorizedException('Invalid admin credentials');
        }


        // create JWt payload
        const payload = {
            sub: email,
            role: 'admin'
        };

        // generate JWT token
        const token = this.jwtService.sign(payload);

        return {
            success: true,
            message: 'Admin login successful',
            token: token
        }
    }

    
}
