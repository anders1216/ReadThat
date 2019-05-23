class VotesController < ApplicationController
    skip_before_action :authorized, only: [:create, :index, :post, :update, :delete]
    def index 
        @votes = Vote.all
        render json: @votes
    end
    
    def create
        usersVotes = Vote.where(user_id: vote_params)
        if usersVotes.length > 0
            render json: {errors:"You only get one vote per post"}
        else
        @vote = Vote.new(post_id: vote_params[:post_id], user_id: vote_params[:user_id], is_down_vote: false)
        if @vote.save!
            render json: @vote
        end
    end
    end

    def post
        @votes = Vote.where(post_id == params[:post_id])
        render json: @votes
    end

    def delete
        @votes = Vote.where(user_id: vote_params[:user_id])
        @vote = votes.where(post_id: vote_params[:post_id])
        if @vote
            @vote.destroy
            @votes = Vote.where(post_id: vote_params[:post_id])
            render json: @votes
        else 
            @downVote = Vote.create(post_id: vote_params[:post_id], user_id: vote_params[:user_id], is_down_vote: true)
            render json: @downVote
        end
    end

    def update
        @vote = Vote.find(params[:id])
        @vote.update
        render json: @vote
    end

 private

    def vote_params
        params.require(:vote).permit!
    end

end