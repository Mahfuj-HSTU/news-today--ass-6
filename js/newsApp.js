const loadNewsCatagory = () => {
    const url = "https://openapi.programming-hero.com/api/news/categories"
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => catagoriesButton(data.data.news_category))
    //     .catch(error => console.log(error))

    try {
        fetch(url)
            .then(res => res.json())
            .then(data => catagoriesButton(data.data.news_category))
    }
    catch (error) {
        console.log(error);
    }
}
// create catagory
const catagoriesButton = (catagories) => {
    for (const catagory of catagories) {
        const catagories = document.getElementById('catagories')
        const btn = document.createElement('li');
        btn.classList.add('nav-item', 'px-1')
        btn.innerHTML = `
        <a onclick="loadNews('${catagory.category_id}')" class="nav-link" aria-current="page" href="#">${catagory.category_name}</a>
        `;
        catagories.appendChild(btn)
    }
}
// show all news at home
document.getElementById('allNews'); {
    const url = `https://openapi.programming-hero.com/api/news/category/08`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data));
}
// show news to click the catagory
const loadNews = (id) => {
    spinner(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data));
}


const displayNews = (newses) => {
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';
    // console.log(newses);
    newses.sort((a, b) => {
        return b.total_view - a.total_view;
    });

    // console.log(newses);
    for (const news of newses) {
        const newsTotalID = document.getElementById('news-total')
        const newsTotal = newses.length;
        newsTotalID.innerText = newsTotal;
        // console.log(news);
        // console.log(news.author.name)
        const div = document.createElement('div')
        div.classList.add('card', 'mb-3', 'p-4')
        div.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4 d-flex align-items-center ">
                <img src="${news.image_url} " class="img-fluid rounded-start " alt="" >
            </div>
            <div class="col-md-8 ps-2">
                <div class="card-body">
                    <h5 class="card-title">${news.title} </h5>
                    <p> ${news.details.slice(0, 300)}.</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex ">
                            <img class="rounded-circle border border-secondary" src="${news.author.img} " alt="" height="60" width="60" />
                           <div class="ps-3 mt-2">
                            <h6 class="m-0">${news.author.name ? news.author.name : "No Author found"} </h6>
                            <small>${news.author.published_date ? news.author.published_date : "No publish date found"} </small>
                           </div>
                        </div>
                        <p class='pt-2'>${news.total_view ? news.total_view : "No views found"} </p>
                        <button onclick="loadNewsDetails('${news._id}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">Show Details</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        mainContainer.appendChild(div)
        spinner(false)
    }

}

// for spinner
const spinner = (loding) => {
    const loaderSection = document.getElementById('loader');
    if (loding) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
};



// for modal section
const loadNewsDetails = (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetail(data.data[0]))

};

const displayNewsDetail = (news) => {
    const modalTitle = document.getElementById('newsDetailsLabel');
    modalTitle.innerText = news.title;
    const newsDetails = document.getElementById('news-detailes');
    newsDetails.innerHTML = `
	<h5>Author Name: ${news.author.name ? news.author.name : "No Author found"} </h5>
	<p><u><b>In details:</b></u> ${news.details} </p>
	<h6>Total view: ${news.total_view ? news.total_view : "No views found"} </h6>
		`;
};



// loadNews()
loadNewsCatagory()
