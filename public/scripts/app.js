// // Client facing scripts here
$(() => {
  $('span#like-post').each(function() {
    const element = $(this);
    const entry_id = element.data('id');
    element.on('click', () => {
      $.ajax({
        method: 'POST',
        url: '/story/' + entry_id + '/like'
      })
      .done((response) => {
        $('#like-counter' + entry_id).html(response.upvote_counter);
      });
    });
  });
});
