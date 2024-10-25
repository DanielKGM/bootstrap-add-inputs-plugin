/* POR DANIEL GALDEZ */
$(document).ready(function () {
  $(".db-wrap").each(function () {
    let $dbWrap = $(this);
    $dbWrap.data("id-input", $dbWrap.find("input").attr("id"));
    $dbWrap.data("input-count", 1);
  });

  $(".add-btn").click(function () {
    let $dbWrap = $(this).closest(".db-wrap");
    let maxInputCount = parseInt($dbWrap.data("maxvalue"));
    let currentInputCount = $dbWrap.find(".input-group").length;
    if (!isNaN(maxInputCount) && currentInputCount >= maxInputCount) {
      alert("Maximum number of entries has been reached.");
      return;
    }
    cloneInputGroup($dbWrap);
    $(this).blur();
  });

  $(document).on("click", ".remove-btn", function (event) {
    event.preventDefault();
    let $button = $(this);
    let $dbWrap = $button.closest(".db-wrap");
    let $inputGroup = $button.closest(".input-group");
    $button.blur();
    $inputGroup.fadeOut(function () {
      $inputGroup.remove();
      updateInputIds($dbWrap);
      let count = $dbWrap.data("input-count");
      if (count > 0) {
        count--;
        $dbWrap.data("input-count", count);
      }
      toggleHelpText($dbWrap);
    });
  });

  function updateInputIds($dbWrap) {
    let index = 0;
    $dbWrap.find(".input-group").each(function () {
      let $input = $(this).find("input");
      let originalId = $input.attr("id");
      let newId = originalId.replace(/\d+$/, index);
      $input.attr("id", newId);
      index++;
    });
  }

  function cloneInputGroup($dbWrap) {
    let $inputGroup = $dbWrap.find(".input-group").first().clone();
    let $btn = $inputGroup.find(".add-btn");
    $btn.removeClass("add-btn btn-default").addClass("remove-btn btn-danger");
    let $icon = $btn.find("i");
    $icon.removeClass("fa-add").addClass("fa-times");

    // Incrementar o contador de inputs
    let count = $dbWrap.data("input-count") || 0;
    count++;
    $dbWrap.data("input-count", count);

    $inputGroup
      .css("margin-top", "20px") // REMOVE LATER
      .find("input")
      .each(function () {
        let originalId = $(this).attr("id");
        let newId = originalId + "-" + count;
        $(this).attr("id", newId);
      })
      .val("");

    $dbWrap.append($inputGroup.hide().fadeIn());
    toggleHelpText($dbWrap);
  }

  function toggleHelpText($dbWrap) {
    let inputCount = $dbWrap.find(".input-group").length;
    if (inputCount > 1) {
      $dbWrap.find(".help-block").hide();
    } else {
      $dbWrap.find(".help-block").show();
    }
  }
});
