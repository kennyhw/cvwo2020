Rails.application.routes.draw do
  get 'start/portal'
  
  resources :categories do
    resources :items
  end
  
  root 'start#portal'
end
