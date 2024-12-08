<?php

/**
 * @wordpress-plugin
 * Plugin Name: React Admin Page Example
 * Plugin URI: https://github.com/wellmann/wp-react-admin-page-example
 * Description: WordPress admin page developed with React and Gutenberg components.
 * Version: 0.1.0
 * Author: Kevin Wellmann
 * License: GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: wp-react-admin-page-example
 * Domain Path: /lang
 * GitHub Plugin URI: https://github.com/wellmann/wp-react-admin-page-example
 */

namespace KWIO\ReactAdminPage;

if (!defined('ABSPATH')) {
    exit;
}

define(__NAMESPACE__ . '\\MAIN_FILE', __FILE__);
define(__NAMESPACE__ . '\\BASENAME', plugin_basename(MAIN_FILE));
define(__NAMESPACE__ . '\\DIR_PATH', plugin_dir_path(MAIN_FILE));
define(__NAMESPACE__ . '\\DIR_URL', plugin_dir_url(MAIN_FILE));
define(__NAMESPACE__ . '\\ADMIN_PAGE_SLUG', 'kwio-react-page');

if (file_exists(DIR_PATH . 'vendor/autoload.php')) {
    require_once DIR_PATH . 'vendor/autoload.php';
}