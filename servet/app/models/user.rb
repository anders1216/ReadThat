class User < ApplicationRecord
    has_secure_password
    validates :username, uniqueness: true
    has_many :posts
    has_many :votes
    has_many :comments
end
