module Api
  module V1
    module Auth
      class RegistrationsController < DeviseTokenAuth::RegistrationsController
        private

        def sign_up_params
          params.require(:registration).permit(:email, :password, :password_confirmation, :name)
        end
      end
    end
  end
end
