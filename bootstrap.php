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
 * Text Domain: wp-react-page-admin-example
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

const ADMIN_PAGE_SLUG = 'kwio-react-page';

add_action('admin_menu', function () {
    add_menu_page(
        __('React Page', 'wp-react-page-admin-example'),
        __('React Page', 'wp-react-page-admin-example'),
        'manage_options',
        ADMIN_PAGE_SLUG,
        function () {
            printf(
                '<div class="wrap" id="root" data-title="%s"></div>',
                get_admin_page_title()
            );
        },
        'dashicons-admin-site-alt3'
    );
});

add_action('admin_enqueue_scripts', function ($hookSuffix) {
    if ($hookSuffix !== 'toplevel_page_' . ADMIN_PAGE_SLUG) {
        return;
    }

    $assetManifestFile = DIR_PATH . 'dist/app.asset.php';
    if (!file_exists($assetManifestFile)) {
        return;
    }

    $assetManifest = include $assetManifestFile;

    wp_enqueue_script(
        ADMIN_PAGE_SLUG,
        DIR_URL . 'dist/app.js',
        $assetManifest['dependencies'],
        $assetManifest['version']
    );

    wp_set_script_translations(
        ADMIN_PAGE_SLUG,
        'wp-react-page-admin-example',
        DIR_PATH . 'lang'
    );

    wp_enqueue_style(
        ADMIN_PAGE_SLUG,
        DIR_URL . 'dist/app.css',
        ['wp-components'],
        filemtime(DIR_PATH . 'dist/app.css')
    );
});

add_action('init', function () {
    load_plugin_textdomain(
        'wp-react-page-admin-example',
        false,
        dirname(plugin_basename(__FILE__))  . '/lang'
    );
});