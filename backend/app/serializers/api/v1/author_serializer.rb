module Api
  module V1
    class AuthorSerializer < ActiveModel::Serializer
      attributes :id, :name, :description, :created_at, :updated_at

      attribute :user

      def user
        {
          id: object.user.id,
          name: object.user.name
        }
      end
    end
  end
end
