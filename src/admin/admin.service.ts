import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../orders/schema/orders.schema.js';
import { Category,categoryDocument } from '../categories/schema/category.schema.js';
import { Product, productDocument } from '../product/schema/product.schema.js';
@Injectable()
export class AdminService {

    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        @InjectModel(Category.name) private categoryModel: Model<categoryDocument>,
        @InjectModel(Product.name) private productModel: Model<productDocument>
    ) {}

    // get all orders
    async getAllOrders() {
        const orders = await this.orderModel.find().exec();

        if(!orders || orders.length === 0){
            return{
                success:false,
                message:'No orders found',
            }
        }
        return {
            success:true,
            message:'Orders retrieved successfully',
            orders:orders
        };
    }

    // get all categories
    async getAllCategories() {
        const categories = await this.categoryModel.find().exec();

        if(!categories || categories.length === 0){
            return{
                success:false,
                message:'No categories found',
            }
        }
        return {
            success:true,
            message:'Categories retrieved successfully',
            categories:categories
        };
    }

    // get all products
    async getAllProducts() {
        const products = await this.productModel.find().exec();

        if(!products || products.length === 0){
            return{
                success:false,
                message:'No products found',
            }
        }
        return {
            success:true,
            message:'Products retrieved successfully',
            products:products
        };
    }

    // get top rated dishes
    async getTopRatedDishes() {
        const topRatedDishes = await this.productModel.find().sort({ rating: -1 }).limit(5).exec();
        if(!topRatedDishes || topRatedDishes.length === 0){
            return{
                success:false,
                message:'No top rated dishes found',
            }
        }
        return {
            success:true,
            message:'Top rated dishes retrieved successfully',
            dishes:topRatedDishes
        };
    }
}
