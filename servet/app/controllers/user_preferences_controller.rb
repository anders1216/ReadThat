class UserPreferencesController < ApplicationController
    def index 
        @preferences = UserPreference.all
        render json: @preferences
    end

    def create
        @preference = UserPreference.create(preference_params)
        render json: @preference
    end

    def update
        @preference = UserPreference.find(params[:id])
        @preference.update(preference_params)
        render json: @preference
    end

private

    def preference_params
        params.require(:preference).permit!
    end
end
