class CommentsController < ApplicationController
    
    def index 
        @comments = User.all
        render json: @comments
    end

    def create
        @comment = Comment.create(comment_params)
        render json: @comment
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
