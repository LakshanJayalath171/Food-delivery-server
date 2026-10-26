import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { userDocument } from './schemas/user.schema.js';
import { LoginDto, RegisterDto } from './dto/user.dto.js';
import * as bcrypt from 'bcryptjs';
import { OrderDocument } from '../orders/schema/orders.schema.js';
import { categoryDocument } from '../categories/schema/category.schema.js';
import { productDocument } from '../product/schema/product.schema.js';
import { UpdateUserDto } from './dto/updateUser.dto.js';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<userDocument>,
        @InjectModel('Category') private readonly categoryModel: Model<categoryDocument>,
        @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
        @InjectModel('Product') private readonly productModel: Model<productDocument>
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

    // get all products for user
    async getAllProducts() {
        const products = await this.productModel.find().exec();

        if(!products || products.length === 0) {
            return {
                success: false,
                message: "No products found"
            }
        }

        return {
            success: true,
            message: "Products retrieved successfully",
            data: products
        }
    }

    // get all categories for user
    async getAllCategories() {
        const categories = await this.categoryModel.find().exec();

        if(!categories || categories.length === 0) {
            return {
                success: false,
                message: "No categories found"
            }
        }

        return {
            success: true,
            message: "Categories retrieved successfully",
            data: categories
        }
    }
    // get all own orders for user
    async getOwnOrders(userId: string) {
        const orders = await this.orderModel.find({ user_id: userId }).exec();

        if(!orders || orders.length === 0) {
            return {
                success: false,
                message: "No orders found"
            }
        }

        return {
            success: true,
            message: "Orders retrieved successfully",
            data: orders
        }
    }

    // get latest 3 orders for user
    async getLatestOrders(userId: string) {
        const latestOrders = await this.orderModel.find({ user_id: userId }).sort({ createdAt: -1 }).limit(3).exec();

        if(!latestOrders || latestOrders.length === 0) {
            return {
                success: false,
                message: "No orders found"
            }
        }

        return {
            success: true,
            message: "Latest orders retrieved successfully",
            data: latestOrders
        }
    }

    // update user profile
    async updateUserProfile(
        userId: string,
        updateProfileDto: UpdateUserDto
    ) {
        if (!Types.ObjectId.isValid(userId)) {
            throw new NotFoundException('User not found');
        }
        // normalize the email to lowercase if it exists in the updateProfileDto
        const updateData = { ...updateProfileDto };

        if (updateData.email) {
            updateData.email = updateData.email.toLowerCase();

            const existingUser = await this.userModel.findOne({ email: updateData.email, _id: { $ne: userId } });
            if (existingUser) {
                throw new ConflictException('Email already in use by another user');
            }
        }

        try{
            const updatedUser = await this.userModel
            .findByIdAndUpdate(
                userId,
                {
                    $set: updateProfileDto,
                },
                {
                    new: true,
                    runValidators: true,
                },
            )
            .select('-password')
            .lean();

        if (!updatedUser) {
            throw new NotFoundException('User not found');
        }

        return {
            success: true,
            message: 'Profile updated successfully',
            data: updatedUser,
        };
        }
        catch (error) {
            throw new NotFoundException('User not found');
        }
    }

}
