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

    $assetManifestFile = plugin_dir_path(__FILE__) . 'dist/app.asset.php';
    if (!file_exists($assetManifestFile)) {
        return;
    }

    $assetManifest = include $assetManifestFile;

    wp_enqueue_script(
        ADMIN_PAGE_SLUG,
        plugin_dir_url(__FILE__) . 'dist/app.js',
        $assetManifest['dependencies'],
        $assetManifest['version']
    );

    wp_set_script_translations(
        ADMIN_PAGE_SLUG,
        'wp-react-page-admin-example',
        plugin_dir_path(__FILE__) . 'lang'
    );

    wp_enqueue_style(
        ADMIN_PAGE_SLUG,
        plugin_dir_url(__FILE__) . 'dist/app.css',
        ['wp-components'],
        filemtime(plugin_dir_path(__FILE__) . 'dist/app.css')
    );
});

add_action('init', function () {
    load_plugin_textdomain(
        'wp-react-page-admin-example',
        false,
        dirname(plugin_basename(__FILE__))  . '/lang'
    );
});