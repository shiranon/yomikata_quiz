Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :quizzes, only: %i[index show create update destroy] do
        member do
          get 'image', to: 'quizzes#quiz_image'
        end
      end

      resources :comics, only: %i[index show create update destroy] do
        member do
          get 'image', to: 'comics#comic_image'
        end
      end

      resources :authors, only: %i[index show create update destroy]

      resources :magazines, only: %i[index show update destroy] do
        member do
          get 'image', to: 'magazines#magazine_image'
        end
      end

      resources :publishers, only: %i[index show update destroy] do
        member do
          get 'image', to: 'publishers#publisher_image'
        end
      end

      resources :mylists, only: %i[index show create update destroy] do
        member do
          post 'add_quiz', to: 'mylists#add_quiz'
          delete 'remove_quiz', to: 'mylists#remove_quiz'
        end
      end

      get 'user/mylists', to: 'mylists#user_mylists'

      resources :users, only: %i[index show update destroy]

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end
