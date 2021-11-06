let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

function openClose() {
  // id 값 post-box의 display 값이 block 이면
  if ($('#posting-box').css('display') == 'block') {
      // post-box를 가리고
      $('#posting-box').hide();
  } else {
      // 아니면 post-box를 보여주기
      $('#posting-box').show();
  }
}