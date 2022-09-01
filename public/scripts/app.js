// // Client facing scripts here
$(() => {
  const entry_id = $('#like-post').data('id');
  $('#like-post').on('click', () => {
    $.ajax({
      method: 'POST',
      url: '/story/' + entry_id + '/like'
    })
    .done((response) => {
      $('#like-counter').html(response.upvote_counter);
    });
  });
});
