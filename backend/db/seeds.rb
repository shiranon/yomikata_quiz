# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# 既存のデータを削除
Publisher.destroy_all
Magazine.destroy_all
User.destroy_all
ActiveStorage::Attachment.destroy_all
ActiveStorage::Blob.destroy_all

# 管理ユーザーを作成
User.create!(email: ENV.fetch('ADMIN_EMAIL', nil),
             name: ENV.fetch('ADMIN_NAME', nil),
             password: ENV.fetch('ADMIN_PASSWORD', nil),
             admin: true,
             confirmed_at: Time.now)

# ユーザーを作成
5.times do
  user = User.create!(
    name: Faker::Books::Lovecraft.unique.deity,
    email: Faker::Internet.unique.email,
    password: 'foobar',
    admin: false,
    confirmed_at: Time.now
  )
  puts "\"#{user.name}\" has created!"
end

# 出版社を作成
IMAGE_PATHS = {
  shueisha: Rails.root.join('db/fixtures/images/publisher/shueisha_logo.png'),
  shonen_jump: Rails.root.join('db/fixtures/images/magazine/shonen_jump_cover.jpg'),
  hunter_x_hunter: Rails.root.join('db/fixtures/images/comic/hunter_x_hunter_cover.jpg')
}.freeze

publishers_data = [
  {
    name: '集英社',
    description: '株式会社集英社は、日本の総合出版社。『週刊少年ジャンプ』『週刊プレイボーイ』などの雑誌を発行している。社名は「英知が集う」の意味。',
    image: IMAGE_PATHS[:shueisha],
    user_id: 1
  }
]

publishers_data.each do |publisher_data|
  publisher = Publisher.create!(
    name: publisher_data[:name],
    description: publisher_data[:description],
    user_id: publisher_data[:user_id]
  )
  publisher.publisher_image.attach(
    io: File.open(publisher_data[:image]),
    filename: File.basename(publisher_data[:image])
  )
  puts "\"#{publisher.name}\" has created!"
end

# 雑誌を作成
magazines_data = [
  {
    name: '週刊少年ジャンプ',
    description: '週刊少年ジャンプは、集英社が発行する週刊少年漫画雑誌。',
    image: IMAGE_PATHS[:shonen_jump],
    user_id: 1,
    publisher_id: 1
  }
]

magazines_data.each do |magazine_data|
  magazine = Magazine.create!(
    name: magazine_data[:name],
    description: magazine_data[:description],
    user_id: magazine_data[:user_id],
    publisher_id: magazine_data[:publisher_id]
  )
  magazine.magazine_image.attach(
    io: File.open(magazine_data[:image]),
    filename: File.basename(magazine_data[:image])
  )
  puts "\"#{magazine.name}\" has created!"
end

# 漫画を作成
comics_data = [
  {
    title: 'HUNTER×HUNTER',
    description: 'HUNTER×HUNTERは、冨樫義博による日本の漫画作品。',
    image: IMAGE_PATHS[:hunter_x_hunter],
    user_id: 1,
    magazine_id: 1
  }
]

comics_data.each do |comic_data|
  comic = Comic.create!(
    title: comic_data[:title],
    description: comic_data[:description],
    user_id: comic_data[:user_id],
    magazine_id: comic_data[:magazine_id]
  )
  comic.comic_image.attach(
    io: File.open(comic_data[:image]),
    filename: File.basename(comic_data[:image])
  )
  puts "\"#{comic.title}\" has created!"
end
