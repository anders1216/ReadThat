class VotesController < ApplicationController
    skip_before_action :authorized, only: [:create, :index, :post, :update, :delete]
    def index 
        @votes = Vote.all
        render json: @votes
    end
    
    def create
        if vote_params[:comment_id].is_a? Integer
            @usersVotes = Vote.where({user_id: vote_params[:user_id], comment_id: vote_params[:comment_id]})
            
        elsif vote_params[:post_id].is_a? Integer
            @usersVotes = Vote.where({user_id: vote_params[:user_id], post_id: vote_params[:post_id]})
        else
            render json: {errors: "Something went wrong. Call your local ReadThat call center to report the porblem....lol"}
        end

        if @usersVotes.length < 1 
            @vote = Vote.new(post_id: vote_params[:post_id], user_id: vote_params[:user_id], is_down_vote: false)
            @vote.save!
                render json: @vote
        elsif @usersVotes[0]['is_down_vote']
            @usersVotes[0].destroy
            @votes = Vote.where(post_id: vote_params[:post_id])
            render json: @votes
        elsif !@usersVotes[0]['is_down_vote']
            render json: {errors:"You only get one vote per post"}
        else
            @vote = Vote.new(post_id: vote_params[:post_id], user_id: vote_params[:user_id], is_down_vote: false)
            @vote.save!
                render json: @vote
        end
    end

    def post
        @votes = Vote.where(post_id == params[:post_id])
        render json: @votes
    end

    def delete
        if vote_params[:comment_id].is_a? Integer
            @usersVotes = Vote.where({user_id: vote_params[:user_id], comment_id: vote_params[:comment_id]})
            
        elsif vote_params[:post_id].is_a? Integer
            @usersVotes = Vote.where({user_id: vote_params[:user_id], post_id: vote_params[:post_id]})
        else
            render json: {errors: "Something went wrong. Call your local ReadThat call center to report the porblem....lol"}
        end
        if @usersVotes.length < 1
            @downVote = Vote.create(post_id: vote_params[:post_id], user_id: vote_params[:user_id], is_down_vote: true)
            render json: @downVote
        elsif !@usersVotes[0]['is_down_vote']
            @usersVotes[0].destroy
            @votes = Vote.where(post_id: vote_params[:post_id])
            render json: @votes
        elsif @usersVotes[0]['is_down_vote']
            render json: {errors:"You only get one vote per post"}
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