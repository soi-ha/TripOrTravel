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

// 더보기 버튼 js
// const morebutton = document.querySelector('.cards-box .card .morebutton')
// const title = document.querySelector('.cards-box .card .card-trip-content')
// /* html안에 있는 momrebutton을 morebutton 변수에 할당. title도 마찬가지 */

// morebutton.addEventListener('click', () => {
//     morebutton.classList.toggle('clicked');
//     title.classList.toggle('clamp');
// })

/* morebutton이 클릭이 되면 morebutton의 클래스를 클릭이
됐는지 안됐는지 토글을 함. title의 클래스를 클램프 하라는지 안하라는지 
토글을 할 것임 */ 