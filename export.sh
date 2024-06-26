#!/bin/sh

SCRIPT_PATH="$(realpath "$0")"
BLOCK_PATH="$(dirname "$SCRIPT_PATH")"
WP_PLUGIN_BLOCK_PATH=/srv/www/wordpress/wp-content/plugins/content-expandable-block

echo "\nRunning export.sh: to export the block code as wordpress plugin"
echo "  - sh export.sh      : will NOT run 'npm run build'"
echo "  - sh export.sh build: will run 'npm run build'"
echo "\nBLOCK_PATH:           $BLOCK_PATH"
echo "WP_PLUGIN_BLOCK_PATH: $WP_PLUGIN_BLOCK_PATH"

cd $BLOCK_PATH

if [ $# -ge 1 ] && [ $1 = "build" ]; then
    echo "\nRunning 'npm run build'\n"
    npm run build
else
    echo "\nSkipping 'npm run build'"
fi

echo "\nCleaning $WP_PLUGIN_BLOCK_PATH/*"
rm -r $WP_PLUGIN_BLOCK_PATH/*
echo "Copying $BLOCK_PATH/build to $WP_PLUGIN_BLOCK_PATH"
cp -r $BLOCK_PATH/build $WP_PLUGIN_BLOCK_PATH
echo "Copying $BLOCK_PATH/content-expandable-block.php to $WP_PLUGIN_BLOCK_PATH"
cp $BLOCK_PATH/content-expandable-block.php $WP_PLUGIN_BLOCK_PATH

echo "\nOK !!!\n"
