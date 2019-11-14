class CreatePlans < ActiveRecord::Migration[5.0]
  def change
    drop_table :plans
    create_table :plans do |t|
      t.string :name
      t.decimal :price
      t.timestamps 
    end
  end
end
