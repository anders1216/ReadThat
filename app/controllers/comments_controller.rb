class CommentsController < ApplicationController
    skip_before_action :authorized, only: [:create, :post, :index, :comments_comments]
    def index 
        @comments = Comment.all
        render json: @comments
    end

    def create
        # content: comment_params[:content], user_id: comment_params[:user_id], post_id: comment_params[:post_id], comment_id: comment_params
        @comment = Comment.new(comment_params)
        if @comment.save!
            render json: @comment
        else render json: @comment.errors
        end
    end

    def comments_comments
        @comments = Comment.where(comment_id: params[:comment_id])
        render json: @comments
    end

    def post
        @comments = Comment.where(post_id: params[:post_id])
        render json: @comments
    end

    def update
        @comment = Comment.find(params[:id])
        @comment.update
        render json: @comment
    end

private

    def comment_params
        params.require(:comment).permit!
    end
end
