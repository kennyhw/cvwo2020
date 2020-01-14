class StartController < ApplicationController
  skip_before_action :authenticate
end
