class VotesController < ApplicationController
    skip_before_action :authorized, only: [:create, :index, :post, :update]
    def index 
        @votes = Vote.all
        render json: @votes
    end
    
    def create
        @vote = Vote.create(vote_params)
        render json: @vote
    end

    def post
        @votes = Vote.where(post_id: params[:post_id])
        render json: @votes
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