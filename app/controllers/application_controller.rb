class ApplicationController < ActionController::Base
  USERS = { "john" => "1234" }



  private

  def authenticate
    authenticate_or_request_with_http_digest do |username|
      USERS[username]
    end
  end
end
