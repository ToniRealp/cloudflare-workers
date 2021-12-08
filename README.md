# Workers back end (workers)
This is a serverless back end developed using cloudflare workers for the cloudflare general assignment

### Functionalities
The API was asked to have 2 endpoints, GET /post and POST /posts. Adding to that I decided to implement  
GET post/:postId to fetch a single post  
PUT post/:postId to update a post  
DELETE post/:postId to delete a post

This basically provides the API with full CRUD functionalities over posts.

### Features
- Worktop
- Typescript

### Worktop
I did some research to figure out which was the best way to organize the API instead of having all code in a single
file. The first idea that came to mind is to organize the app in a similar manner to that of frameworks like express.js.
For that I needed a router and a way to tie it up with cloudflare workers. In the same documentation there are examples
of simple routers that give that functionality but integration with typescript was severely lacking.
I was not content until I stumbled upon the Worktop framework, there is no other way to put it, it works seamlessly with workers.
On top of that providing all sorts of functionalities for KV storage and plenty more.
With that said I was able to structure the app in a really nice manner dividing into the model which in this case represents only the posts,
the view which would be the routes, and the controller tying it up with the worktop framework.
