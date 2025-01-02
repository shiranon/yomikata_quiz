require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    config.session_store :cookie_store, key: '_interslice_session'
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use config.session_store, config.session_options
    config.load_defaults 7.1

    config.autoload_lib(ignore: %w[assets tasks])

    config.time_zone = 'Tokyo'
    config.active_record.default_timezone = :local

    config.api_only = true
    config.i18n.default_locale = :ja
  end
end
