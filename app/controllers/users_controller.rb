class UsersController < ApplicationController
    create
    @user = User.create(user_params)
    render json: @user
end

update
    @user = User.find(params[:id])
    @user.update
    render json: @user
end

private

user_params
    params.require(:user).permit!
end
end
