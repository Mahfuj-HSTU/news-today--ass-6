const loadNews = () => {
    const url = "https://openapi.programming-hero.com/api/news/category/01"
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data));
}

const displayNews = (newses) => {
    for (const news of newses) {
        // console.log(news);
        // console.log(news.author.name)
        const mainContainer = document.getElementById('main-container');
        const div = document.createElement('div')
        div.classList.add('card', 'mb-3')
        div.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${news.image_url} " class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title} </h5>
                    <p> ${news.details}.</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex ">
                            <img class="rounded-circle border border-secondary" src="${news.author.img} " alt="" height="60" width="60" />
                           <div class="ps-3 mt-2">
                            <h6 class="m-0">${news.author.name} </h6>
                            <small>${news.author.published_date} </small>
                           </div>
                        </div>
                        <p class='pt-2'>${news.total_view} </p>
                        <button class="btn btn-primary">Show details</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        mainContainer.appendChild(div)

    }

}
loadNews()
