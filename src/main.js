import Vue from 'vue'
// import App from './App.vue'
import {Time} from './time';
import _ from 'lodash';

require('style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css');
require('bootstrap');

new Vue({
    el: '#app',
    // render: h => h(App),
    data: {
        order: {
            keys: ['pontos', 'gm', 'gs'],
            sort: ['desc', 'desc', 'asc']
        },
        filter : '',
        colunas: [ 'time', 'pontos', 'gm', 'gs', 'saldo'],
        times: [
            new Time("América MG", require('./assets/ammg.png')),
            new Time("Atlético MG", require('./assets/atletico.png')),
            new Time("Atlético PR", require('./assets/atlpr.png')),
            new Time("Bahia", require('./assets/bahia.png')),
            new Time("Botafogo", require('./assets/botafogo.png')),
            new Time("Ceará", require('./assets/ceara.png')),
            new Time("Chapecoense", require('./assets/chapeco.png')),
            new Time("Corinthians", require('./assets/corinthians.png')),
            new Time("Cruzeiro", require('./assets/cruzeiro.png')),
            new Time("Flamengo", require('./assets/fla.png')),
            new Time("Fluminense", require('./assets/fluminense.png')),
            new Time("Gremio", require('./assets/gremio.png')),
            new Time("Internacional", require('./assets/interrs.png')),
            new Time("Palmeiras", require('./assets/palmeiras.png')),
            new Time("Paraná", require('./assets/parana.png')),
            new Time("Santos", require('./assets/santos.png')),
            new Time("São Paulo", require('./assets/saopaulo.png')),
            new Time("Sport", require('./assets/sport.png')),
            new Time("Vasco", require('./assets/vasco.png')),
            new Time("Vitoria", require('./assets/vitoria.png'))
        ],
        game: {
            casa: {
                time: null,
                gols: 0,
            },
            fora: {
                time: null,
                gols: 0,
            }
        },
        view: 'table'
    },
    methods: {
        endGame(){
            let teamOpponent = this.game.fora.time;
            let goals = +this.game.casa.gols;
            let goalsOpponent = +this.game.fora.gols;
            this.game.casa.time.endGame(teamOpponent, goals, goalsOpponent);
            this.showView('table');
        },
        createNewGame(){
            let indexCasa = Math.floor(Math.random() * 20);
            let indexFora = Math.floor(Math.random() * 20);

            this.game.casa.time = this.times[indexCasa];
            this.game.casa.gols = 0;
            this.game.fora.time = this.times[indexFora];
            this.game.fora.gols = 0;
            this.showView('game');
        },
        showView(view){
            this.view = view;
        },
        sortBy(coluna){
            this.order.keys = coluna;
            this.order.sort = this.order.sort == 'desc' ? 'asc': 'desc';
        }
    },
    computed: {
        timesFiltered(){
            let colecao = _.orderBy(this.times, this.order.keys, this.order.sort);
            return _.filter(colecao, item => {
                return item.nome.indexOf(this.filter) >= 0;
            });
        }
    },
    filters: {
        saldo(time){
            return time.gm - time.gs;
        },
        ucwords(value){
            return value.charAt(0).toUpperCase()+value.slice(1);
        }
    }
});
