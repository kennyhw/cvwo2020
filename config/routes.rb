Rails.application.routes.draw do
  get 'start/portal'
  
  resources :categories, except: [:show] do
    resources :items, except: [:index]
  end
  
  root 'start#portal'
end
