module Api
  module V1
    class MylistsController < ApplicationController
      def index
        mylists = Mylist.all
        render json: mylists, each_serializer: Api::V1::MylistSerializer
      end

      def show
        mylist = Mylist.includes(:user, :quizzes).find(params[:id])
        render json: mylist, serializer: Api::V1::MylistSerializer
      end

      def create
        mylist = Mylist.new(mylist_params)
        if mylist.save
          render json: mylist, status: :created
        else
          render json: mylist.errors, status: :unprocessable_entity
        end
      end

      def update
        if current_or_admin_user
          mylist = Mylist.includes(:user).find(params[:id])

          if mylist.update(mylist_params)
            render json: mylist, serializer: Api::V1::MylistSerializer
          else
            render json: { errors: mylist.errors }, status: :unprocessable_entity
          end
        else
          render json: { message: '権限がありません', success: false }, status: :unauthorized
        end
      end

      def destroy
        if current_or_admin_user
          mylist = Mylist.find(params[:id])
          mylist.destroy
          render json: { message: 'マイリストが削除されました', success: true }
        else
          render json: { message: '権限がありません', success: false }, status: :unauthorized
        end
      end

      def add_quiz
        mylist = Mylist.find(params[:id])
        quiz = Quiz.find(params[:quiz_id])

        if mylist.quizzes.include?(quiz)
          render json: { message: 'このクイズは既にマイリストに追加されています', success: false }, status: :unprocessable_entity
        else
          mylist.quizzes << quiz
          render json: { message: 'クイズがマイリストに追加されました', success: true }
        end
      end

      def remove_quiz
        mylist = Mylist.find(params[:id])
        quiz = Quiz.find(params[:quiz_id])

        if mylist.quizzes.include?(quiz)
          mylist.quizzes.delete(quiz)
          render json: { message: 'クイズがマイリストから削除されました', success: true }
        else
          render json: { message: 'このクイズはマイリストに存在しません', success: false }, status: :unprocessable_entity
        end
      end

      def user_mylists
        if current_user
          mylists = current_user.mylists
          render json: mylists, each_serializer: Api::V1::MylistSerializer
        else
          render json: { message: 'ログインが必要です', success: false }, status: :unauthorized
        end
      end

      private

      def mylist_params
        params.require(:mylist).permit(:title, :description, :is_public, :user_id)
      end
    end
  end
end
