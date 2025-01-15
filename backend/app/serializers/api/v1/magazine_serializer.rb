module Api
  module V1
    class MagazineSerializer < ActiveModel::Serializer
      include Rails.application.routes.url_helpers
      attributes :id, :name, :description, :user_id, :magazine_image_url, :created_at, :updated_at

      attribute :user
      attribute :publisher

      def publisher
        {
          id: object.publisher.id,
          name: object.publisher.name
        }
      end

      def user
        {
          id: object.user.id,
          name: object.user.name
        }
      end

      def magazine_image_url
        return nil unless object.magazine_image.attached?

        # updated_atをキャッシュバスターとして使用
        "#{image_api_v1_magazine_path(object)}?v=#{object.updated_at.to_i}"
      end
    end
  end
end
