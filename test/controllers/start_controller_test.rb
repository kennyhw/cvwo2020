require 'test_helper'

class StartControllerTest < ActionDispatch::IntegrationTest
  test "should get portal" do
    get start_portal_url
    assert_response :success
  end

end
