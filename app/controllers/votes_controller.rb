class VotesController < ApplicationController
    create
        @vote = Vote.create(vote_params)
        render json: @vote
    end

    update
        @vote = Vote.find(params[:id])
        @vote.update
        render json: @vote
    end

 private

    vote_params
        params.require(:vote).permit!
    end

end