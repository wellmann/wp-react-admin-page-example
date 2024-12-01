<?php

namespace KWIO\ReactAdminPage;

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
        'data:image/svg+xml;base64,' . base64_encode(file_get_contents(DIR_PATH . '/assets/images/icon.svg'))
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

    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
});

add_action('init', function () {
    load_plugin_textdomain(
        'wp-react-page-admin-example',
        false,
        dirname(plugin_basename(__FILE__))  . '/lang'
    );
});