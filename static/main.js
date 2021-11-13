$(document).ready(function () {
    $("#card-bundle").html("");
    showArticles();
    getImage();
});

let map;
let img_path;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8,
    });
}

function openClose() {
    // id 값 post-box의 display 값이 block 이면
    if ($('#posting-box').css('display') === 'block') {
        // post-box를 가리고
        $('#posting-box').hide();
    } else {
        // 아니면 post-box를 보여주기
        $('#posting-box').show();
    }
}

function getImage() {
    $.ajax({
        type: 'GET',
        url: '/trip',
        success: function (res) {
            let images = res['images']
            for (let i = 0; i < images.length; i++) {
                let image = images[i]
                console.log(image)
                let temp = `<img src="${image}" alt="image${i}">`
                $('.card-img').append(temp)
            }
        }
    })
}

function uploadImage() {
    let images = $('#post-img')[0].files[0]
    if (images === undefined) {
        alert('이미지를 선택해주세요.')
        return
    }

    let formData = new FormData();
    formData.append("images", images)

    $.ajax({
        type: "POST",
        url: "/image",
        processData: false,
        contentType: false,
        data: formData,
        success: function (res) {
            if (res['result'] === 'success') {
                img_path = res['img_path']
                alert('사진 업로드 성공!')
                console.log(img_path);
            } else {
                alert('사진 업로드 실패!')
                console.error(res['error'])
            }
        }
    })
}

function postArticle() {
    const writer = $("#post-writer").val();
    const date = $("#post-trip-date").val();
    const place = $("#post-trip-place").val();
    const content = $("#post-trip-content").val();

    // POST 방식으로 카드 생성 요청하기
    $.ajax({
        type: "POST", // POST 방식으로 요청하겠다.
        url: "/trip", // /memo라는 url에 요청하겠다.
        data: {
            writer_give: writer,
            date_give: date,
            place_give: place,
            img_give: img_path,
            content_give: content
        }, // 데이터를 주는 방법
        success: function (response) { // 성공하면
            if (response["result"] === "success") {
                alert("포스팅 성공!");
                // 3. 성공 시 페이지 새로고침하기
                window.location.reload();
            } else {
                alert("서버 오류!");
            }
        }
    })
}

function showArticles() {
    $.ajax({
        type: "GET",
        url: "/trip",
        data: {},
        success: function (response) {
            const articles = response["articles"];
            console.log(articles);
            for (let i = 0; i < articles.length; i++) {
                makeCard(articles[i]["writer"], articles[i]["img"], articles[i]["date"], articles[i]["place"], articles[i]["content"]);
            }
        }
    })
}

function makeCard(writer, img, date, place, content) {
    const tempHtml = `<div class="cards-box">
                      <div class="card">
                        <span class="card-writer">Writer ${writer}</span>
                        <img class="card-img" src="${img}">
                        <span class="card-trip-date">여행 날짜: ${date}</span>
                        <span class="card-trip-place">여행 장소: ${place}</span>
                        <span class="card-trip-content">${content}</span>
                      </div>
                    </div>`;
    $("#card-bundle").append(tempHtml);
}

// 더보기 버튼 js
// const morebutton = document.querySelector('.cards-box .card .morebutton')
// const title = document.querySelector('.cards-box .card .card-trip-content')
// /* html안에 있는 momrebutton을 morebutton 변수에 할당. title도 마찬가지 */

// morebutton.addEventListener('click', () => {
//     morebutton.classList.toggle('clicked');
//     title.classList.toggle('clamp');
// })

// morebutton이 클릭이 되면 morebutton의 클래스를 클릭이
//됐는지 안됐는지 토글을 함. title의 클래스를 클램프 하라는지 안하라는지 
//토글을 할 것임