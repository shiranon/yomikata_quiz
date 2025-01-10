module Api
  module V1
    class PublishersController < ApplicationController
      def index
        publishers = Publisher.all
        render json: publishers, each_serializer: Api::V1::PublisherSerializer
      end

      def show
        publisher = Publisher.find(params[:id])
        render json: publisher, serializer: Api::V1::PublisherSerializer
      end

      def create
        publisher = Publisher.new(publisher_params)
        if publisher.save
          render json: publisher, status: :created
        else
          render json: { errors: publisher.errors }, status: :unprocessable_entity
        end
      end

      def publisher_image
        publisher = Publisher.find(params[:id])
        if publisher.publisher_image.attached?
          redirect_to rails_blob_url(publisher.publisher_image)
        else
          render json: { error: '画像が見つかりません' }, status: :not_found
        end
      end

      private

      def publisher_params
        params.require(:publisher).permit(:name, :description, :user_id, :publisher_image)
      end
    end
  end
end
