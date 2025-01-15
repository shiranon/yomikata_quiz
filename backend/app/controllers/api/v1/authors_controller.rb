module Api
  module V1
    class AuthorsController < ApplicationController
      def index
        authors = Author.all
        render json: authors
      end

      def show
        author = Author.includes(:user).find(params[:id])
        render json: author
      end

      def create
        author = Author.new(author_params)
        if author.save
          render json: author, status: :created
        else
          render json: author.errors, status: :unprocessable_entity
        end
      end

      def update
        author = Author.includes(:user).find(params[:id])

        if author.update(author_params)
          render json: author, serializer: Api::V1::AuthorSerializer
        else
          render json: { errors: author.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        if current_or_admin_user
          author = Author.find(params[:id])
          if author.comics.exists?
            render json: {
              message: 'この著者に関連する漫画が存在するため削除できません',
              success: false
            }, status: :unprocessable_entity
          elsif author.destroy
            render json: { message: '著者が削除されました', success: true }
          else
            render json: {
              message: author.errors.full_messages.join(', '),
              success: false
            }, status: :unprocessable_entity
          end
        else
          render json: { message: '権限がありません', success: false }, status: :unauthorized
        end
      end

      private

      def author_params
        params.require(:author).permit(:name, :description, :user_id)
      end
    end
  end
end
