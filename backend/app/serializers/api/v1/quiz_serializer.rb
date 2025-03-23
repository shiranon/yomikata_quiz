module Api
  module V1
    class QuizSerializer < ActiveModel::Serializer
      include Rails.application.routes.url_helpers

      attributes :id, :question, :answer, :description, :quiz_image_url, :created_at, :updated_at

      attribute :comic

      def comic
        {
          id: object.comic.id,
          title: object.comic.title,
          author: {
            id: object.comic.author_id,
            name: object.comic.author&.name || '不明'
          }
        }
      end

      attribute :user

      def user
        {
          id: object.user.id,
          name: object.user.name
        }
      end

      def quiz_image_url
        return nil unless object.quiz_image.attached?

        # updated_atをキャッシュバスターとして使用
        "#{image_api_v1_quiz_path(object)}?v=#{object.updated_at.to_i}"
      end
    end
  end
end
