Rails.application.routes.draw do
  
  namespace :api do
    resources :users
    resources :courses 
    get '/:id/courses', to: 'users#Courses'
    get '/:id/users', to: 'courses#Users'
  end

end
