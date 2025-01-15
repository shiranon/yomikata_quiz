module Api
  module V1
    class MagazinesController < ApplicationController
      def index
        magazines = Magazine.all
        render json: magazines
      end

      def show
        magazine = Magazine.includes(:user).find(params[:id])
        render json: magazine
      end

      def create
        magazine = Magazine.new(magazine_params)
        if magazine.save
          render json: magazine, status: :created
        else
          render json: magazine.errors, status: :unprocessable_entity
        end
      end

      def update
        magazine = Magazine.includes(:user).find(params[:id])

        if magazine.update(magazine_params)
          render json: magazine, serializer: Api::V1::MagazineSerializer
        else
          render json: { errors: magazine.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        magazine = Magazine.find(params[:id])
        if magazine.comics.exists?
          render json: {
            message: 'この雑誌に関連する漫画が存在するため削除できません',
            success: false
          }, status: :unprocessable_entity
        elsif magazine.destroy
          render json: { message: '雑誌が削除されました', success: true }
        else
          render json: {
            message: magazine.errors.full_messages.join(', '),
            success: false
          }, status: :unprocessable_entity
        end
      end

      def magazine_image
        magazine = Magazine.find(params[:id])
        if magazine.magazine_image.attached?
          redirect_to rails_blob_url(magazine.magazine_image)
        else
          render json: { error: '画像が見つかりません' }, status: :not_found
        end
      end

      private

      def magazine_params
        params.require(:magazine).permit(:name, :description, :user_id, :magazine_image)
      end
    end
  end
end
