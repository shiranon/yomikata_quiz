# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 20_250_119_084_645) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'active_storage_attachments', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'record_type', null: false
    t.bigint 'record_id', null: false
    t.bigint 'blob_id', null: false
    t.datetime 'created_at', null: false
    t.index ['blob_id'], name: 'index_active_storage_attachments_on_blob_id'
    t.index %w[record_type record_id name blob_id], name: 'index_active_storage_attachments_uniqueness', unique: true
  end

  create_table 'active_storage_blobs', force: :cascade do |t|
    t.string 'key', null: false
    t.string 'filename', null: false
    t.string 'content_type'
    t.text 'metadata'
    t.string 'service_name', null: false
    t.bigint 'byte_size', null: false
    t.string 'checksum'
    t.datetime 'created_at', null: false
    t.index ['key'], name: 'index_active_storage_blobs_on_key', unique: true
  end

  create_table 'active_storage_variant_records', force: :cascade do |t|
    t.bigint 'blob_id', null: false
    t.string 'variation_digest', null: false
    t.index %w[blob_id variation_digest], name: 'index_active_storage_variant_records_uniqueness', unique: true
  end

  create_table 'authors', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'description'
    t.bigint 'user_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['user_id'], name: 'index_authors_on_user_id'
  end

  create_table 'comics', force: :cascade do |t|
    t.string 'title', null: false
    t.string 'description'
    t.bigint 'user_id', null: false
    t.bigint 'magazine_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.bigint 'author_id'
    t.index ['author_id'], name: 'index_comics_on_author_id'
    t.index ['magazine_id'], name: 'index_comics_on_magazine_id'
    t.index ['title'], name: 'index_comics_on_title', unique: true
    t.index ['user_id'], name: 'index_comics_on_user_id'
  end

  create_table 'magazines', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'description'
    t.bigint 'user_id', null: false
    t.bigint 'publisher_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['name'], name: 'index_magazines_on_name', unique: true
    t.index ['publisher_id'], name: 'index_magazines_on_publisher_id'
    t.index ['user_id'], name: 'index_magazines_on_user_id'
  end

  create_table 'mylist_quizzes', force: :cascade do |t|
    t.bigint 'mylist_id', null: false
    t.bigint 'quiz_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['mylist_id'], name: 'index_mylist_quizzes_on_mylist_id'
    t.index ['quiz_id'], name: 'index_mylist_quizzes_on_quiz_id'
  end

  create_table 'mylists', force: :cascade do |t|
    t.string 'title', null: false
    t.string 'description'
    t.boolean 'is_public', default: false, null: false
    t.bigint 'user_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['user_id'], name: 'index_mylists_on_user_id'
  end

  create_table 'publishers', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'description'
    t.bigint 'user_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['name'], name: 'index_publishers_on_name', unique: true
    t.index ['user_id'], name: 'index_publishers_on_user_id'
  end

  create_table 'quizzes', force: :cascade do |t|
    t.string 'question', null: false
    t.string 'description', null: false
    t.string 'answer', null: false
    t.bigint 'user_id', null: false
    t.bigint 'comic_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['comic_id'], name: 'index_quizzes_on_comic_id'
    t.index ['question'], name: 'index_quizzes_on_question', unique: true
    t.index ['user_id'], name: 'index_quizzes_on_user_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'provider', default: 'email', null: false
    t.string 'uid', default: '', null: false
    t.string 'encrypted_password', default: '', null: false
    t.string 'reset_password_token'
    t.datetime 'reset_password_sent_at'
    t.boolean 'allow_password_change', default: false
    t.datetime 'remember_created_at'
    t.string 'confirmation_token'
    t.datetime 'confirmed_at'
    t.datetime 'confirmation_sent_at'
    t.string 'unconfirmed_email'
    t.string 'name'
    t.string 'email'
    t.boolean 'admin'
    t.json 'tokens'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['confirmation_token'], name: 'index_users_on_confirmation_token', unique: true
    t.index ['email'], name: 'index_users_on_email', unique: true
    t.index ['name'], name: 'index_users_on_name', unique: true
    t.index ['reset_password_token'], name: 'index_users_on_reset_password_token', unique: true
    t.index %w[uid provider], name: 'index_users_on_uid_and_provider', unique: true
  end

  add_foreign_key 'active_storage_attachments', 'active_storage_blobs', column: 'blob_id'
  add_foreign_key 'active_storage_variant_records', 'active_storage_blobs', column: 'blob_id'
  add_foreign_key 'authors', 'users'
  add_foreign_key 'comics', 'authors'
  add_foreign_key 'comics', 'magazines'
  add_foreign_key 'comics', 'users'
  add_foreign_key 'magazines', 'publishers'
  add_foreign_key 'magazines', 'users'
  add_foreign_key 'mylist_quizzes', 'mylists'
  add_foreign_key 'mylist_quizzes', 'quizzes'
  add_foreign_key 'mylists', 'users'
  add_foreign_key 'publishers', 'users'
  add_foreign_key 'quizzes', 'comics'
  add_foreign_key 'quizzes', 'users'
end
