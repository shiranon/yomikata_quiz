# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

User.create!(email: ENV.fetch('ADMIN_EMAIL', nil),
             name: ENV.fetch('ADMIN_NAME', nil),
             password: ENV.fetch('ADMIN_PASSWORD', nil),
             admin: true,
             confirmed_at: Time.now)

5.times do
  user = User.create!(
    name: Faker::Books::Lovecraft.deity,
    email: Faker::Internet.email,
    password: 'foobar',
    admin: false,
    confirmed_at: Time.now
  )
  puts "\"#{user.username}\" has created!"
end
