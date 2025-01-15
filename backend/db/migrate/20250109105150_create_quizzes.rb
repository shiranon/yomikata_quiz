class CreateQuizzes < ActiveRecord::Migration[7.1]
  def change
    create_table :quizzes do |t|
      t.string :question, null: false
      t.string :description, null: false
      t.string :answer, null: false
      t.references :user, null: false, foreign_key: true
      t.references :comic, null: false, foreign_key: true

      t.timestamps
    end

    add_index :quizzes, :question, unique: true
  end
end
