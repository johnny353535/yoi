---
layout: base
group: utilities
title: JsFallback
permalink: utilities/jsfallback
---

# JavaSript Fallback

<p class="hint hint--error">Documentation incomplete.</p>

| `.js-fallback` | … |
| `.js-only`     | … |

<!--
    <p class="intro">Use these utility-classes inside markup/templates to either display elements as _fallback if JavaScript is not available_ or to display certain elements  _only if JavaScript is enabled_.</p>

    ## .js-fallback

    Elements with this utility class are **hidden if JavaScript is active** and **visible if JavaScript is inactive**. Use this class for fallback elements and to make sure any operation works and any page makes sense without JavaScript.

    ### Example: .ratingInput

    A proper example would be the element [.ratingInput](/pages/components/ratingInput.html) which simply does not work if JavaScript is not available. Instead, a `<select>` is shown as fallback.

    ```html
    <form class="ratingInput ratingInput--rated-3" yoi-ratinginput="uid:1234; score:3;">
        <div class="js-fallback">
            <select class="select" name="exampleRating">
                <option value="5">5 | very good</option>
                <option value="4">4 | good</option>
                <option value="3">3 | fairly good</option>
                <option value="2">2 | still okay</option>
                <option value="1">1 | pretty bad</option>
            </select>
            <span class="btn m-l-2">
                <input type="submit" value="Submit" />
                <span>Submit</span>
            </span>
        </div>
    </form>
    <form>
        <select class="select" name="exampleRating">
            <option value="5">5 | very good</option>
            <option value="4">4 | good</option>
            <option value="3">3 | fairly good</option>
            <option value="2">2 | still okay</option>
            <option value="1">1 | pretty bad</option>
        </select>
        <span class="btn m-l-2">
            <input type="submit" value="Submit" />
            <span>Submit</span>
        </span>
    </form>
    ```

    ## .js-only

    Elements with this utility class are visible only if JavaScript is available. Use this class to **hide elements that only work or make sense if JavaScript is enabled and need no fallback** since they do not provide any **crucial feature**.

    ```html
    <div class="js-only" id="jsOnlyElement">
        <p class="fs-2 lh-3">Some element that only works with JavaScript enabled.</p>
    </div>
    ```

    <script>
        $(function () {
            var element = $("#jsOnlyElement");
            (function(){
                element
                    .fadeIn("slow")
                    .animate({ marginLeft: 200 }, 1000)
                    .animate({ marginLeft: 0 },   1000)
                    .fadeOut("slow", arguments.callee);
            }());
        });
    </script>
-->