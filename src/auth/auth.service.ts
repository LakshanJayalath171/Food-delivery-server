import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AdminLoginDto } from './dto/admin-login.dto.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { userDocument } from '../user/schemas/user.schema.js';


@Injectable()
export class AuthService {

    constructor(
        @InjectModel('User') private readonly userModel: mongoose.Model<userDocument>,
        
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    // admin login method
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

    // user login method
    async userLogin(loginDto: AdminLoginDto){
        const {email,password} = loginDto;
        // normalize the email to lowercase
        const normalizedEmail = email.toLowerCase();

        const user = await this.userModel.findOne({email: normalizedEmail}).select("+password").exec();

        // check if user exists
        if(!user){
            throw new UnauthorizedException('Invalid username or password');
        }

        // check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid username or password');
        }

        // create JWt payload
        const payload = {
            sub: user._id.toString(),
            email: user.email,
            role: 'user'
        }

        const token = this.jwtService.sign(payload);

        return {
            success: true,
            message: 'User login successful',
            token: token,
            data : {
                first_name:user.first_name,
                last_name:user.last_name,
                email:user.email,
                mobile:user.phone_number,
                birthday:user.date_of_birth,
                favorite_dishes:user.favorite_dishes,
                address:user.addresses,
            }
        }

    }

    // get user profile method
    async getUserProfile(authenticatedUser: {
        user_id:string
    }){
        const user = await this.userModel.findById(authenticatedUser.user_id).select('-password').lean();
        if(!user){
            throw new NotFoundException('User not found');
        }
        return {
            success: true,
            message: 'User profile fetched successfully',
            data: user
        }
    }
}
