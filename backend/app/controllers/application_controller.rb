class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  def current_or_admin_user
    current_api_v1_user.admin? || current_api_v1_user.id == params[:id].to_i
  end
end
