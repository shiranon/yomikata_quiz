module Api
  module V1
    class ComicsController < ApplicationController
      def index
        comics = Comic.all
        render json: comics, each_serializer: Api::V1::ComicSerializer
      end

      def show
        comic = Comic.includes(:user).find(params[:id])
        render json: comic, serializer: Api::V1::ComicSerializer
      end

      def create
        comic = Comic.new(comic_params)
        if comic.save
          render json: comic, status: :created
        else
          render json: { errors: comic.errors }, status: :unprocessable_entity
        end
      end

      def update
        if current_or_admin_user
          comic = Comic.includes(:user).find(params[:id])

          if comic.update(comic_params)
            render json: comic, serializer: Api::V1::ComicSerializer
          else
            render json: { errors: comic.errors }, status: :unprocessable_entity
          end
        else
          render json: { message: '権限がありません', success: false }, status: :unauthorized
        end
      end

      def destroy
        if current_or_admin_user
          comic = Comic.find(params[:id])
          comic.destroy
          render json: { message: '漫画が削除されました', success: true }
        else
          render json: { message: '権限がありません', success: false }, status: :unauthorized
        end
      end

      def comic_image
        comic = Comic.find(params[:id])
        if comic.comic_image.attached?
          redirect_to rails_blob_url(comic.comic_image)
        else
          render json: { error: '画像が見つかりません' }, status: :not_found
        end
      end

      private

      def comic_params
        params.require(:comic).permit(:title, :description, :user_id, :comic_image, :author_id, :magazine_id)
      end
    end
  end
end
