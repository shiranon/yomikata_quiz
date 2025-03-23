# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require_relative 'fixtures/constants'
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
PUBLISHER_DATA.each do |publisher_data|
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
MAGAZINE_DATA.each do |magazine_data|
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

# 著者を作成
AUTHOR_DATA.each do |author_data|
  author = Author.create!(
    name: author_data[:name],
    description: author_data[:description],
    user_id: author_data[:user_id]
  )
  puts "\"#{author.name}\" has created!"
end

# 漫画を作成
COMIC_DATA.each do |comic_data|
  comic = Comic.create!(
    title: comic_data[:title],
    description: comic_data[:description],
    user_id: comic_data[:user_id],
    magazine_id: comic_data[:magazine_id],
    author_id: comic_data[:author_id]
  )
  comic.comic_image.attach(
    io: File.open(comic_data[:image]),
    filename: File.basename(comic_data[:image])
  )
  puts "\"#{comic.title}\" has created!"
end

# クイズを作成
QUIZ_DATA.each do |quiz_data|
  quiz = Quiz.create!(
    question: quiz_data[:question],
    answer: quiz_data[:answer],
    description: quiz_data[:description],
    user_id: quiz_data[:user_id],
    comic_id: quiz_data[:comic_id]
  )
  quiz.quiz_image.attach(
    io: File.open(quiz_data[:image]),
    filename: File.basename(quiz_data[:image])
  )
  puts "\"#{quiz.question}\" has created!"
end

# マイリストを作成
MYLIST_DATA.each do |mylist_data|
  mylist = Mylist.create!(
    title: mylist_data[:title],
    description: mylist_data[:description],
    user_id: mylist_data[:user_id]
  )
  puts "\"#{mylist.title}\" has created!"

  # クイズを関連付ける
  next unless mylist_data[:quiz_ids].present?

  mylist_data[:quiz_ids].each do |quiz_id|
    mylist.mylist_quizzes.create!(quiz_id: quiz_id)
  end
end
