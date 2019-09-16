Rails.application.routes.draw do
  resources :user_preferences
  get 'categories/:category', to: 'categories#category' 
  get 'votes/:post_id', to: 'votes#post'
  get 'comments/:post_id', to: 'comments#post'
  get 'comments/:post_id/:comment_id', to: 'comments#comments_comments'
  get 'users/current_user', to: 'users#find_current_user'
  resources :categories
  resources :posts
  resources :comments
  resources :users
  resources :votes
  post '/login', to: 'auth#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end