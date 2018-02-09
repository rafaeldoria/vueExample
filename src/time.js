export class Time{
    constructor(nome, escudo){
        this.nome = nome;
        this.escudo = escudo;

        this.pontos = 0;
        this.gm = 0;
        this.gs = 0;
    }

    updateInfo(points, goalsScored, goalsConceded){
        this.pontos += points;
        this.gm += goalsScored;
        this.gs += goalsConceded;
    }

    endGame(teamOpponent, goals, goalsOpponent){
        if(goals == goalsOpponent){
            this.updateInfo(1, goals, goalsOpponent);
            teamOpponent.updateInfo(1, goalsOpponent, goals);
        }else{
            if(goals > goalsOpponent){
                this.updateInfo(3, goals, goalsOpponent);
                teamOpponent.updateInfo(0, goalsOpponent, goals);
            }else{
                this.updateInfo(0, goals, goalsOpponent);
                teamOpponent.updateInfo(3, goalsOpponent, goals);
            }
        }
    }
}
