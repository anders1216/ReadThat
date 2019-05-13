class UsersController < ApplicationController
    
    def index 
        @users = User.all
        render json: @users
    end

    def create
        @user = User.find_or_create_by(user_params)
        render json: @user
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
