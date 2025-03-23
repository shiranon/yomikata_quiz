module Api
  module V1
    class MylistSerializer < ActiveModel::Serializer
      attributes :id, :title, :description, :is_public, :created_at, :updated_at

      attribute :user
      attribute :quizzes

      def user
        {
          id: object.user.id,
          name: object.user.name
        }
      end

      def quizzes
        object.quizzes.map do |quiz|
          {
            id: quiz.id,
            question: quiz.question,
            answer: quiz.answer,
            description: quiz.description,
            quiz_image_url: quiz_image_url(quiz),
            comic: {
              id: quiz.comic.id,
              title: quiz.comic.title,
              author: {
                id: quiz.comic.author_id,
                name: quiz.comic.author&.name || '不明'
              },
              magazine: {
                id: quiz.comic.magazine_id,
                name: quiz.comic.magazine&.name || '不明'
              }
            }
          }
        end
      end

      private

      def quiz_image_url(quiz)
        return nil unless quiz.quiz_image.attached?

        # updated_atをキャッシュバスターとして使用
        url_helpers = Rails.application.routes.url_helpers
        "#{url_helpers.image_api_v1_quiz_path(quiz)}?v=#{quiz.updated_at.to_i}"
      end
    end
  end
end
