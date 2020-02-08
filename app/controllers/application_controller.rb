class ApplicationController < ActionController::Base
  USERS = { "user" => "pass" }

  # Adds HTTP Digest authentication (currently disabled - uncomment to enable)
  # before_action :authenticate

  private

  def authenticate
    authenticate_or_request_with_http_digest do |username|
      USERS[username]
    end
  end
end
