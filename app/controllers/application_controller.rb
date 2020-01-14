class ApplicationController < ActionController::Base
  USERS = { "john" => "1234" }

  before_action :authenticate

  private

  def authenticate
    authenticate_or_request_with_http_digest do |username|
      USERS[username]
    end
  end
end
