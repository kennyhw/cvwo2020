Rails.application.routes.draw do
  get 'start/portal'
  
  root 'start#portal'
end
