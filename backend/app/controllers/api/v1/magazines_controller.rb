module Api
  module V1
    class MagazinesController < ApplicationController
      def index
        magazines = Magazine.all
        render json: magazines
      end

      def show
        magazine = Magazine.find(params[:id])
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
        magazine = Magazine.find(params[:id])
        if magazine.update(magazine_params)
          render json: magazine
        else
          render json: magazine.errors, status: :unprocessable_entity
        end
      end

      def destroy
        magazine = Magazine.find(params[:id])
        magazine.destroy
        render json: { message: '雑誌が削除されました', success: true }
      end

      private

      def magazine_params
        params.require(:magazine).permit(:title, :image)
      end
    end
  end
end
