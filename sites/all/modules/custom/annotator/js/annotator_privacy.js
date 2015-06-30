(function ($) {
  Drupal.behaviors.annotatorPrivacy = {
    attach: function (context, settings) {
      Drupal.Annotator.annotator('addPlugin', 'Privacy');
      if ($.isFunction($(document).on)) { // workaround for /admin using jquery 1.5.1 (otherwise, f() does not exist error)
        // need to use .on for future DOM elements, 1.5.1 has .delegate
        $(document).on( "click", "form.annotator-widget .privacy.types .privacy-type", function(e) {
          $(this).toggleClass("checked");
          if ("Co-Learners" == $(this).attr("id")) {
            $(".annotator-widget .privacy-groups").addClass("show-groups");
          }
          if ($(this).hasClass("checked")) {
            if ("Private" == $(this).attr("id")) {
              $(".privacy.types #Instructor, .privacy.types #Co-Learners, .privacy.types #Everyone").removeClass('checked');
              $(".annotator-widget .privacy-groups").removeClass("show-groups");
            }
            if ("Everyone" == $(this).attr("id")) {
              $(".privacy.types #Instructor, .privacy.types #Co-Learners, .privacy.types #Private").removeClass('checked');
              $(".annotator-widget .privacy-groups").removeClass("show-groups");
            }
            if ("Instructor" == $(this).attr("id") || "Co-Learners" == $(this).attr("id")) {
              $(".privacy.types #Private, .privacy.types #Everyone").removeClass('checked');
            }
          }
        });
      }
    }
  };
})(jQuery);
