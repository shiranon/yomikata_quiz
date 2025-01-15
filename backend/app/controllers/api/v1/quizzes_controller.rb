module Api
  module V1
    class QuizzesController < ApplicationController
      def index
        quizzes = Quiz.all
        render json: quizzes
      end

      def show
        quiz = Quiz.includes(:user).find(params[:id])
        render json: quiz
      end

      def create
        quiz = Quiz.new(quiz_params)
        if quiz.save
          render json: quiz, status: :created
        else
          render json: quiz.errors, status: :unprocessable_entity
        end
      end

      def update
        if current_or_admin_user
          quiz = Quiz.includes(:user).find(params[:id])

          if quiz.update(quiz_params)
            render json: quiz, serializer: Api::V1::QuizSerializer
          else
            render json: { errors: quiz.errors }, status: :unprocessable_entity
          end
        else
          render json: { message: '権限がありません', success: false }, status: :unauthorized
        end
      end

      def destroy
        if current_or_admin_user
          quiz = Quiz.find(params[:id])
          quiz.destroy
          render json: { message: 'クイズが削除されました', success: true }
        else
          render json: { message: '権限がありません', success: false }, status: :unauthorized
        end
      end

      def quiz_image
        quiz = Quiz.find(params[:id])
        if quiz.quiz_image.attached?
          redirect_to rails_blob_url(quiz.quiz_image)
        else
          render json: { error: '画像が見つかりません' }, status: :not_found
        end
      end

      private

      def quiz_params
        params.require(:quiz).permit(:question, :answer, :description, :user_id, :comic_id, :quiz_image)
      end
    end
  end
end
