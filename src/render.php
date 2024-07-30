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
            width: {$attributes['buttonsWidth']};
            height: {$attributes['buttonsHeight']};
            margin: {$attributes['buttonsMargin']} 0;
            border: {$attributes['buttonsBorderWidth']} solid {$attributes['buttonsBorderColor']};
            border-radius: {$attributes['buttonsBorderRadius']};
            --buttons-hover-text-color: {$attributes['buttonsTextHoverColor']};
            --buttons-hover-background-color: {$attributes['buttonsHoverColor']};";

        $styleButtonsDisabled = "color: {$attributes['buttonsTextDisabledColor']};
            background-color: {$attributes['buttonsDisabledColor']};
            font-size: {$attributes['buttonsFontSize']};
            width: {$attributes['buttonsWidth']};
            height: {$attributes['buttonsHeight']};
            margin: {$attributes['buttonsMargin']} 0;
            border: {$attributes['buttonsBorderWidth']} solid {$attributes['buttonsBorderColor']};
            border-radius: {$attributes['buttonsBorderRadius']};
            --buttons-hover-text-color: {$attributes['buttonsTextHoverColor']};
            --buttons-hover-background-color: {$attributes['buttonsHoverColor']};";

        $styleButtonsContainer = "background-color: {$attributes['buttonsBackgroundColor']};
            padding: {$attributes['buttonsBackgroundPadding']};
            border-radius: {$attributes['buttonsBackgroundRadius']};";

        $styleText = "padding: {$attributes['textPadding']};";

        // extract json from $content
        $content = get_the_content();  // whole content including html tags
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
        $CONTENT_EXPANDABLE_BLOCK = <<<CONTENT_EXPANDABLE_BLOCK
            <div class="content-expandable-block">
                <div class="news-button-container" news-post-id=$post_id style="$styleButtonsContainer">
                    <button class="news-button nb-01 nb-enabled" style="$styleButtons display: none;">{$attributes['button01Text']}</button>
                    <button class="news-button nb-01 nb-disabled" style="$styleButtonsDisabled display: block;">{$attributes['button01Text']}</button>
                    <button class="news-button nb-02 nb-enabled" style="$styleButtons display: $nb_increase_enabled_display;">{$attributes['button02Text']}</button>
                    <button class="news-button nb-02 nb-disabled" style="$styleButtonsDisabled display: $nb_increase_disabled_display;">{$attributes['button02Text']}</button>
                </div>
                <div $class_news_text_container news-post-id=$post_id style="$styleText">
                    $NEWS_TEXT
                </div>
            </div>
            CONTENT_EXPANDABLE_BLOCK;

        return $CONTENT_EXPANDABLE_BLOCK;
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
        // UTF-8: https://stackoverflow.com/questions/8218230/php-domdocument-loadhtml-not-encoding-utf-8-correctly#answer-8218649
        $contentType = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
        @$dom->loadHTML($contentType . $html_str); // Use @ to suppress errors due to malformed HTML

        // Get all <p> elements
        $paragraphs = $dom->getElementsByTagName('p');

        if ($paragraphs->length > 0) {
            // Get the text content of the first <p> element
            $extracted_text = $paragraphs->item(0)->textContent;
            return $extracted_text;
        }
    }
}

echo(build_content(get_the_ID(), $attributes));
?>
