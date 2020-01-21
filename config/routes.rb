Rails.application.routes.draw do
  get 'start/portal'

  #resources :categories, except: [:show] do
  #  resources :items, except: [:index]
  #end
  namespace :api do
    jsonapi_resources :categories
  end

  root 'home#index'

  get '*path', to: 'home#index', constraints: { format: 'html' }
end
