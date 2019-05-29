class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]
    
    def index 
        @users = User.all
        render json: @users
    end

    def find_current_user
        if current_user
            render json: @user
        end
    end

    def create
        if user_params[:password] == user_params[:password_confirmation]
            @user = User.new(user_params)
            @user.save!
            if @user.valid?
                @token = encode_token(user_id: @user.id)
                render json: {user: @user, token: @token}
            else
                render json: { error: 'failed to create user' }
            end 
        end
    end

    def update
        @user = User.find(params[:id])
        @user.update
        render json: @user
    end

    private

    def user_params
        params.require(:user).permit!
    end
end
