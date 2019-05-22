class CommentsController < ApplicationController
    skip_before_action :authorized, only: [:create]
    def index 
        @comments = Comment.all
        render json: @comments
    end

    def create
        @comment = Comment.new(content: comment_params[:content][0], user_id: comment_params[:user_id], post_id: comment_params[:post_id])
        if @comment.save!
            render json: @comment
        else render json: @comment.errors
        end
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
