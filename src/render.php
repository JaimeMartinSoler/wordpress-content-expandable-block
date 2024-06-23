<?php

// https://www.w3schools.com/php/default.asp

/**
 * Renders the 'content-expandable-block' block on the server.
 *
 * @return string Returns the post content in uppercase.
 */
if (!function_exists('build_content')) {
    function build_content($post_id, $attributes) {

        // newsLengthKeys
        // $news_length_keys_array = array_map("trim", explode(",", $attributes['newsLengthKeys']));

        $styleButtons = "color: {$attributes['buttonsTextColor']};
            background-color: {$attributes['buttonsColor']};
            font-size: {$attributes['buttonsFontSize']};
            width: {$attributes['buttonsSize']};
            height: {$attributes['buttonsSize']};
            --buttons-hover-background-color: {$attributes['buttonsHoverColor']};";

        $styleButtonsDisabled = "color: {$attributes['buttonsTextColor']};
            background-color: {$attributes['buttonsDisableColor']};
            font-size: {$attributes['buttonsFontSize']};
            width: {$attributes['buttonsSize']};
            height: {$attributes['buttonsSize']};";

        $styleButtonsContainer = "background-color: {$attributes['buttonsBackgroundColor']}";

        // extract json from $content
        $content = get_the_content();  // whole content including html tags
        $content_json = array("undefined");
        try {
            $content_json_str = extract_p_0($content); // string of the first <p></p> (that should be a json string) 
            // $content_json = {"short": "news length shorts...", "medium": "news length medium...", "large": "news length large..."}
            // https://www.w3schools.com/php/func_json_decode.asp
            $content_json = json_decode($content_json_str, true, 512, JSON_THROW_ON_ERROR);
        } catch (Exception $e) {
            //echo $e->getMessage();
            $content_json = array("ERROR: Exception parsing \$content:<br>
                \"{$e->getMessage()}\"<br><br>
                Post \$content:<br>
                $content<br><br>
                Post \$content must be a json string like (the following keys are just examples, can be any word and number of words):<br>
                {\"short\": \"news length shorts...\", \"medium\": \"news length medium...\", \"large\": \"news length large...\"}");
        }
        $content_json_len_1 = count($content_json) <= 1;
        $NEWS_TEXT = "";
        foreach (array_keys($content_json) as $idx => $news_length_key) {
            $news_length_value = $content_json[$news_length_key];
            //print_r($news_length_value);
            $style = $idx == 0? "display: block;" : "display: none;";
            $NEWS_TEXT = <<<NEWS_TEXT
                $NEWS_TEXT\n<div class="news-text" style="$style">$news_length_value</div>
                NEWS_TEXT;
        }

        // define html template
        $nb_increase_enabled_display = count($content_json) <= 1? "none" : "block";
        $nb_increase_disabled_display = count($content_json) <= 1? "block" : "none";
        $class_news_text_container = get_block_wrapper_attributes(['class' => 'news-text-container']);
        $CONTENT_EXPANDABLE_BLOCK = <<<HTML_BUTTONS_STR
            <div class="content-expandable-block">
                <div class="news-button-container" news-post-id=$post_id style="$styleButtonsContainer">
                    <button class="news-button nb-decrease nb-enabled" style="$styleButtons display: none;">-</button>
                    <button class="news-button nb-decrease nb-disabled" style="$styleButtonsDisabled display: block;">-</button>
                    <button class="news-button nb-increase nb-enabled" style="$styleButtons display: $nb_increase_enabled_display;">+</button>
                    <button class="news-button nb-increase nb-disabled" style="$styleButtonsDisabled display: $nb_increase_disabled_display;">+</button>
                </div>
                <div $class_news_text_container news-post-id=$post_id>
                    $NEWS_TEXT
                </div>
            </div>
            HTML_BUTTONS_STR;

        $TAG_WP_P_CONTENT = "WP_P_CONTENT";
        $WP_P = "<p>$TAG_WP_P_CONTENT</p> <!-- wp:paragraph --> <p></p> <!-- /wp:paragraph -->";
        //$WP_P = "<p>$TAG_WP_P_CONTENT</p>";

        //$wp_p_replaced
        $wp_p_replaced = str_replace($TAG_WP_P_CONTENT, $CONTENT_EXPANDABLE_BLOCK, $WP_P);
        
        return $wp_p_replaced;
    }
}

/**
 * Extract the content of the first <p></p> from an html string
 */
if (!function_exists('extract_p_0')) {
    function extract_p_0($html_str) {

        // Create a new DOMDocument
        $dom = new DOMDocument();

        // Load the HTML content
        @$dom->loadHTML($html_str); // Use @ to suppress errors due to malformed HTML

        // Get all <p> elements
        $paragraphs = $dom->getElementsByTagName('p');

        if ($paragraphs->length > 0) {
            // Get the text content of the first <p> element
            $extracted_text = $paragraphs->item(0)->textContent;
            return $extracted_text; // Output: Text to extract
        }
    }
}

echo(build_content(get_the_ID(), $attributes));
?>
