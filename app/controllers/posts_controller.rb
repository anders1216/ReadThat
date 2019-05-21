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
        user = User.find_by(username: params[:user])
        @post = category.posts.create(title: post_params[:title], content: post_params[:content], img: post_params[:img], uploadedFile: post_params[:uploadedFile], link: post_params[:link], user_id: user.id )
        render json: @post
    end

    def update
        @post = Post.find(params[:id])
        @post.update
        render json: @post
        
    end

    private

    def post_params
        params.require(:post || :user).permit!
    end
end
