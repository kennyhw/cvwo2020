Rails.application.routes.draw do
  get 'start/portal'
  
  resources :items
  
  root 'start#portal'
end
