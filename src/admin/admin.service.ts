import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../orders/schema/orders.schema.js';
import { Category,categoryDocument } from '../categories/schema/category.schema.js';
import { Product, productDocument } from '../product/schema/product.schema.js';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto.js';
import { CloudinaryService } from '../cloudinary/cloudinary.service.js';
@Injectable()
export class AdminService {

    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        @InjectModel(Category.name) private categoryModel: Model<categoryDocument>,
        @InjectModel(Product.name) private productModel: Model<productDocument>,
        private readonly cloudinaryService: CloudinaryService
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

    // get individual category by id
    async getCategoryById(id: string) {
        const category = await this.categoryModel.findById(id).exec();
        if(!category){
            return{
                success:false,
                message:'Category not found',
            }
        }
        return {
            success:true,
            message:'Category retrieved successfully',
            category:category
        };
    }

    // get individual product by id
    async getProductById(id: string) {
        const product = await this.productModel.findById(id).exec();
        if(!product){
            return{
                success:false,
                message:'Product not found',
            }
        }
        return {
            success:true,
            message:'Product retrieved successfully',
            product:product
        };
    }

    // get individual order by id
    async getOrderById(id: string) {
        const order = await this.orderModel.findById(id).exec();
        if(!order){
            return{
                success:false,
                message:'Order not found',
            }
        }
        return {
            success:true,
            message:'Order retrieved successfully',
            order:order
        };
    }

    // delete category by id
    async deleteCategoryById(id: string) {
        const category = await this.categoryModel.findByIdAndDelete(id).exec();
        if(!category){
            return{
                success:false,
                message:'Category not found',
            }
        }

        // delete image from cloudinary
        await this.cloudinaryService.deleteImage(category.image_id);

        // returning the deleted category
        return {
            success:true,
            message:'Category deleted successfully',
            category:category
        };
    }

    // delete product by id
    async deleteProductById(id: string) {
        const product = await this.productModel.findByIdAndDelete(id).exec();
        if(!product){
            return{
                success:false,
                message:'Product not found',
            }
        }

        // delete image from cloudinary
        await this.cloudinaryService.deleteImage(product.image_url);

        // return the deleted product
        return {
            success:true,
            message:'Product deleted successfully',
            product:product
        };
    }

    // update category by id
    async updateCategoryById(id: string, updateData: UpdateCategoryDto) {
        const category = await this.categoryModel.findByIdAndUpdate(id, updateData, { new: true }).exec();

        if(!category){
            return{
                success:false,
                message:"Can't find this product"
            }
        }

        return {
            success:true,
            message:'Category updated successfully',
            category:category
        };
    }

    // update product by id

    async updateProductById(id: string, updateData: any) {
        const product = await this.productModel.findByIdAndUpdate(id, updateData, { new: true }).exec();

        if(!product){
            return{
                success:false,
                message:"Can't find this product"
            }
        }

        return {
            success:true,
            message:'Product updated successfully',
            product:product
        };
    }

    // change category availability by id
    async changeCategoryAvailabilityById(id: string, availability: boolean) {
        const category = await this.categoryModel.findByIdAndUpdate(id, {

            $set:{
                availability
            }
        }, { new: true }).exec();

        if(!category){
            return{
                success:false,
                message:"Can't find this category"
            }
        }

        return {
            success:true,
            message:'Category availability updated successfully',
            category:category
        };
    }

    // change product availability by id
    async changeProductAvailabilityById(id: string, availability: boolean) {
        const product = await this.productModel.findByIdAndUpdate(id, {

            $set:{
                availability
            }
        }, { new: true }).exec();

        if(!product){
            return{
                success:false,
                message:"Can't find this product"
            }
        }

        return {
            success:true,
            message:'Product availability updated successfully',
            availability:product.availability
        };
    }

    // change order status by id
    async changeOrderStatusById(id: string, status: string) {

        const validStatuses = ['pending','confirmed' , 'preparing' , 'out-for-delivery','completed','cancelled'];
        if(!validStatuses.includes(status)){
            return{
                success:false,
                message:"Invalid status"
            }
        }

        const isCurrentStatusCompletedOrCancelled = await this.orderModel.findOne({ _id: id, status: { $in: ['completed', 'cancelled'] } }).exec();
        if (isCurrentStatusCompletedOrCancelled) {
            return {
                success: false,
                message: "Cannot change status of a completed or cancelled order"
            };
        }

        const isSameStatus = await this.orderModel.findOne({ _id: id, status: status }).exec();
        if (isSameStatus) {
            return {
                success: false,
                message: "Order is already in the specified status"
            };
        }

        const order = await this.orderModel.findByIdAndUpdate(id, {

            $set:{
                status
            }
        }, { new: true }).exec();

        if(!order){
            return{
                success:false,
                message:"Can't find this order"
            }
        }

        return {
            success:true,
            message:'Order status updated successfully',
            status:order.status
        };
    }
}
