class PostsController < ApplicationController
    skip_before_action :authorized, only: [:index, :create]

    def index
        @posts = Post.all
        render json: @posts
    end

    def image_upload

    end

    def create
        category = Category.find_by(category: post_params[:category])
        user = post_params[:user_id]
        @post = Post.new(title: post_params[:title], content: post_params[:content], img: post_params[:img], uploadedFile: post_params[:uploadedFile], category_id: category.id, link: post_params[:link], user_id: user )
        if @post.save!
            render json: @post
        else
            render json: @post.errors
        end
    end

    def update
        @post = Post.find(params[:id])
        @post.update
        render json: @post
        
    end

    private

    def post_params
        params.require(:post).permit!
    end
end
