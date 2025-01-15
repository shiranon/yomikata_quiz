module Api
  module V1
    class ComicSerializer < ActiveModel::Serializer
      include Rails.application.routes.url_helpers
      attributes :id, :title, :description, :user_id, :comic_image_url, :created_at, :updated_at

      attribute :user

      def user
        {
          id: object.user.id,
          name: object.user.name
        }
      end

      attribute :author

      def author
        {
          id: object.author.id,
          name: object.author.name
        }
      end

      attribute :magazine

      def magazine
        {
          id: object.magazine.id,
          name: object.magazine.name
        }
      end

      def comic_image_url
        return nil unless object.comic_image.attached?

        # updated_atをキャッシュバスターとして使用
        "#{image_api_v1_comic_path(object)}?v=#{object.updated_at.to_i}"
      end
    end
  end
end
