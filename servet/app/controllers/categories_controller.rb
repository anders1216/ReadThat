class CategoriesController < ApplicationController     
    skip_before_action :authorized, only: [:index, :category]
    def index 
        @categories = Category.all
        render json: @categories
    end

    def create
        @category = Category.create(category_params)
        render json: @category
    end

    def update
        @category = Category.find(params[:id])
        @category.update(category_params)
        render json: @category
    end

    def category
        category = Category.find_by(category: params[:category])
        @posts = Post.where(category_id: category.id)
        render json: @posts
    end   

private

    def category_params
        params.require(:category).permit!
    end
end
