Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :test, only: %i[index]
      resources :users, only: %i[index show update destroy]
      resources :publishers, only: %i[index show update destroy] do
        member do
          get 'image', to: 'publishers#publisher_image'
        end
      end
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end
