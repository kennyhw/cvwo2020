Rails.application.routes.draw do
  namespace :api do
    jsonapi_resources :categories
  end

  root 'home#index'
  get '*path', to: 'home#index', constraints: { format: 'html' }
end
