Rails.application.routes.draw do
  resources :user_preferences
  get 'categories/:category', to: 'categories#category' 
  get 'votes/:post_id', to: 'votes#post'
  post 'votes/delete', to: 'votes#delete'
  get 'comments/:post_id', to: 'comments#post'
  resources :categories
  resources :posts
  resources :comments
  resources :users
  resources :votes
  post '/login', to: 'auth#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end