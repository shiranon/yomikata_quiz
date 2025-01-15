module Api
  module V1
    class PublisherSerializer < ActiveModel::Serializer
      include Rails.application.routes.url_helpers

      attributes :id, :name, :description, :user_id, :publisher_image_url, :created_at, :updated_at

      attribute :user

      def user
        {
          id: object.user.id,
          name: object.user.name
        }
      end

      def publisher_image_url
        return nil unless object.publisher_image.attached?

        # updated_atをキャッシュバスターとして使用
        "#{image_api_v1_publisher_path(object)}?v=#{object.updated_at.to_i}"
      end
    end
  end
end
