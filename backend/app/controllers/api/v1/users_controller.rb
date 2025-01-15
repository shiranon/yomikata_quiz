module Api
  module V1
    class UsersController < ApplicationController
      def index
        if current_api_v1_user.admin?
          users = User.all
          render json: users
        else
          render json: { message: '権限がありません', success: false }, status: :unauthorized
        end
      end

      def show
        if current_or_admin_user
          user = User.find(params[:id])
          render json: user
        else
          render json: { message: '権限がありません', success: false }, status: :unauthorized
        end
      end

      def update
        if current_or_admin_user
          user = User.find(params[:id])
          if user.update(user_params)
            render json: user
          else
            render json: { errors: user.errors }, status: :unprocessable_entity
          end
        else
          render json: { message: '権限がありません', success: false }, status: :unauthorized
        end
      end

      def destroy
        if current_or_admin_user
          user = User.find(params[:id])
          user.destroy
          render json: { message: 'ユーザーが削除されました', success: true }
        else
          render json: { message: '権限がありません', success: false }, status: :unauthorized
        end
      end

      private

      def user_params
        params.require(:user).permit(:name, :email, :admin)
      end
    end
  end
end
