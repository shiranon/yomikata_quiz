class CreateMylistQuizzes < ActiveRecord::Migration[7.1]
  def change
    create_table :mylist_quizzes do |t|
      t.references :mylist, null: false, foreign_key: true
      t.references :quiz, null: false, foreign_key: true

      t.timestamps
    end
  end
end
