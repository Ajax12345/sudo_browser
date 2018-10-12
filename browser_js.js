function get_max(arr){
    var start = arr[0];
    for (var i = 0; i < arr.length; i++){
      if (arr[i] > start){
        start = arr[i]
      }
    }
    return start;
  }
  function random_string(){
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    var result = "";
    for (var i = 2; i < Math.round(Math.random()*10)+3; i++){
      try{
        result += alphabet[Math.round(Math.random()*25)]
      }
      catch(error){
        result += "z";
      }
    }
    return result;
  }
  $(document).ready(function(){
    var current_clicked = null;
    var just_removed = false;
    var original_headers = {0:["Home"]};
    $('.main_action_wrapper').on('click', '.add_tab', function(){
  
      var current_tabs = [];
      $('.tab').each(function(){
        current_tabs.push(parseInt(this.id.match('\\d+')));
      });
  
      var results = get_max(current_tabs) + 1;
      var new_results = results.toString();
      var generic_header = random_string();
      var the_html = `
        <div class='tab tab_item main_tab' id='tab${new_results}'>
          <div id='title_for_${new_results}'>
            <p class='browser_text' id='titletext${new_results}'>${generic_header}</p>
          </div>
          <div class='deletion_pane' id='remove_for_${new_results}'>
            <button class='delete_tab' id='delete${new_results}'>
              <i class="fas fa-times timesdeletion" style='color:black;'></i>
            </button>
          </div>
        </div>
      `;
      original_headers[new_results] = [generic_header];
      $('.all_tabs').append(the_html);
      if (current_tabs.length >= 9){
        $('.tab_item').css('width', parseFloat(90/(current_tabs.length+1))+'%');
      }
  
      $('.tab').each(function(){
        var the_id = parseInt(this.id.match('\\d+'));
        var the_length = parseInt($(this).css('width').match('\\d+'))/12;
  
        if ($('#titletext'+the_id.toString()).text().length >= the_length){
  
  
          var new_text = $('#titletext'+the_id.toString()).text().substring(0, the_length-3) +'...';
          $('#titletext'+the_id.toString()).text(new_text);
  
          original_headers[the_id].push(new_text);
  
        }
      });
  
      current_clicked = null;
      $('#tab'+new_results).css('background-color', '#DEDEDE');
      for (var i = 0; i < current_tabs.length; i++){
        $('#tab'+current_tabs[i].toString()).css('background-color', '#C0C0C0');
        $('#tab'+current_tabs[i].toString()).css('border-right', 'none');
      }
  
    });
  
    $('.main_action_wrapper').on('click', '.tab', function(){
      if (!just_removed){
        var all_tabs = [];
        $('.tab').each(function(){
          all_tabs.push(parseInt(this.id.match('\\d+')));
        });
          $(this).css('background-color', '#DEDEDE');
          var clinked_id = this.id.match('\\d+');
          current_clicked = parseInt(clinked_id);
          $('.tab').each(function(){
            if (parseInt(this.id.match('\\d+')) !== parseInt(clinked_id)){
              $(this).css('background-color', '#C0C0C0');
            }
          });
      }
      just_removed = false;
  
  
  
  
    });
    $('.main_action_wrapper').on('click', '.delete_tab', function(){
      just_removed = true;
      var original = [];
      $('.tab').each(function(){
        original.push(parseInt(this.id.match('\\d+')));
      });
      var final_results = [];
      $('#tab'+this.id.match('\\d+')).remove();
      $('.tab').each(function(){
        final_results.push(this.id.match('\\d+'));
      });
      if (final_results.length >= 9){
        $('.tab_item').css('width', parseFloat(90/(final_results.length+1))+'%');
      }
      else{
        $('.tab_item').css('width', '10%');
      }
      if (parseInt(this.id.match('\\d+')) === current_clicked){
        $('#tab'+final_results[final_results.length-1].toString()).css('background-color', '#DEDEDE');
  
      }
      else if (parseInt(this.id.match('\\d+')) === original[original.length-1] && current_clicked === null){
        $('#tab'+original[original.length-2].toString()).css('background-color', '#DEDEDE');
        $('#tab'+original[original.length-2].toString()).css('border-right', 'solid');
        $('#tab'+original[original.length-2].toString()).css('border-right-width', '1px');
        $('#tab'+original[original.length-2].toString()).css('border-right-color', '#8E8E8E');
      }
  
        $('#tab'+final_results[final_results.length-1].toString()).css('border-right', 'solid');
        $('#tab'+final_results[final_results.length-1].toString()).css('border-right-width', '1px');
        $('#tab'+final_results[final_results.length-1].toString()).css('border-right-color', '#8E8E8E');
  
        $('.tab').each(function(){
          if (parseInt(this.id.match('\\d+')) !== 0){
              var _final_text_result = "";
              var _all_text_versions = original_headers[parseInt(this.id.match('\\d+'))];
              var _current_length = parseInt($(this).css('width').match('\\d+'))/12;
              for (var i = 0; i < _all_text_versions.length; i++){
                if (_all_text_versions[i].length <= _current_length){
                  if (_all_text_versions[i].length > _final_text_result.length){
                    _final_text_result = _all_text_versions[i];
                  }
                }
              }
              $('#titletext'+this.id.match('\\d+')).text(_final_text_result);
  
  
  
          }
        });
  
  
    });
    $('.controls').on('click', '.apps', function(){
      async function get_app_html() {
  
        let stuff = await eel.app_html()();
  
        $('.content_place').html(stuff);
        }
  
      get_app_html();
    });
  
  });