class VotesController < ApplicationController
    skip_before_action :authorized, only: [:post, :index]
    def index 
        @votes = Vote.all
        render json: @votes
    end
    
    def create
        if vote_params[:comment_id].is_a? Integer
            @usersVotes = Vote.where({user_id: vote_params[:user_id], comment_id: vote_params[:comment_id]})
            
            if @usersVotes.length < 1
                @vote = Vote.new(comment_id: vote_params[:comment_id], user_id: vote_params[:user_id], is_down_vote: vote_params[:is_down_vote])
                @vote.save!
                @votes = Vote.all
                    render json: @votes
            elsif @usersVotes[0]['is_down_vote'] && !vote_params[:is_down_vote]
                @usersVotes[0].destroy
                vote = Vote.new(comment_id: vote_params[:comment_id], user_id: vote_params[:user_id], is_down_vote: vote_params[:is_down_vote])
                vote.save!
                @votes = Vote.all
                    render json: @votes
            elsif !@usersVotes[0]['is_down_vote'] && !vote_params[:is_down_vote]
                @usersVotes[0].destroy
                @votes = Vote.all
                    render json: {message: "Vote Deleted", votes: @votes }
            elsif !@usersVotes[0]['is_down_vote'] && vote_params[:is_down_vote]
                @usersVotes[0].destroy
                @downVote = Vote.new(comment_id: vote_params[:comment_id], user_id: vote_params[:user_id], is_down_vote: true)
                @downVote.save!
                @votes = Vote.all
                    render json: @votes
            elsif @usersVotes[0]['is_down_vote'] && vote_params[:is_down_vote]
                @usersVotes[0].destroy
                @votes = Vote.all
                    render json: {message: "Vote Deleted", votes: @votes }          
            end
       
        elsif vote_params[:post_id].is_a? Integer
            @usersVotes = Vote.where({user_id: vote_params[:user_id], post_id: vote_params[:post_id]})

            if @usersVotes.length < 1
                @vote = Vote.new(post_id: vote_params[:post_id], user_id: vote_params[:user_id], is_down_vote: vote_params[:is_down_vote])
                @vote.save!
                @votes = Vote.all
                    render json: @votes
            elsif @usersVotes[0]['is_down_vote'] && !vote_params[:is_down_vote]
                @usersVotes[0].destroy
                vote = Vote.new(post_id: vote_params[:post_id], user_id: vote_params[:user_id], is_down_vote: vote_params[:is_down_vote])
                vote.save!
                @votes = Vote.all
                    render json: @votes
            elsif !@usersVotes[0]['is_down_vote'] && !vote_params[:is_down_vote]
                @usersVotes[0].destroy
                @votes = Vote.all
                    render json: {message: "Vote Deleted", votes: @votes }
            elsif !@usersVotes[0]['is_down_vote'] && vote_params[:is_down_vote]
                @usersVotes[0].destroy
                @downVote = Vote.new(post_id: vote_params[:post_id], user_id: vote_params[:user_id], is_down_vote: true)
                @downVote.save!
                @votes = Vote.all
                    render json: @votes
            elsif @usersVotes[0]['is_down_vote'] && vote_params[:is_down_vote]
                @usersVotes[0].destroy
                @votes = Vote.all
                    render json: {message: "Vote Deleted", votes: @votes }          
            end
        else
            render json: {errors: "Something went wrong. Call your local ReadThat call center to report the porblem....lol"}
        end
    end

    def post
        @votes = Vote.where(post_id == params[:post_id])
        render json: @votes
    end

 private

    def vote_params
        params.require(:vote).permit!
    end

end