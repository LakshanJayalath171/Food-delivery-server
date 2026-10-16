import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDocument } from './schemas/user.schema.js';
import { LoginDto, RegisterDto } from './dto/user.dto.js';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<userDocument>
    ) {}

    // add new user to the database
    async signUp(registerDto: RegisterDto){
        const { first_name, last_name, email, password } = registerDto;

        // normalize the email to lowercase
        const normalizedEmail = email.toLowerCase();

        // check if the user already exists
        const existingUser = await this.userModel.findOne({ email: normalizedEmail });
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        // hashing the password
        const salt  = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create a new user
        const newUser = await this.userModel.create({
            first_name,
            last_name,
            email: normalizedEmail,
            password: hashedPassword
        });

        return {
            message:"New user created successfully",
        };

    }
    
}
