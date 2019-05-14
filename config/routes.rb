Rails.application.routes.draw do
  resources :user_preferences
  resources :categories
  resources :posts
  resources :comments
  resources :users
  resources :votes
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end