module Api
  module V1
    class PublisherSerializer < ActiveModel::Serializer
      include Rails.application.routes.url_helpers

      attributes :id, :name, :description, :user_id, :publisher_image_url, :created_at, :updated_at

      def publisher_image_url
        return nil unless object.publisher_image.attached?

        image_api_v1_publisher_path(object)
      end
    end
  end
end
