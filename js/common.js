/* 헤더 아이콘 변환 */
var i = 0;
function icon_slide() {
  i++;
  if (i > $(".top_logo li:last").index()) {
    i = 0;
  }
  $(".top_logo li").eq(i).stop().fadeIn("slow");
  $(".top_logo li")
    .eq(i - 1)
    .stop()
    .fadeOut("slow");
}
setInterval(icon_slide, 3000);
/* 메뉴카테고리 */
$("#cateicon").click(function (e) {
  e.preventDefault(); // 기본 이벤트 방지
  $(".panel").toggle(); // 패널의 상태를 토글
});
$(document).click(function (e) {
  if (!$(e.target).closest(".panel, #cateicon").length) {
    $(".panel").hide(); // 패널과 카테고리 아이콘 외부를 클릭 시 패널 숨김
  } //click이벤트 타겟이  panel cateicon의 자손이면 안숨겨짐
});

/* 배너 슬라이드 */

/* 4초마다 */
function main_slide() {
  $(".slide_box")
    .stop()
    .animate({ marginLeft: -800 }, function () {
      $(".slide_box li:first").appendTo(".slide_box");

      $(".slide_box").css({ marginLeft: 0 });
    });
}
setInterval(main_slide, 4000);

/* 이전버튼 */
function prev() {
  $(".slide_box li:last").prependTo(".slide_box");
  $(".slide_box").css({ marginLeft: -800 });
  $(".slide_box").stop().animate({ marginLeft: 0 }, 800);
}

$(".prev").click(function () {
  prev();
});

/* 다음버튼 */
function next() {
  $(".slide_box")
    .stop()
    .animate({ marginLeft: -800 }, function () {
      $(".slide_box li:first").appendTo(".slide_box");
      $(".slide_box").css({ margin: 0 });
    });
}

$(".next").click(function () {
  next();
});

/* 상단 추천책 5개 */
var obooks = document.getElementsByClassName("obook");
$.ajax({
  method: "GET",
  url: "https://dapi.kakao.com/v3/search/book?target=title",
  data: { query: "주식", size: obooks.length },
  headers: { Authorization: "KakaoAK c5939be7439696656f1a341812c329d9" },
}).done(function (msg) {
  console.log(msg);

  for (let i = 0; i < obooks.length; i++) {
    $(".obook")
      .eq(i)
      .append(
        `<a href="#">
          <p>
            <img src="${msg.documents[i].thumbnail}" class="thumbnail"/>
          </p>
          <span>
            <strong class="title">${msg.documents[i].title}</strong>
            <p>${msg.documents[i].authors}</p>
          </span>
        <a>`
      );
  }
});
/* 배너창 책3개 */

/* 오늘의 책 */
$.ajax({
  method: "GET",
  url: "https://dapi.kakao.com/v3/search/book?target=title",
  data: { query: "오늘", size: 3 },
  headers: { Authorization: "KakaoAK c5939be7439696656f1a341812c329d9" },
}).done(function (msg) {
  console.log(msg);
  for (let i = 0; i < 3; i++) {
    let sale_percent =
      ((msg.documents[i].price - msg.documents[i].sale_price) /
        msg.documents[i].price) *
      100;
    let author = msg.documents[i].authors[0]; // 첫 번째 저자만 가져오기
    let title = msg.documents[i].title;
    // 제목이 20글자보다 길면 20글자만 잘라서 표시

    if (title.length > 10) {
      title = title.substring(0, 10) + "...";
    }
    $("#itm1 > li")
      .eq(i)
      .append(
        `<a href="#">
            <div class="side_book">
              <img src="${msg.documents[i].thumbnail}" />
            </div>
            <div class="book_info">
              <b class="book_ttl">${title}</b><br />
              <span class="author"><b>${author}/${
          msg.documents[i].publisher
        }</b></span><br />
            <div class="price_box">
              <span class="price">${msg.documents[i].sale_price}원</span>
              <span class="sale">
                [${sale_percent.toFixed(2)}% 할인]
              </span>
            </div>
          </div>
        </a>`
      );
  }
});
/* 특가상품 */
$.ajax({
  method: "GET",
  url: "https://dapi.kakao.com/v3/search/book?target=title",
  data: { query: "특가", size: 3 },
  headers: { Authorization: "KakaoAK c5939be7439696656f1a341812c329d9" },
}).done(function (msg) {
  console.log(msg);
  for (let i = 0; i < 3; i++) {
    let sale_percent =
      ((msg.documents[i].price - msg.documents[i].sale_price) /
        msg.documents[i].price) *
      100;
    let author = msg.documents[i].authors[0]; // 첫 번째 저자만 가져오기
    let title = msg.documents[i].title;
    // 제목이 20글자보다 길면 20글자만 잘라서 표시

    if (title.length > 10) {
      title = title.substring(0, 10) + "...";
    }
    $("#itm2 > li")
      .eq(i)
      .append(
        `<a href="#">
            <div class="side_book">
              <img src="${msg.documents[i].thumbnail}" />
            </div>
            <div class="book_info">
              <b class="book_ttl">${title}</b><br />
              <span class="author"><b>${author}/${
          msg.documents[i].publisher[0]
        }</b></span><br />
            <div class="price_box">
              <span class="price">${msg.documents[i].sale_price}원</span>
              <span class="sale">
                [${sale_percent.toFixed(2)}% 할인]
              </span>
            </div>
          </div>
        </a>`
      );
  }
});

/* 편집자추천 */
$.ajax({
  method: "GET",
  url: "https://dapi.kakao.com/v3/search/book?target=title",
  data: { query: "추천", size: 3 },
  headers: { Authorization: "KakaoAK c5939be7439696656f1a341812c329d9" },
}).done(function (msg) {
  console.log(msg);
  for (let i = 0; i < 3; i++) {
    let sale_percent =
      ((msg.documents[i].price - msg.documents[i].sale_price) /
        msg.documents[i].price) *
      100;

    let author = msg.documents[i].authors[0]; // 첫 번째 저자만 가져오기
    let title = msg.documents[i].title;
    // 제목이 20글자보다 길면 20글자만 잘라서 표시

    if (title.length > 10) {
      title = title.substring(0, 10) + "...";
    }
    $("#itm3 > li")
      .eq(i)
      .append(
        `<a href="#">
            <div class="side_book">
              <img src="${msg.documents[i].thumbnail}" />
            </div>
            <div class="book_info">
              <b class="book_ttl">${title}</b><br />
              <span class="author"><b>${author}/${
          msg.documents[i].publisher
        }</b></span><br />
            <div class="price_box">
              <span class="price">${msg.documents[i].sale_price}원</span>
              <span class="sale">
                [${sale_percent.toFixed(2)}% 할인]
              </span>
            </div>
          </div>
        </a>`
      );
  }
});

/* 버튼 클릭시 itm123나오게 */
var i = 0;
$(".side_tab>li").click(function () {
  i = $(this).index() + 2;
  $(".book_box > .side_itm").hide();
  $(".book_box > .side_itm:nth-of-type" + "(" + i + ")")
    .stop()
    .fadeIn("fast");
});

/* 버튼 클릭시 버튼 css변경 */

$(".side_tab>li").click(function () {
  i = $(this).index() + 1;
  $(".side_tab>li").css({
    color: "#5e5e5e",
    border: "1px solid #e7e7e7",
  });
  $(".side_tab>li:nth-of-type" + "(" + i + ")").css({
    color: "#0c6eaf",
    border: "1px solid #0c6eaf",
  });
});

/* 메인 베스트책 */
$.ajax({
  method: "GET",
  url: "https://dapi.kakao.com/v3/search/book?target=title",
  data: { query: "삶", size: 10 },
  headers: { Authorization: "KakaoAK c5939be7439696656f1a341812c329d9" },
}).done(function (msg) {
  console.log(msg);
  for (let i = 0; i < 10; i++) {
    let sale_percent =
      ((msg.documents[i].price - msg.documents[i].sale_price) /
        msg.documents[i].price) *
      100;
    let author = msg.documents[i].authors[0]; // 첫 번째 저자만 가져오기
    let title = msg.documents[i].title;
    // 제목이 20글자보다 길면 20글자만 잘라서 표시

    if (title.length > 10) {
      title = title.substring(0, 10) + "...";
    }
    $(".best> li").eq(i).append(`
        <a href="#">
          <div class="book_img">
            <img src="${msg.documents[i].thumbnail}" />
          </div>
        </a>
        <div class="book_info">
          <b class="book_ttl">${title}</b><br />
          <span class="author">
            <b>${author} / ${msg.documents[i].publisher}</b>
          </span><br />
          <div class="price_box">
            <span class="price">${msg.documents[i].price}원</span>
            <span class="sale">[${sale_percent.toFixed(2)}% 할인]</span>
          </div>
        </div>
      `);
  }
});

/*New 새로나온책 슬라이드*/
function new_slide() {
  $(".new_list")
    .stop()
    .animate({ marginLeft: -195 }, function () {
      $(".new_list>ul li:first").appendTo(".new_list ul");

      $(".new_list").css({ marginLeft: 0 });
    });
}
setInterval(new_slide, 2000);

/* 이전버튼 */
function prev1() {
  $(".new_list>ul li:last").prependTo(".new_list ul");
  $(".new_list").css({ marginLeft: -195 });
  $(".new_list").stop().animate({ marginLeft: 0 }, 800);
}

$(".prev1").click(function () {
  prev1();
});

/* 다음버튼 */
function next1() {
  $(".new_list")
    .stop()
    .animate({ marginLeft: -195 }, function () {
      $(".new_list>ul li:first").appendTo(".new_list ul");
      $(".new_list").css({ margin: 0 });
    });
}

$(".next1").click(function () {
  next1();
});
/* new 새로나온책 ajax */
$.ajax({
  method: "GET",
  url: "https://dapi.kakao.com/v3/search/book?target=title",
  data: { query: "new", size: 10 },
  headers: { Authorization: "KakaoAK c5939be7439696656f1a341812c329d9" },
}).done(function (msg) {
  console.log(msg);
  for (let i = 0; i < 10; i++) {
    let sale_percent =
      ((msg.documents[i].price - msg.documents[i].sale_price) /
        msg.documents[i].price) *
      100;
    let author = msg.documents[i].authors[0]; // 첫 번째 저자만 가져오기
    let title = msg.documents[i].title;
    // 제목이 20글자보다 길면 20글자만 잘라서 표시

    if (title.length > 10) {
      title = title.substring(0, 10) + "...";
    }
    $(".new_list>ul> li").eq(i).append(`
        <a href="#">
          <div class="book_img">
            <img src="${msg.documents[i].thumbnail}" />
          </div>
        </a>
        <div class="book_info">
          <b class="book_ttl">${title}</b><br />
          <span class="author">
            <b>${author} / ${msg.documents[i].publisher}</b>
          </span><br />
          <div class="price_box">
            <span class="price">${msg.documents[i].price}원</span>
            <span class="sale">[${sale_percent.toFixed(2)}% 할인]</span>
          </div>
        </div>
      `);
  }
});
/* 편집자 추천 */
$.ajax({
  method: "GET",
  url: "https://dapi.kakao.com/v3/search/book?target=title",
  data: { query: "부모", size: 10 },
  headers: { Authorization: "KakaoAK c5939be7439696656f1a341812c329d9" },
}).done(function (msg) {
  console.log(msg);
  for (let i = 0; i < 10; i++) {
    let sale_percent =
      ((msg.documents[i].price - msg.documents[i].sale_price) /
        msg.documents[i].price) *
      100;
    let author = msg.documents[i].authors[0]; // 첫 번째 저자만 가져오기
    let title = msg.documents[i].title;
    // 제목이 20글자보다 길면 20글자만 잘라서 표시

    if (title.length > 10) {
      title = title.substring(0, 10) + "...";
    }
    $(".recommend_list1 > li").eq(i).append(`
        <a href="#">
          <div class="book_img">
            <img src="${msg.documents[i].thumbnail}" />
          </div>
        </a>
        <div class="book_info">
          <b class="book_ttl">${title}</b><br />
          <span class="author">
            <b>${author} / ${msg.documents[i].publisher}</b>
          </span><br />
          <div class="price_box">
            <span class="price">${msg.documents[i].price}원</span>
            <span class="sale">[${sale_percent.toFixed(2)}% 할인]</span>
          </div>
        </div>
      `);
  }
});

$.ajax({
  method: "GET",
  url: "https://dapi.kakao.com/v3/search/book?target=title",
  data: { query: "유아", size: 10 },
  headers: { Authorization: "KakaoAK c5939be7439696656f1a341812c329d9" },
}).done(function (msg) {
  console.log(msg);
  for (let i = 0; i < 10; i++) {
    let sale_percent =
      ((msg.documents[i].price - msg.documents[i].sale_price) /
        msg.documents[i].price) *
      100;
    let author = msg.documents[i].authors[0]; // 첫 번째 저자만 가져오기
    let title = msg.documents[i].title;
    // 제목이 20글자보다 길면 20글자만 잘라서 표시

    if (title.length > 10) {
      title = title.substring(0, 10) + "...";
    }
    $(".recommend_list2 > li").eq(i).append(`
        <a href="#">
          <div class="book_img">
            <img src="${msg.documents[i].thumbnail}" />
          </div>
        </a>
        <div class="book_info">
          <b class="book_ttl">${title}</b><br />
          <span class="author">
            <b>${author} / ${msg.documents[i].publisher}</b>
          </span><br />
          <div class="price_box">
            <span class="price">${msg.documents[i].price}원</span>
            <span class="sale">[${sale_percent.toFixed(2)}% 할인]</span>
          </div>
        </div>
      `);
  }
});

$.ajax({
  method: "GET",
  url: "https://dapi.kakao.com/v3/search/book?target=title",
  data: { query: "어린이", size: 10 },
  headers: { Authorization: "KakaoAK c5939be7439696656f1a341812c329d9" },
}).done(function (msg) {
  console.log(msg);
  for (let i = 0; i < 10; i++) {
    let sale_percent =
      ((msg.documents[i].price - msg.documents[i].sale_price) /
        msg.documents[i].price) *
      100;
    let author = msg.documents[i].authors[0]; // 첫 번째 저자만 가져오기
    let title = msg.documents[i].title;
    // 제목이 20글자보다 길면 20글자만 잘라서 표시

    if (title.length > 10) {
      title = title.substring(0, 10) + "...";
    }
    $(".recommend_list3 > li").eq(i).append(`
        <a href="#">
          <div class="book_img">
            <img src="${msg.documents[i].thumbnail}" />
          </div>
        </a>
        <div class="book_info">
          <b class="book_ttl">${title}</b><br />
          <span class="author">
            <b>${author} / ${msg.documents[i].publisher}</b>
          </span><br />
          <div class="price_box">
            <span class="price">${msg.documents[i].price}원</span>
            <span class="sale">[${sale_percent.toFixed(2)}% 할인]</span>
          </div>
        </div>
      `);
  }
});

$.ajax({
  method: "GET",
  url: "https://dapi.kakao.com/v3/search/book?target=title",
  data: { query: "인문", size: 10 },
  headers: { Authorization: "KakaoAK c5939be7439696656f1a341812c329d9" },
}).done(function (msg) {
  console.log(msg);
  for (let i = 0; i < 10; i++) {
    let sale_percent =
      ((msg.documents[i].price - msg.documents[i].sale_price) /
        msg.documents[i].price) *
      100;
    let author = msg.documents[i].authors[0]; // 첫 번째 저자만 가져오기
    let title = msg.documents[i].title;
    // 제목이 20글자보다 길면 20글자만 잘라서 표시

    if (title.length > 10) {
      title = title.substring(0, 10) + "...";
    }
    $(".recommend_list4 > li").eq(i).append(`
        <a href="#">
          <div class="book_img">
            <img src="${msg.documents[i].thumbnail}" />
          </div>
        </a>
        <div class="book_info">
          <b class="book_ttl">${title}</b><br />
          <span class="author">
            <b>${author} / ${msg.documents[i].publisher}</b>
          </span><br />
          <div class="price_box">
            <span class="price">${msg.documents[i].price}원</span>
            <span class="sale">[${sale_percent.toFixed(2)}% 할인]</span>
          </div>
        </div>
      `);
  }
});

$.ajax({
  method: "GET",
  url: "https://dapi.kakao.com/v3/search/book?target=title",
  data: { query: "예술", size: 10 },
  headers: { Authorization: "KakaoAK c5939be7439696656f1a341812c329d9" },
}).done(function (msg) {
  console.log(msg);
  for (let i = 0; i < 10; i++) {
    let sale_percent =
      ((msg.documents[i].price - msg.documents[i].sale_price) /
        msg.documents[i].price) *
      100;
    let author = msg.documents[i].authors[0]; // 첫 번째 저자만 가져오기
    let title = msg.documents[i].title;
    // 제목이 20글자보다 길면 20글자만 잘라서 표시

    if (title.length > 10) {
      title = title.substring(0, 10) + "...";
    }
    $(".recommend_list5 > li").eq(i).append(`
        <a href="#">
          <div class="book_img">
            <img src="${msg.documents[i].thumbnail}" />
          </div>
        </a>
        <div class="book_info">
          <b class="book_ttl">${title}</b><br />
          <span class="author">
            <b>${author} / ${msg.documents[i].publisher}</b>
          </span><br />
          <div class="price_box">
            <span class="price">${msg.documents[i].price}원</span>
            <span class="sale">[${sale_percent.toFixed(2)}% 할인]</span>
          </div>
        </div>
      `);
  }
});

$.ajax({
  method: "GET",
  url: "https://dapi.kakao.com/v3/search/book?target=title",
  data: { query: "경제", size: 10 },
  headers: { Authorization: "KakaoAK c5939be7439696656f1a341812c329d9" },
}).done(function (msg) {
  console.log(msg);
  for (let i = 0; i < 10; i++) {
    let sale_percent =
      ((msg.documents[i].price - msg.documents[i].sale_price) /
        msg.documents[i].price) *
      100;
    let author = msg.documents[i].authors[0]; // 첫 번째 저자만 가져오기
    let title = msg.documents[i].title;
    // 제목이 20글자보다 길면 20글자만 잘라서 표시

    if (title.length > 10) {
      title = title.substring(0, 10) + "...";
    }
    $(".recommend_list6 > li").eq(i).append(`
        <a href="#">
          <div class="book_img">
            <img src="${msg.documents[i].thumbnail}" />
          </div>
        </a>
        <div class="book_info">
          <b class="book_ttl">${title}</b><br />
          <span class="author">
            <b>${author} / ${msg.documents[i].publisher}</b>
          </span><br />
          <div class="price_box">
            <span class="price">${msg.documents[i].price}원</span>
            <span class="sale">[${sale_percent.toFixed(2)}% 할인]</span>
          </div>
        </div>
      `);
  }
});

$.ajax({
  method: "GET",
  url: "https://dapi.kakao.com/v3/search/book?target=title",
  data: { query: "문학", size: 10 },
  headers: { Authorization: "KakaoAK c5939be7439696656f1a341812c329d9" },
}).done(function (msg) {
  console.log(msg);
  for (let i = 0; i < 10; i++) {
    let sale_percent =
      ((msg.documents[i].price - msg.documents[i].sale_price) /
        msg.documents[i].price) *
      100;
    let author = msg.documents[i].authors[0]; // 첫 번째 저자만 가져오기
    let title = msg.documents[i].title;
    // 제목이 20글자보다 길면 20글자만 잘라서 표시

    if (title.length > 10) {
      title = title.substring(0, 10) + "...";
    }
    $(".recommend_list7 > li").eq(i).append(`
        <a href="#">
          <div class="book_img">
            <img src="${msg.documents[i].thumbnail}" />
          </div>
        </a>
        <div class="book_info">
          <b class="book_ttl">${title}</b><br />
          <span class="author">
            <b>${author} / ${msg.documents[i].publisher}</b>
          </span><br />
          <div class="price_box">
            <span class="price">${msg.documents[i].price}원</span>
            <span class="sale">[${sale_percent.toFixed(2)}% 할인]</span>
          </div>
        </div>
      `);
  }
});

$.ajax({
  method: "GET",
  url: "https://dapi.kakao.com/v3/search/book?target=title",
  data: { query: "청소년", size: 10 },
  headers: { Authorization: "KakaoAK c5939be7439696656f1a341812c329d9" },
}).done(function (msg) {
  console.log(msg);
  for (let i = 0; i < 10; i++) {
    let sale_percent =
      ((msg.documents[i].price - msg.documents[i].sale_price) /
        msg.documents[i].price) *
      100;
    let author = msg.documents[i].authors[0]; // 첫 번째 저자만 가져오기
    let title = msg.documents[i].title;
    // 제목이 20글자보다 길면 20글자만 잘라서 표시

    if (title.length > 10) {
      title = title.substring(0, 10) + "...";
    }
    $(".recommend_list8 > li").eq(i).append(`
        <a href="#">
          <div class="book_img">
            <img src="${msg.documents[i].thumbnail}" />
          </div>
        </a>
        <div class="book_info">
          <b class="book_ttl">${title}</b><br />
          <span class="author">
            <b>${author} / ${msg.documents[i].publisher}</b>
          </span><br />
          <div class="price_box">
            <span class="price">${msg.documents[i].price}원</span>
            <span class="sale">[${sale_percent.toFixed(2)}% 할인]</span>
          </div>
        </div>
      `);
  }
});
$(".recommend_list1").siblings().css({ display: "none" });

/* 버튼 클릭시 recommend_list234567나오게 */
var i = 0;
$(".rcmnd_box>li").click(function () {
  i = $(this).index() + 1;
  $(".bk_rit > #rlist").hide();
  $(".bk_rit > #rlist:nth-of-type" + "(" + i + ")")
    .stop()
    .fadeIn("fast");
});

/* 버튼 클릭시 버튼 css변경 */
$(".rcmnd_box>li").click(function () {
  i = $(this).index() + 1;
  $(".rcmnd_box>li").css({
    color: "black",
    border: "",
    fontWeight: "",
  });
  $(".rcmnd_box>li:nth-of-type" + "(" + i + ")").css({
    color: "#0c6eaf",
    border: "2px solid #0c6eaf",
    fontWeight: "bolder",
  });
});
/* cardstory */
$.ajax({
  method: "GET",
  url: "https://dapi.kakao.com/v3/search/book?target=title",
  data: { query: "바다", size: 10 },
  headers: { Authorization: "KakaoAK c5939be7439696656f1a341812c329d9" },
}).done(function (msg) {
  console.log(msg);
  for (let i = 0; i < 10; i++) {
    $("#story > ul > li").eq(i).append(`
      <a href="#" class="card-container">
        <img src="${msg.documents[i].thumbnail}" class="card">
        <div id="cdm" >
          <b>${msg.documents[i].title}</b>
          <span>${msg.documents[i].authors}</span>
        </div>
      </a>
    `);
  }
});

$(document).on("mouseenter", ".card-container", function () {
  $(this).find(".card").css({
    transition: "transform 0.3s ease", //$(document)에서 mouseenter 이벤트를 감지.
    transform: "scale(1.2)", //$(this)는 그 이벤트가 발생한 .card-containerd의 하위에 .card를 찾아서 css를 변경해라
  });

  $(this).find("#cdm").stop().fadeIn(300); // #cdm을 fadeIn 시킴
});

$(document).on("mouseleave", ".card-container", function () {
  $(this).find(".card").css({
    transform: "scale(1)",
  });

  $(this).find("#cdm").stop().fadeOut(300); // #cdm을 fadeOut 시킴
});
