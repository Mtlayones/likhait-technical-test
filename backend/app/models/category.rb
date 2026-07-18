class Category < ApplicationRecord
  attribute :icon, :string, default: "📦"
  has_many :expenses, dependent: :destroy
end
