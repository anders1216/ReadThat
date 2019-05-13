class PostsController < ApplicationController
    create
        @post = Post.create(post_params)
        render json: @post
    end

    update
        @post = Post.find(params[:id])
        @post.update
        render json: @post
        
    end

    private

    post_params
        params.require(:post).permit!
    end
end
