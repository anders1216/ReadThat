class VotesController < ApplicationController

    def index 
        @votes = User.all
        render json: @votes
    end
    
    def create
        @vote = Vote.create(vote_params)
        render json: @vote
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