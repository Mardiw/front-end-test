<template>
<div>
  <div class="container-fluid" id="container-wrapper">
    <form @submit.prevent="searchMovies" >
        <h3 class="float-left">Search Movies Here</h3>
        <div class="input-group mb-3">
          <input type="text" v-model="searchTerm" placeholder="Search here..." class="form-control">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit">Search</button>
          </div>
        </div>

    </form>
    <div class="row mt-3">
        <div class="col-lg-12 mb-4">
            <div class="card">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Movie List</h6>
            </div>
            <div class="card-body">
                <div class="row" id="rowMovies">
                    <div class="col-lg-3 col-md-3 col-sm-6 col-6" v-for="movie in movies" :key="movie.imdbID">
                          <div class="card" style="width: 8.5rem; margin-bottom: 5px;">
                          <a href="#" id="pop" @click="showModal = true">
                            <img :src="movie.Poster" class="card-img-top" id="em_photo" >
                          </a>
                              <div class="card-body">
                                  <h6 class="card-title">{{movie.Title}}</h6>
                                  <p>Type: {{movie.Type}}</p>
                              </div>
                          </div>
                          <!-- Modal -->
                        <div v-if="showModal" class="modal fade" ref="modal" id="movie.imdbID" tabindex="-1" role="dialog" aria-labelledby="movie.imdbIDLabel" aria-hidden="true">
                          <transition name="modal">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <img :src="movie.Poster" class="card-img-top" >
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              </div>
                            </div>
                          </div>
                          </transition>
                        </div>
                      </div>
                  </div>
              </div>
            <div class="card-footer"></div>
            </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
    data(){
        return {
            movies:[],
            searchTerm:'',
            nextMovie: 1,
            showModal:false
        }
    },

    methods:{
        searchMovies(){
          let search =this.searchTerm
            axios.get('https://www.omdbapi.com/?apikey=715289b&s='+search+'&page=1')
            .then((response) => {
                this.movies = response.data.Search
                if(this.searchTerm > 0){
                    this.movies = response.data
                }else {
                    let param = this.$route.params.search
                    axios.get('https://www.omdbapi.com/?apikey=715289b&s='+param+'&page=1')
                    .then((response) => {
                        this.client = response.data.Search
                    }).catch((err) => {
                        console.log({err:err})
                    });
                }
            }).catch((err) => {
                console.log({err:err})
            });
        },
        loadMore () {
          for (var i = 0; i < 20; i++) {
            axios.get('https://www.omdbapi.com/?apikey=715289b&s='+this.searchTerm+'&page='+this.nextMovie++)
            .then(response => {
              this.movies.push(response.data.Search[0]);
              });
          }
        }

    },
    mounted(){
        window.onscroll = () => {
          let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
          if (bottomOfWindow) {
            this.loadMore()
          }
        }
    }
}
</script>

<style>

</style>
