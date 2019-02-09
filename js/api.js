// const pushedCommits = []; couldn't figure out how to make the data type compatable with chart.js 
// const pushedCommitsCount = []; couldn't figure out how to make the data type compatable with chart.js 

function fetchData(url) {
return fetch(url)
	.then(checkStatus)
	.then(response => response.json())
	.catch(error => console.log('Uh Oh! Looks like there was a problem', error));
}

fetchData('https://api.github.com/users/taylorculver/repos')
.then(data => {
    // console.log(data)
    var shuffledArray = createShuffledArray(0, data.length - 1);
    // console.log(shuffledArray)
    $.each(data, function(key, value) { 
                    // pushedCommits.push(value.pushed_at); couldn't figure out how to make the data type compatable with chart.js 
                    // pushedCommitsCount.push(key); couldn't figure out how to make the data type compatable with chart.js 
					if (shuffledArray.includes(key)) {
                        // console.log(key)
                        var projects = `
                            <div class="card mx-auto" style="width: 18rem; margin: 30px;">
                              <img class="card-img-top" src=${getImage(value.language)} alt="Card image cap" style="max-width: 100%;">
                              <div class="card-body">
                                <h5 class="card-title">${value.name}</h5>
                                <p class="card-text">${value.description}</p>
                              </div>
                              <ul class="list-group list-group-flush">
                                <li class="list-group-item">${value.language}</li>
                              </ul>
                              <div class="card-body">
                                <a href="${value.html_url}" class="card-link" target="_blank">Project Link</a>
                              </div>
                            </div>
                        `
                        $("#projects").prepend(projects);   
					}
					})});

// ---------------------------------------------
//  HELPER FUNCTIONS
// ---------------------------------------------
function checkStatus(response) {
	if (response.ok) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(new Error(response.statusText));
	}
}

function createShuffledArray(from, to) {
    var i = to - from + 1;
    var a = Array(i);
    while (i) {
        var j = Math.floor(Math.random() * i--);
        var temp = isNaN(a[i]) ? (i + from) : a[i];
        a[i] = isNaN(a[j]) ? (j + from) : a[j];
        a[j] = temp;
    }
    return a.slice(0,4);
}

function getImage(language) {
    var image;
    if (language === 'Python') {
        image = 'images/python.png'
    } else if (language === 'JavaScript') {
        image = 'images/javascript.png'
    } else if (language === 'HTML') {
        image = 'images/html.png'
    } else if (language === 'CSS') {
        image = 'images/css.png'
    } else {
        image = 'images/python.png' // too lazy to add a default image if no language is detected
    }
    return image
}

// ---------------------------------------------
//  Line Chart (chart.js)
// ---------------------------------------------
var ctx = document.getElementById('lineChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["2018-03-04T01:41:57Z", "2018-01-25T09:10:36Z", "2019-01-21T21:58:18Z", "2018-03-04T01:41:54Z", "2018-07-11T16:22:43Z", "2018-07-10T18:34:17Z", "2017-12-27T15:45:24Z", "2018-05-08T20:05:40Z", "2018-07-06T21:06:19Z", "2018-07-27T22:44:25Z", "2018-10-04T02:26:34Z", "2018-01-28T23:39:54Z", "2019-01-26T18:02:50Z", "2017-12-26T19:58:22Z", "2018-05-16T13:50:43Z", "2018-03-04T01:41:49Z", "2019-01-10T01:23:42Z", "2018-12-31T23:59:25Z", "2018-12-08T00:19:52Z", "2018-11-15T15:08:27Z", "2018-11-24T23:08:22Z", "2018-07-27T22:47:22Z", "2018-03-04T01:42:08Z", "2017-10-12T19:32:44Z", "2017-10-16T21:35:22Z", "2018-05-08T14:22:25Z", "2018-12-22T18:46:54Z", "2018-03-04T01:41:41Z", "2017-10-28T18:27:05Z", "2017-11-19T18:23:20Z"].sort(),
        datasets: [{
            label: "My Project Count",
            backgroundColor: 'rgb(116, 118, 192, .2)',
            borderColor: '#7476C0',
            data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        }]
    },

    // Configuration options go here
    options: {
    	elements: {
	        line: {
	            tension: 0,
	        },
            point: {
                radius: 0,
            },
	    },
    	responsive: true,
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
	        yAxes: [{
	            gridLines: {
	                offsetGridLines: true
	            },
	            ticks: {
	            	beginAtZero: true,
	            }
	        }],
	        xAxes: [{
	            gridLines: {
	                offsetGridLines: true
	            },
                type: 'time',
                time: {
                    displayFormats: {
                        quarter: '[Q]Q - YYYY'
                    }
                }
	        }],
	    },
    }
});