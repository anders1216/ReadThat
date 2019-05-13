class CommentsController < ApplicationController
    create
        @comment = Comment.create(comment_params)
        render json: @comment
    end

    update
        @comment = Comment.find(params[:id])
        @comment.update
        render json: @comment
    end

private

    comment_params
        params.require(:comment).permit!
    end
end
