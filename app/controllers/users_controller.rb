class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]
    
    def index 
        @users = User.all
        render json: @users
    end

    def create
        if user_params[:password] == user_params[:password_confirmation]
            @user = User.create(user_params)
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
