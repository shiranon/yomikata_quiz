module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_api_v1_user!
      def index
        users = User.all
        render json: users
      end

      def show
        user = User.find(params[:id])
        render json: user
      end

      def update
        user = User.find(params[:id])
        if user.update(user_params)
          render json: user
        else
          render json: { errors: user.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        user = User.find(params[:id])
        user.destroy
        render json: { message: 'ユーザーが削除されました', success: true }
      end

      private

      def user_params
        params.require(:user).permit(:name, :email, :admin)
      end
    end
  end
end
